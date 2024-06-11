import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (
  openai: OpenAI,
  { threadId, assistantId = 'asst_dWmAdn6flfQM0mhcGY7n0EpC' }: Options,
) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //Instrucciones Sobreescribe el asistente
  });

  return run;
};
