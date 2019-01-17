import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

app.use(bodyParser.json());

const events = [];

app.use(
	"/graphql",
	graphqlHTTP({
		schema: buildSchema(`

			type Event{
				id: ID!,
				title: String!,
				description: String!,
				price: Float!,
				date: String!
			}

			input EventInput{
				title: String!
				description: String!
				price: Float!
				date: String!
			}

			type RootQuery{
				events: [Event!]!
			}

			type RootMutation{
				createEvent(eventInput: EventInput): Event
			}

			schema{
				query: RootQuery,
				mutation: RootMutation
			}
		`),
		rootValue: {
			events: () => {
				return events;
			},
			createEvent: (args) => {
				console.log(args);
				const event = {
					id: Math.random().toString(),
					title: args.eventInput.title,
					description: args.eventInput.description,
					price: +args.eventInput.price,
					date: args.eventInput.date
				};

				events.push(event);
				return event;
			}
		},
		graphiql: true
	})
);

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
