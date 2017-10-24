/** @flow */

export default class PocketCastsUrlBuilder {
   hostUri: string;
   featuredResource: string;
   trendingResource: string;
   popularResource: string;
   searchCategory: PodcastCategory;

  constructor() {
    this.hostUri = 'https://discover.pocketcasts.com/discover/json';
    this.featuredResource = '/featured.json';
    this.trendingResource = '/trending.json';
    this.popularResource = '/popular_world.json';
    return this;
  }

   featured(): PocketCastsUrlBuilder {
    this.searchCategory = PodcastCategory.FEATURED;
    return this;
  }

   trending(): PocketCastsUrlBuilder {
    this.searchCategory = PodcastCategory.TRENDING;
    return this;
  }

   popular(): PocketCastsUrlBuilder {
    this.searchCategory = PodcastCategory.POPULAR;
    return this;
  }

   toString(): string {
    let str: string = this.hostUri;
    switch (this.searchCategory) {
      case PodcastCategory.FEATURED:
        str = str.concat(this.featuredResource);
        break;
      case PodcastCategory.TRENDING:
        str = str.concat(this.trendingResource);
        break;
      case PodcastCategory.POPULAR:
        str = str.concat(this.popularResource);
        break;
      default:
        break;
    }
    return str;
  }
}

enum PodcastCategory {
  POPULAR,
  TRENDING,
  FEATURED,
}
