import OpenAI from 'openai';
interface Options {
  prompt: string;
  lang: string;
}
export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Traduce el siguiente texto al idioma ${lang}:${prompt}

        
          `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 150,
    temperature: 0.3,
    /* response_format: {
      type: 'text',
    }, */
  });

  const message = completion.choices[0].message.content;

  return { message };
};
