import * as fetch from 'node-fetch';
import parsePodcast from '../utils/parsePodcast';
import ItunesUrlBuilder from '../utils/itunesUrlBuilder';
import PocketCastsUrlBuilder from '../utils/pocketCastsUrlBuilder';

const fetchPodcasts = async ({ url }: { url: string }):
  Promise<Array<ItunesPodcast>> => {
  const data: any = await fetch(url);
  const jsonData: ItunesResponse = await data.json();
  return jsonData.results;
};

export const findOnePodcast = async ({ id }: { id: string }):
  Promise<Array<ItunesPodcast>> => {
  const url: string = new ItunesUrlBuilder().lookup(id).toString();
  return fetchPodcasts({ url });
};

export const findAllPodcasts = async ({ name, genre, limit }:
  { name: string, genre: string, limit: number }):
  Promise<Array<ItunesPodcast>> => {
  let url: string;
  if (genre) {
    url = new ItunesUrlBuilder()
      .search('podcast').byGenre(genre).withLimit(limit).toString();
  } else {
    url = new ItunesUrlBuilder()
      .search(name).withLimit(limit).toString();
  }
  return fetchPodcasts({ url });
};

const fetchCategoricalPodcasts = async ({ url }: { url: string }):
  Promise<Array<any>> => {
  const data: any = await fetch(url);
  const jsonData: any = await data.json();
  return jsonData.result.podcasts;
};

const normalizeCategoricalPodcasts = (podcasts: Array<any>): Array<any> => {
  return podcasts.map(podcast => ({
    collectionName: podcast.title,
    artworkUrl600: podcast.thumbnail_url_small,
  }));
};

export const getFeaturedPodcasts = async (): Promise<Array<ItunesPodcast>> => {
  const url: string = new PocketCastsUrlBuilder().featured().toString();
  const featuredPodcasts: any = await fetchCategoricalPodcasts({ url });
  return normalizeCategoricalPodcasts(featuredPodcasts);
};

export const getTrendingPodcasts = async (): Promise<Array<ItunesPodcast>> => {
  const url: string = new PocketCastsUrlBuilder().trending().toString();
  const trendingPodcasts: any = await fetchCategoricalPodcasts({ url });
  return normalizeCategoricalPodcasts(trendingPodcasts);
};

export const getPopularPodcasts = async (): Promise<Array<ItunesPodcast>> => {
  const url: string = new PocketCastsUrlBuilder().popular().toString();
  const popularPodcasts: any = await fetchCategoricalPodcasts({ url });
  return normalizeCategoricalPodcasts(popularPodcasts);
};

export const fetchEpisodes = async ({ feedUrl, first, offset }:
  { feedUrl: string, first: number, offset: number }):
  Promise<Array<ParsedEpisode>> => {
  const data: any = await fetch(feedUrl);
  const textData: string = await data.text();
  const parsedPodcast: ParsedPodcast = await parsePodcast(textData);
  return parsedPodcast.episodes
    .slice(offset, first + offset || parsedPodcast.episodes.length);
};
