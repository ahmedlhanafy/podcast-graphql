import * as fetch from 'node-fetch';
import parsePodcastPromise from '../utils/parsePodcastPromise';

const ITUNES_URL = 'https://itunes.apple.com/';

export const searchPodcasts = async ({ name, limit, id }: {name?: string, limit?: number, id?: number | string}):
  Promise<Array<SearchPodcastsResult>> => {
    let url = `${ITUNES_URL}search?entity=podcast&term=${name}&limit=${limit}`;
    if (id) {
      url = `${ITUNES_URL}lookup?id=${id}`;
    }
    const data = await fetch(url);
    const jsonData: ItunesApiResponse = await data.json();
    const results = jsonData.results.map(podcast => ({
      ...podcast,
      id: podcast.collectionId,
      name: podcast.collectionName,
      itunesUrl: podcast.collectionViewUrl,
    }));
    return results;
};


export const searchEpisodes = async ({ feedUrl, limit }: {feedUrl: string, limit?: number}): Promise<Array<Episode>> => {
  const podcastData = await fetch(feedUrl);
  const podcastJsonData = await podcastData.text();
  const podcastParsedData = await parsePodcastPromise(podcastJsonData);
  return podcastParsedData.episodes
    .slice(0, limit || podcastParsedData.episodes.length - 1);
};
