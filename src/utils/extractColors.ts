import * as vibrant from 'node-vibrant';
import { ColorPalette } from '../itunes/types';

const extractColors = (data: string): Promise<ColorPalette> =>
  new Promise<ColorPalette>((resolve, reject) => {
    vibrant.from(data).getPalette((err, palette) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(palette);
    });
  });

export default extractColors;
