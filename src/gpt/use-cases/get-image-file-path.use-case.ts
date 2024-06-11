import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';
export const getImagefilePathUseCase = async (fileId: string) => {
  const filePath = path.resolve(
    __dirname,
    `../../../generated/images/`,
    `${fileId}.png`,
  );

  const wasFound = fs.existsSync(filePath);

  if (!wasFound) {
    throw new NotFoundException(`Image file with id ${fileId} not found`);
  }

  return filePath;
};
