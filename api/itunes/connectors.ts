import * as fetch from 'node-fetch';
import parsePodcast from '../utils/parsePodcast';
import UrlBuilder from '../utils/urlBuilder';

const fetchPodcasts = async ({ url }: { url: string }):
  Promise<Array<PodcastAPI>> => {
  const data: any = await fetch(url);
  const jsonData: ResponseAPI = await data.json();
  return jsonData.results;
};

export const findOnePodcast = async ({ id }: { id: string }):
  Promise<Array<PodcastAPI>> => {
  const url: string = new UrlBuilder().lookup(id).toString();
  return fetchPodcasts({ url });
};

export const findAllPodcasts = async ({ name, genreId, limit }:
  { name: string, genreId: number, limit: number }):
  Promise<Array<PodcastAPI>> => {
  let url: string;
  if (genreId) {
    url = new UrlBuilder()
      .search('podcast').byGenreId(genreId).withLimit(limit).toString();
  } else {
    url = new UrlBuilder()
      .search(name).withLimit(limit).toString();
  }
  return fetchPodcasts({ url });
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
