import { User } from '../models';
import { generateJwtToken } from '../auth/jwtHelpers';
import {
  findAllPodcasts,
  findOnePodcast,
  searchEpisodes,
} from '../itunes/connectors';
import { extractColors, formatColor } from '../utils';

const createResolvers = {
  Query: {
    async podcasts(
      _,
      { id, name, genreId, limit },
      { token }: { token?: String },
      ) {
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
    },
    async login(root, args) {
      const { email, password } = args;
      try {
        const user: any = await User.findOne({email});
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
        }else {
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
    },
    async signup(root, args) {
      const { email, password } = args;
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
    },
  },
  Podcast: {
    episodes({ feedUrl }, { limit }) {
      return searchEpisodes({ feedUrl, limit });
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
    },
  },
};

export default createResolvers;
