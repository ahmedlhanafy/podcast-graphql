import vibrant = require('node-vibrant');
import { Palette } from 'node-vibrant/lib/color';

const extractColors = (data: string): Promise<Palette> =>
  new Promise<Palette>((resolve, reject) => {
    vibrant.from(data).getPalette((err, palette) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(palette);
    });
  });

export default extractColors;
