import fetch from "node-fetch";

const user = fetch("https://randomuser.me/api").then((response) => response.text()).then((result) => result);

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		description: "...",
		fields: () => ({})
	})
});
