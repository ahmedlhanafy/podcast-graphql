const schema = `
type Podcast {
  artist: Artist
  artworkUrls: Artwork
  country: String!
  episodes(limit: Int): [Episode]
  feedUrl: String!
  genreIds: [Int]!
  genres: [String]!
  id: ID!
  itunesUrl: String!
  name: String!
  palette: Palette
  primaryGenreName: String
  releaseDate: String
  trackCount: Int!
}

type Artist {
  name: String
  itunesUrl: String
  id: ID
}

type Artwork {
  xsmall: String!
  small: String!
  medium: String!
  large: String!
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
  success: Boolean!
  message: String!
  token: String
}

type Query {
  login(email: String!, password: String!): AuthResponse
  signup(email: String!, password: String!): AuthResponse
  podcasts(name: String, genreId: Int, limit: Int, id: String): [Podcast]
}

schema {
  query: Query
}
`;

export default schema;
