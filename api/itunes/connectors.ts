import * as fetch from 'node-fetch';
import parsePodcastPromise from '../utils/parsePodcastPromise';

const ITUNES_URL = 'https://itunes.apple.com/';

const fetchItunesApiResults = async ({ url }: { url?: string }):
  Promise<Array<ItunesApiResult>> => {
  const jsonData: ItunesApiResponse = await (await fetch(url)).json();
  return jsonData.results;
};

export async function findOnePodcast({ id }: { id?: number | string }) {
  const url = `${ITUNES_URL}lookup?id=${id}`;
  return fetchItunesApiResults({ url });
};

export async function findAllPodcasts({ name, limit }: { name?: string, limit?: number }) {
  const url = `${ITUNES_URL}search?entity=podcast&term=${name}&limit=${limit}`;
  return fetchItunesApiResults({ url });
};

export const searchEpisodes = async ({ feedUrl, limit }: { feedUrl: string, limit?: number }): Promise<Array<Episode>> => {
  const podcastData = await fetch(feedUrl);
  const podcastJsonData = await podcastData.text();
  const podcastParsedData = await parsePodcastPromise(podcastJsonData);
  return podcastParsedData.episodes
    .slice(0, limit || podcastParsedData.episodes.length - 1);
};
