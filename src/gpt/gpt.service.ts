import { Injectable } from '@nestjs/common';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  ProsConsDiscusserDto,
  TranslateDto,
} from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
  translateUseCase,
  textToAudioUseCase,
  getAudiofilePathUseCase,
  audioToTextUseCase,
  imageGenerationUseCase,
  getImagefilePathUseCase,
} from './use-cases';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { imageVariationUseCase } from './use-cases/image-variation.use-case';

@Injectable()
export class GptService {
  private openia = new OpenAI({
    apiKey: process.env.OPENIA_API_KEY,
  });
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openia, {
      prompt: orthographyDto.prompt,
    });
  }
  async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openia, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }
  async prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openia, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }
  async translate(translateDto: TranslateDto) {
    return await translateUseCase(this.openia, {
      prompt: translateDto.prompt,
      lang: translateDto.lang,
    });
  }
  async textToAudio(textToAudioDto: TextToAudioDto) {
    return await textToAudioUseCase(this.openia, {
      prompt: textToAudioDto.prompt,
      voice: textToAudioDto.voice,
    });
  }

  getAudioFilePath(fileId: string) {
    return getAudiofilePathUseCase(fileId);
  }
  getImageFilePath(fileId: string) {
    return getImagefilePathUseCase(fileId);
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto;
    return await audioToTextUseCase(this.openia, { prompt, audioFile });
  }

  async imageGenerator(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openia, {
      ...imageGenerationDto,
    });
  }

  async generateImageVariation({ baseImage }: ImageVariationDto) {
    return imageVariationUseCase(this.openia, { baseImage });
  }
}
