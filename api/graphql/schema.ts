// tslint:disable:max-line-length
const schema = `
type Podcast {
  artist: Artist
  artworkUrls: Artwork
  country: String
  episodes(first: Int, offset: Int): [Episode]
  feedUrl: String
  genreIds: [Int]
  genres: [String]
  id: ID
  viewUrl: String
  name: String
  palette: Palette
  primaryGenreName: String
  releaseDate: String
  trackCount: Int
}

type Artist {
  name: String
  viewUrl: String
  id: ID
}

type Artwork {
  xsmall: String
  small: String
  medium: String
  large: String
}

type Episode {
  title: String
  description: String
  guid: String
  published: String
  duration: Int
  enclosure: Enclosure
}

type Palette {
  vibrantColor: Color
  darkVibrantColor: Color
}

type Color {
  rgbColor: String
  population: Int
}

type Enclosure {
  filesize: Int
  type: String
  url: String
}

type AuthResponse {
  success: Boolean
  message: String
  token: String
}

enum Genre {
  ARTS
  COMEDY
  EDUCATION
  FAMILY
  HEALTH
  TV
  MUSIC
  NEWS
  RELIGION
  SCIENCE
  SPORTS
  TECHNOLOGY
  BUSINESS
  GAMES
  SOCIETY
  GOVERNMENT
}

enum Category {
  FEATURED
  TRENDING
  POPULAR
}

type Query {
  login(email: String!, password: String!): AuthResponse
  signup(email: String!, password: String!): AuthResponse
  podcasts(id: String, name: String, genre: Genre, category: Category, limit: Int): [Podcast]
}

schema {
  query: Query
}
`;

export default schema;
