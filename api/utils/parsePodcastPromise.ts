import * as parsePodcast from 'node-podcast-parser';

// `node-podcast-parser` uses callbacks so this is a wrapper that converts it to a promise
const parsePodcastPromise = data => new Promise<ParsePodcastApiResponse>((resolve, reject) => {
  parsePodcast(data, (err, d) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(d);
  });
});

export default parsePodcastPromise;
