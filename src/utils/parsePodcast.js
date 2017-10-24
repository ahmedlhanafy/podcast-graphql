/** @flow */

import parsePodcastCallback from 'node-podcast-parser';

const parsePodcast = (data: string): Promise<ParsedPodcast> =>
  new Promise((resolve, reject) => {
    parsePodcastCallback(data, (err, parsedData) => {
      if (err) {
        return reject(err);
      }
      resolve(parsedData);
    });
  });

export default parsePodcast;
