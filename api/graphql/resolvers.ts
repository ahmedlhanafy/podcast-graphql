const resolvers = ({
  Query: {
      Person(){
          return [{name: 'Ahmed'}, {name: 'Magdy'}];
      }
    },
});

export default resolvers;
