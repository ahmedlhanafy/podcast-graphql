import * as parsePodcastCallback from 'node-podcast-parser';
import { ParsedPodcast } from '../itunes/types';

const parsePodcast = (data: string): Promise<ParsedPodcast> =>
  new Promise<ParsedPodcast>((resolve, reject) => {
    parsePodcastCallback(data, (err, parsedData) => {
      if (err) {
        reject(err);
      }
      resolve(parsedData);
    });
  });

export default parsePodcast;
