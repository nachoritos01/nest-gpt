import { Injectable } from '@nestjs/common';
import {
  checkRunCompleteStatusUseCase,
  createMesageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListByThreadUseCase,
} from './use-cases';
import OpenAI from 'openai';
import { UserQuestionDto } from './dtos/user-questions.dto';

@Injectable()
export class SamAssistantService {
  private openIa = new OpenAI({
    apiKey: process.env.OPENIA_API_KEY,
  });
  async createThread() {
    return createThreadUseCase(this.openIa);
  }
  async userQuestion(userQuestionDto: UserQuestionDto) {
    const { threadId, question } = userQuestionDto;
    const message = createMesageUseCase(this.openIa, { threadId, question });

    const run = await createRunUseCase(this.openIa, { threadId });

    await checkRunCompleteStatusUseCase(this.openIa, {
      threadId,
      runId: run.id,
    });

    const messages = await getMessageListByThreadUseCase(this.openIa, {
      threadId,
    });
    return messages;
  }
}
