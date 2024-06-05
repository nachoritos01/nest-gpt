import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';
export const getAudiofilePathUseCase = async (fileId: string) => {
  const filePath = path.resolve(
    __dirname,
    `../../../generated/audios/`,
    `${fileId}.mp3`,
  );

  const wasFound = fs.existsSync(filePath);

  if (!wasFound) {
    throw new NotFoundException(`Audio file with id ${fileId} not found`);
  }

  return filePath;
};
