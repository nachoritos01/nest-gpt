import OpenAI from 'openai';
interface Options {
  prompt: string;
}
export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Te seran prohibidos textos en español con posibles errores ortograficos y grmaticales,
          Las palabras usadas deben existir en el diccionario de la Real Academia de la lengua española,
          Debes de responder en formato JSON,
          tu tarea es corregirlos y retornar informacion  soluciones,
          tambien debes de dat un porcentaje de acierto por el usuario,


           si no hay errores , debes de retornar un mensaje de felicitaciones.

           Ejemplo de salida:

           {
            userScore: number,
            errors string[], // ['error -> solucion],
            message: string // Usa emojis y texto para felicitar al usuario o animarlo a mejorar si es score es menos del 80%

            ]
           }
          `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 150,
    temperature: 0.3,
    response_format: {
      type: 'json_object',
    },
  });

  console.log(completion);
  return JSON.parse(completion.choices[0].message.content);
};
