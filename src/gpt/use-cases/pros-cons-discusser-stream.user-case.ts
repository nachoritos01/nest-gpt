import OpenAI from 'openai';
interface Options {
  prompt: string;
}
export const prosConsDicusserStreamUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  return await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
          Eres un experto en analisis se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de ser en formato markdown,
          los pros y contras deben de estar en una lista,
           
          `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    temperature: 0.8,
  });

};
