/** @flow */

export type User = {
  email: string,
  password: string,
};

export type ItunesPodcast = {
  wrapperType: string,
  kind: string,
  collectionId: number,
  trackId: number,
  artistName: string,
  collectionName: string,
  trackName: string,
  collectionCensoredName: string,
  trackCensoredName: string,
  collectionViewUrl: string,
  feedUrl: string,
  trackViewUrl: string,
  artworkUrl30: string,
  artworkUrl60: string,
  artworkUrl100: string,
  collectionPrice: number,
  trackPrice: number,
  trackRentalPrice: number,
  collectionHdPrice: number,
  trackHdPrice: number,
  trackHdRentalPrice: number,
  releaseDate: string,
  collectionExplicitness: string,
  trackExplicitness: string,
  trackCount: number,
  country: string,
  currency: string,
  primaryGenreName: string,
  contentAdvisoryRating: string,
  artworkUrl600: string,
  genreIds: Array<number>,
  genres: Array<string>,
};

export type ItunesResponse = {
  resultCount: number,
  results: Array<ItunesPodcast>,
};

export type ParsedEpisode = {
  guid: string,
  title: string,
  description: string,
  image: string,
  published: string,
  duration: number,
  categories: Array<string>,
  enclosure: {
    filesize: number,
    type: string,
    url: string,
  },
};

export type ParsedPodcast = {
  title: string,
  description: {
    short: string,
    description: string,
  },
  link: string,
  image: string,
  language: string,
  copyright: string,
  updated: string,
  categories: Array<string>,
  owner: {
    name: string,
    email: string,
  },
  episodes: Array<ParsedEpisode>,
};

export type ColorObject = {
  rgb: Array<number>,
  population: number,
};

export type ColorPalette = {
  Vibrant: ColorObject,
  DarkVibrant: ColorObject,
  Muted: ColorObject,
};

export type PodcastCategory = 'POPULAR' | 'TRENDING' | 'FEATURED';
