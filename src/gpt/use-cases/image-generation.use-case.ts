import OpenAI from 'openai';
import { downloadImageASPng } from 'src/helpers';
import * as fs from 'fs';
import * as path from 'path';
import { downloadBase64ImageAsPng } from '../../helpers/download-image-as-png';
interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}
export const imageGenerationUseCase = async (
  openai: OpenAI,
  { prompt, originalImage, maskImage }: Options,
) => {
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });
    //TODO verificar image
    const fileName = await downloadImageASPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName.replace('.png', '')}`;

    return {
      url,
      openIaUrl: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  //

  const pngImagePath = await downloadImageASPng(originalImage);
  const maskImagePath = await downloadBase64ImageAsPng(maskImage);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageASPng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  return {
    url,
    openIaUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
