const schema = `
type Person {
    name: String!
}
type Query {
  Person(name: String!): [Person]
}

schema {
  query: Query,
}
`;

export default schema;