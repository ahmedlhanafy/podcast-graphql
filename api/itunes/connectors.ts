import * as fetch from 'node-fetch';
import parsePodcastPromise from '../utils/parsePodcastPromise';

const hostURI = 'https://itunes.apple.com/';
const lookupEndpoint = 'lookup?id=$id';
const searchEndpoint = 'search?entity=podcast&term=$name&limit=$limit';

const fetchItunesApiResults = async ({ url }: { url?: string }): Promise<Array<ItunesApiResult>> => {
  return (await (await fetch(url)).json()).results;
};

export async function findOnePodcast({ id }: { id?: number | string }) {
  const url = hostURI.concat(lookupEndpoint.replace('$id', id.toString()));
  return fetchItunesApiResults({ url });
};

export async function findAllPodcasts({ name, limit }: { name?: string, limit?: number }) {
  let url = hostURI.concat(searchEndpoint.replace('$name', name));
  if (limit) {
    url = url.replace('$limit', limit.toString());
  }
  return fetchItunesApiResults({ url });
};

export const searchEpisodes = async ({ feedUrl, limit }: { feedUrl: string, limit?: number }): Promise<Array<Episode>> => {
  const podcastData = await fetch(feedUrl);
  const podcastJsonData = await podcastData.text();
  const podcastParsedData = await parsePodcastPromise(podcastJsonData);
  return podcastParsedData.episodes
    .slice(0, limit || podcastParsedData.episodes.length - 1);
};
