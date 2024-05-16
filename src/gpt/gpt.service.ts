import { Injectable } from '@nestjs/common';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';
import { ProsConsDiscusserDto, TranslateDto } from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
  translateUseCase,
} from './use-cases';

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
}
