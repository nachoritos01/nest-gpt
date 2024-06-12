import OpenAI from 'openai';
import * as fs from 'fs';
import { downloadImageASPng } from '../../helpers/download-image-as-png';
interface Options {
  baseImage?: string;
}
export const imageVariationUseCase = async (
  openai: OpenAI,
  { baseImage }: Options,
) => {
  const pngImagePath = await downloadImageASPng(baseImage, true);

  console.log(fs.createReadStream(pngImagePath));

  const response = await openai.images.createVariation({
    model: 'dall-e-2',
    image: fs.createReadStream(pngImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  console.log(response);
  const fileName = await downloadImageASPng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName.replace('.png', '')}`;

  return {
    url,
    openAiUrl: response.data[0].url,
    revised_propt: response.data[0].revised_prompt,
  };
};
