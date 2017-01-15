import { User } from '../models';
import { generateJwtToken } from '../auth/jwtHelpers';
import { extractColors, formatColor } from '../utils';
import {
  findAllPodcasts,
  findOnePodcast,
  searchEpisodes,
} from '../itunes/connectors';

const resolvePodcasts = async ({ id, name, genreId, limit }) => {
  let results: Array<ItunesApiResult>;
  if (id) {
    results = await findOnePodcast({ id });
  } else {
    results = await findAllPodcasts({ name, genreId, limit });
  }
  return results.map(podcast => ({
    ...podcast,
    id: podcast.collectionId,
    name: podcast.collectionName,
    itunesUrl: podcast.collectionViewUrl,
  }));
};

const resolveLogin = async ({ email, password }) => {
  try {
    const user: any = await User.findOne({ email });
    if (user) {
      if (user.password !== password) {
        return {
          success: false,
          message: 'Authentication failed. Wrong password.',
        };
      } else {
        return {
          success: true,
          message: 'Authentication Succeeded',
          token: generateJwtToken(user),
        };
      }
    } else {
      return {
        success: false,
        message: 'Authentication failed. User not found.',
      };
    }
  } catch (err) {
    return {
      success: false,
      // @FIXME: we need to send proper error message in this case
      message: err,
    };
  }
};

const resolveSignup = async ({ email, password }) => {
  const newUser = new User({ email, password });
  try {
    const user = await newUser.save();
    return {
      success: true,
      message: 'Authentication Succeeded',
      token: generateJwtToken(user),
    };
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
};

const resolveEpisodes = ({ feedUrl }, { limit }) => {
  return searchEpisodes({ feedUrl, limit });
};

const resolveArtworkUrls = (
  { artworkUrl30, artworkUrl60, artworkUrl100, artworkUrl600 },
) => {
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
      rgbColor: colorPalette.Vibrant ?
        formatColor(colorPalette.Vibrant.rgb) : 'rgb(75, 75, 75)',
      population: colorPalette.Vibrant ?
        colorPalette.Vibrant.population : 0,
    },
    darkVibrantColor: {
      rgbColor: colorPalette.DarkVibrant ?
        formatColor(colorPalette.DarkVibrant.rgb) : 'rgb(220, 156, 156)',
      population: colorPalette.DarkVibrant ?
        colorPalette.DarkVibrant.population : 0,
    },
  };
};

const createResolvers = {
  Query: {
    podcasts(_, args) {
      return resolvePodcasts(args);
    },
    login(_, args) {
      return resolveLogin(args);
    },
    signup(_, args) {
      return resolveSignup(args);
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
