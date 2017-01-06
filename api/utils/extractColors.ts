import * as vibrant from 'node-vibrant';

const extractColors = data => new Promise<ColorPalette>((resolve, reject) => {
  vibrant.from(data).getPalette((err, palette) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(palette);
  });
});

export default extractColors;
