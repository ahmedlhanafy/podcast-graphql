<h2 align="center">GraphQL API <img src="https://user-images.githubusercontent.com/11808903/41505468-33f3205c-720a-11e8-82fd-89f651f98497.png" width="20"/></h2>

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
