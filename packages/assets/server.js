
import fs from 'fs';
import fsPromises from 'fs/promises';
import Fiber from 'fibers';
import path from 'path';

export function createAssets(moduleId) {
  const basePath = path.dirname(moduleId).replace('file:', '');
  return {
    getText(file) {
      return Fiber.current
        ? Promise.await(fsPromises.readFile(path.join(basePath, file))).toString()
        : fs.readFileSync(path.join(basePath, file)).toString();
    },
    getBinary(file) {
      return Fiber.current
        ? Promise.await(fsPromises.readFile(path.join(basePath, file))).toString()
        : fs.readFileSync(path.join(basePath, file)).toString();
    },
    absoluteFilePath(file) {
      return path.join(basePath, file);
    }
  }
};
