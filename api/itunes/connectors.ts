import * as fetch from 'node-fetch';
import parsePodcast from '../utils/parsePodcast';
import UrlBuilder from '../utils/urlBuilder';

const fetchItunesApiResults = async ({ url }: { url?: string }):
  Promise<Array<PodcastAPI>> => {
  const data = await fetch(url);
  const jsonData: ResponseAPI = await data.json();
  return jsonData.results;
};

export const findOnePodcast = async ({ id }: { id?: string }):
  Promise<Array<PodcastAPI>> => {
  const url = new UrlBuilder().lookup(id).toString();
  return fetchItunesApiResults({ url });
};

export const findAllPodcasts = async ({ name, genreId, limit }:
  { name?: string, genreId?: number, limit?: number }):
  Promise<Array<PodcastAPI>> => {
  let url;
  if (genreId) {
    url = new UrlBuilder()
      .search('podcast').byGenreId(genreId).withLimit(limit).toString();
  } else {
    url = new UrlBuilder()
      .search(name).withLimit(limit).toString();
  }
  return fetchItunesApiResults({ url });
};

export const searchEpisodes = async ({ feedUrl, limit }:
  { feedUrl: string, limit?: number }): Promise<Array<Episode>> => {
  const podcastData = await fetch(feedUrl);
  const podcastJsonData = await podcastData.text();
  const podcastParsedData = await parsePodcast(podcastJsonData);
  return podcastParsedData.episodes
    .slice(0, limit || podcastParsedData.episodes.length - 1);
};
