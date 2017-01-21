import { User } from '../db';
import { generateToken } from '../auth/jwtHelpers';
import { extractColors, formatColor } from '../utils';
import {
  findAllPodcasts,
  findOnePodcast,
  fetchEpisodes,
  getFeaturedPodcasts,
  getTrendingPodcasts,
  getPopularPodcasts,
} from '../itunes/connectors';

const resolveLogin = async ({ email, password }:
  { email: string, password: string }): Promise<any> => {
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
          token: generateToken(user),
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

const resolveSignup = async ({ email, password }:
  { email: string, password: string }): Promise<any> => {
  const newUser: any = new User({ email, password });
  try {
    const user: any = await newUser.save();
    return {
      success: true,
      message: 'Authentication Succeeded',
      token: generateToken(user),
    };
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
};

const resolvePodcasts = async ({ id, name, genre, category, limit }:
  { id: string, name: string, genre: string, category: string, limit: number }):
  Promise<Array<PodcastAPI>> => {
  let results: Array<PodcastAPI>;
  if (id) {
    results = await findOnePodcast({ id });
  } else {
    if (category) {
      switch (category) {
        case 'FEATURED': results = await getFeaturedPodcasts(); break;
        case 'TRENDING': results = await getTrendingPodcasts(); break;
        case 'POPULAR': results = await getPopularPodcasts(); break;
        default: break;
      }
    } else {
      results = await findAllPodcasts({ name, genre, limit });
    }
  }
  return results.map(podcast => ({
    ...podcast,
    id: podcast.collectionId,
    name: podcast.collectionName,
    viewUrl: podcast.collectionViewUrl,
  }));
};

const resolveEpisodes = async ({ feedUrl }: { feedUrl: string },
  { first, offset }: { first: number, offset: number }):
  Promise<Array<ParsedEpisode>> => {
  return await fetchEpisodes({ feedUrl, first, offset });
};

const resolveArtworkUrls = (
  {
    artworkUrl30,
    artworkUrl60,
    artworkUrl100,
    artworkUrl600,
  }: {
      artworkUrl30: string,
      artworkUrl60: string,
      artworkUrl100: string,
      artworkUrl600: string,
    },
): any => {
  return {
    xsmall: artworkUrl30,
    small: artworkUrl60,
    medium: artworkUrl100,
    large: artworkUrl600,
  };
};

const resolveArtist = ({ artistId, artistName, artistViewUrl }:
  { artistId: string, artistName: string, artistViewUrl: string }): any => {
  return {
    id: artistId,
    name: artistName,
    viewUrl: artistViewUrl,
  };
};

const resolvePalette = async ({ artworkUrl60 }: { artworkUrl60: string }):
  Promise<any> => {
  const colorPalette: ColorPalette = await extractColors(artworkUrl60);
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

const resolversMap = {
  Query: {
    login(_, args: any): Promise<any> {
      return resolveLogin(args);
    },
    signup(_, args: any): Promise<any> {
      return resolveSignup(args);
    },
    podcasts(_, args: any): Promise<Array<PodcastAPI>> {
      return resolvePodcasts(args);
    },
  },
  Podcast: {
    episodes(root: any, args: any): Promise<Array<ParsedEpisode>> {
      return resolveEpisodes(root, args);
    },
    artworkUrls(root: any): any {
      return resolveArtworkUrls(root);
    },
    artist(root: any): any {
      return resolveArtist(root);
    },
    palette(root: any): Promise<any> {
      return resolvePalette(root);
    },
  },
};

export default resolversMap;
