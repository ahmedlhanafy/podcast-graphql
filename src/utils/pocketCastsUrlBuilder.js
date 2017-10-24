/** @flow */

import type { PodcastCategory } from '../flow';

const PodcastCategoryEnum = {
  POPULAR: 'POPULAR',
  TRENDING: 'TRENDING',
  FEATURED: 'FEATURED',
};

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
    this.searchCategory = PodcastCategoryEnum.FEATURED;
    return this;
  }

  trending(): PocketCastsUrlBuilder {
    this.searchCategory = PodcastCategoryEnum.TRENDING;
    return this;
  }

  popular(): PocketCastsUrlBuilder {
    this.searchCategory = PodcastCategoryEnum.POPULAR;
    return this;
  }

  toString(): string {
    let str: string = this.hostUri;
    switch (this.searchCategory) {
      case PodcastCategoryEnum.FEATURED:
        str = str.concat(this.featuredResource);
        break;
      case PodcastCategoryEnum.TRENDING:
        str = str.concat(this.trendingResource);
        break;
      case PodcastCategoryEnum.POPULAR:
        str = str.concat(this.popularResource);
        break;
      default:
        break;
    }
    return str;
  }
}
