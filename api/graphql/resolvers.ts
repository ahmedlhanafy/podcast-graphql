import {
  searchPodcasts,
  searchEpisodes,
 } from '../itunes/connectors';
import { extractColors, formatColor } from '../utils';


const createResolvers = {
  Query: {
    async podcasts(root, args) {
      return searchPodcasts(args);
    },
  },
  Podcast: {
    episodes({ feedUrl }) {
      return searchEpisodes({ feedUrl });
    },
    artworkUrls({
      artworkUrl30: xsmall,
      artworkUrl60: small,
      artworkUrl100: medium,
      artworkUrl600: large,
    }) {
      return { xsmall, small, medium, large };
    },
    artist({
      artistId: id,
      artistName: name,
      artistViewUrl: itunesUrl,
    }) {
      return { id, name, itunesUrl };
    },
    async palette({ artworkUrl60 }) {
      const colorPalette = await extractColors(artworkUrl60);
      return {
        vibrantColor: {
          rgbColor: colorPalette.Vibrant ? formatColor(colorPalette.Vibrant.rgb) : 'rgb(75, 75, 75)',
          population: colorPalette.Vibrant ? colorPalette.Vibrant.population : 0,
        },
        darkVibrantColor: {
          rgbColor: colorPalette.DarkVibrant ? formatColor(colorPalette.DarkVibrant.rgb) : 'rgb(220, 156, 156)',
          population: colorPalette.DarkVibrant ? colorPalette.DarkVibrant.population : 0,
        },
      };
    },
  },
};
export default createResolvers;
