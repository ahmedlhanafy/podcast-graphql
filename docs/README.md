<h2 align="center">GraphQL API <img src="http://graphql.org/img/logo.svg" width="20"/></h2>

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
