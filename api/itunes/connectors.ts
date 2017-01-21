import * as fetch from 'node-fetch';
import parsePodcast from '../utils/parsePodcast';
import ItunesUrlBuilder from '../utils/itunesUrlBuilder';
import PocketCastsUrlBuilder from '../utils/pocketCastsUrlBuilder';

const fetchPodcasts = async ({ url }: { url: string }):
  Promise<Array<PodcastAPI>> => {
  const data: any = await fetch(url);
  const jsonData: ResponseAPI = await data.json();
  return jsonData.results;
};

const fetchCategoricalPodcasts = async ({ url }: { url: string }):
  Promise<any> => {
  const data: any = await fetch(url);
  const jsonData: any = await data.json();
  return jsonData.result.podcasts;
};

export const findOnePodcast = async ({ id }: { id: string }):
  Promise<Array<PodcastAPI>> => {
  const url: string = new ItunesUrlBuilder().lookup(id).toString();
  return fetchPodcasts({ url });
};

export const findAllPodcasts = async ({ name, genre, limit }:
  { name: string, genre: string, limit: number }):
  Promise<Array<PodcastAPI>> => {
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

export const getFeaturedPodcasts = async () => {
  const url: string = new PocketCastsUrlBuilder().featured().toString();
  const featuredPodcasts: any = await fetchCategoricalPodcasts({ url });
  return (await Promise.all(featuredPodcasts.map(async podcast => {
    const searchResults: Array<PodcastAPI> = await findAllPodcasts({
      name: podcast.title,
      genre: undefined,
      limit: 200,
    });
    return searchResults.find(searchResult =>
      searchResult.collectionName === podcast.title);
  }))).filter(searchResult => searchResult !== undefined);
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
