/** @flow */

import vibrant from 'node-vibrant';

const extractColors = (data: string): Promise<ColorPalette> =>
  new Promise((resolve, reject) => {
    vibrant.from(data).getPalette((err, palette) => {
      if (err) {
        return reject(err);
      }
      resolve(palette);
    });
  });

export default extractColors;
