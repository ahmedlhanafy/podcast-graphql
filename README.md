<img src="https://static1.squarespace.com/static/5451765ce4b0f4d5bea100a6/t/55a2bae4e4b0b8ef82d7b1a4/1436728038315/all-of-the-above-subcribe-itunes-podcast-apple.png" width="200"/>

## Usage
* `npm install`
* `npm start`

## GraphQL <img src="http://graphql.org/img/logo.svg" width="20"/>

### Sample GraphQL Queries

#### Search podcasts by name
```graphql
{
  podcasts(name: "Modern", limit: 5) {
    name
  }
}
```

#### Search podcasts by genre
```graphql
{
  podcasts(genre: COMEDY, limit: 5) {
    name
  }
}
```

#### Search podcasts by category
```graphql
{
  podcasts(category: FEATURED) {
    name
  }
}
```

#### Lookup podcast by ID
```graphql
{
  podcasts(id: "863897795") {
    name
  }
}
```

#### Retrieve paginated episodes
```graphql
{
  podcasts(id: "863897795") {
    name
    episodes(offset: 0, first: 10) {
      title
    }
  }
}
```