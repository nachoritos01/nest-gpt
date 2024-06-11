import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkRunCompleteStatusUseCase = async (
  openai: OpenAI,
  { threadId, runId }: Options,
) => {
  const runstatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  console.log(runstatus);
  if (runstatus.status === 'completed') return runstatus;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return checkRunCompleteStatusUseCase(openai, { threadId, runId });
};
