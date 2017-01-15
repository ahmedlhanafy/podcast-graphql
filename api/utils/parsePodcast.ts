import * as parsePodcastCallback from 'node-podcast-parser';

const parsePodcast = data =>
  new Promise<ParsedPodcastAPI>((resolve, reject) => {
    parsePodcastCallback(data, (err, parsedData) => {
      if (err) {
        reject(err);
      }
      resolve(parsedData);
    });
  });

export default parsePodcast;
