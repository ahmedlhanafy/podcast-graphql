import { findAllPodcasts, findOnePodcast, searchEpisodes } from '../itunes/connectors';
import { extractColors, formatColor } from '../utils';

const resolvePodcasts = async ({ id, name, limit }) => {
  let results;
  if (id) {
    results = await findOnePodcast({ id });
  } else {
    results = await findAllPodcasts({ name, limit });
  }
  return results.map(podcast => ({
    ...podcast,
    id: podcast.collectionId,
    name: podcast.collectionName,
    itunesUrl: podcast.collectionViewUrl,
  }));
};

const resolveEpisodes = ({ feedUrl }, { limit }) => {
  return searchEpisodes({ feedUrl, limit });
};

const resolveArtworkUrls = ({ artworkUrl30, artworkUrl60, artworkUrl100, artworkUrl600 }) => {
  return {
    xsmall: artworkUrl30,
    small: artworkUrl60,
    medium: artworkUrl100,
    large: artworkUrl600,
  };
};

const resolveArtist = ({ artistId, artistName, artistViewUrl }) => {
  return {
    id: artistId,
    name: artistName,
    itunesUrl: artistViewUrl,
  };
};

const resolvePalette = async ({ artworkUrl60 }) => {
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
};

const createResolvers = {
  Query: {
    podcasts(_, args) {
      return resolvePodcasts(args);
    },
  },
  Podcast: {
    episodes(root, args) {
      return resolveEpisodes(root, args);
    },
    artworkUrls(root) {
      return resolveArtworkUrls(root);
    },
    artist(root) {
      return resolveArtist(root);
    },
    palette(root) {
      return resolvePalette(root);
    },
  },
};

export default createResolvers;
