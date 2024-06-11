import OpenAI from 'openai';
interface Options {
  baseImage?: string;
}
export const imageVariationUseCase = async (
  openai: OpenAI,
  { baseImage }: Options,
) => {
  return baseImage;
};
