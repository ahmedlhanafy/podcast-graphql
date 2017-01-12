import * as fetch from 'node-fetch';
import parsePodcastPromise from '../utils/parsePodcastPromise';

const ITUNES_URL = 'https://itunes.apple.com/';

export const findOnePodcast = async ({ id }: { id?: number | string }):
  Promise<Array<ItunesApiResult>> => {
  const url = `${ITUNES_URL}lookup?id=${id}`;
  const jsonData: ItunesApiResponse = await (await fetch(url)).json();
  return jsonData.results;
};

export const findAllPodcasts = async ({ name, limit }: { name?: string, limit?: number }):
  Promise<Array<ItunesApiResult>> => {
  const url = `${ITUNES_URL}search?entity=podcast&term=${name}&limit=${limit}`;
  const jsonData: ItunesApiResponse = await (await fetch(url)).json();
  return jsonData.results;
};

export const searchEpisodes = async ({ feedUrl, limit }: { feedUrl: string, limit?: number }): Promise<Array<Episode>> => {
  const podcastData = await fetch(feedUrl);
  const podcastJsonData = await podcastData.text();
  const podcastParsedData = await parsePodcastPromise(podcastJsonData);
  return podcastParsedData.episodes
    .slice(0, limit || podcastParsedData.episodes.length - 1);
};
