import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';
interface Options {
  prompt: string;
  voice: string;
}
export const textToAudioUseCase = async (
  openIa: OpenAI,
  { prompt, voice }: Options,
) => {
  const voices = {
    echo: 'echo',
    alloy: 'alloy',
    fable: 'fable',
    onyx: 'onyx',
    nova: 'nova',
    shimmer: 'shimmer',
  };

  const selected = voices[voice] || 'nova';

  const folderPath = path.resolve(__dirname, `../../../generated/audios/`);
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openIa.audio.speech.create({
    model: 'tts-1-hd',
    voice: selected,
    input: prompt,
    response_format: 'mp3',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());

  fs.writeFileSync(speechFile, buffer);

  console.log(`Audio file saved at ${speechFile}`);
  return speechFile;
};
