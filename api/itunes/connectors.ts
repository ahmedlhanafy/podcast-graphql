import * as fetch from 'node-fetch';
import parsePodcastPromise from '../utils/parsePodcastPromise';
import UrlBuilder from '../utils/url-builder';

const fetchItunesApiResults = async ({ url }: { url?: string }): Promise<Array<ItunesApiResult>> => {
  const data = await fetch(url);
  const jsonData: ItunesApiResponse = await data.json();
  return jsonData.results;
};

export async function findOnePodcast({ id }: { id?: number | string }) {
  const url = new UrlBuilder().lookup(id.toString()).toString();
  return fetchItunesApiResults({ url });
};

export async function findAllPodcasts({ name, limit }: { name?: string, limit?: number }) {
  const url = new UrlBuilder().search(name).withLimit(limit).toString();
  return fetchItunesApiResults({ url });
};

export const searchEpisodes = async ({ feedUrl, limit }: { feedUrl: string, limit?: number }): Promise<Array<Episode>> => {
  const podcastData = await fetch(feedUrl);
  const podcastJsonData = await podcastData.text();
  const podcastParsedData = await parsePodcastPromise(podcastJsonData);
  return podcastParsedData.episodes
    .slice(0, limit || podcastParsedData.episodes.length - 1);
};
