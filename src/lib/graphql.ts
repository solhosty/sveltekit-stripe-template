import { gql, GraphQLClient } from 'graphql-request';

export const loadServices = async () => {
	const hygraph = new GraphQLClient(import.meta.env.VITE_HYGRAPH_URL, {
		headers: {}
	});
	const query = gql`
		query ServicesIndex {
			services {
				id
				name
				slug
				description
				image
				calendarType
				packages {
					id
					name
					slug
					description
					cost
					discount
					aggressiveFee
					includes {
						html
					}
				}
			}
		}
	`;
	const { services } = (await hygraph.request(query)) as any;
	return services;
};

export const loadTestimonials = async () => {
	const hygraph = new GraphQLClient(import.meta.env.VITE_HYGRAPH_URL, {
		headers: {}
	});
	const newQuery = gql`
		query ReviewsIndex {
			reviews {
				name
				review
				rating
			}
		}
	`;
	const { reviews } = (await hygraph.request(newQuery)) as any;
	return reviews;
};
