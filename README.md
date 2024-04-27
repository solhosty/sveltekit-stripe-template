### Stripe / Sveltekit / CMS Template

Hey all, I created this Stripe template for a family member's small business and figured I would share the simple process of importing products from a CMS, and creating a Stripe payment for the user.

This will display all in the `/user` and `/admin` route, but is a simple template where you can manage payments from a CMS, or any external data source to take Stripe payments.

This stack consists of:

- [SvelteKit](https://kit.svelte.dev/)
- [Prisma](https://www.prisma.io/)
- [Postgres DB](https://docs.railway.app/guides/postgresql)
- [Stripe](https://www.sveltestripe.com/)
- [Hygraph CMS](https://hygraph.com/)
- [tRPC](https://trpc.io/)
- [AuthJs](https://authjs.dev/)

For setup on any of these, refer to the startup documentation. You will be able to run this app without any paying subscription.

You can use any DB, for this I used a combo of Supabase and the built in Postgres DB from Railway. Both were easy to maintain.

# Set up

1. Run `npm install` or use your preferred package manager. 
*You will need various keys from the above stack config to place in your `.env`. More below*

2. When making test payments locally you will need to start the webhook server via this command:

```bash
stripe listen --forward-to localhost:4242/webhook
```

*Note: You can install Stripe CLI if you don't have it using the following command:*
```bash
brew install stripe/stripe-cli/stripe
``` 

# Customizing your config
1. To run the app make sure to fill out anything in the `.env.template`. If you want to customize your CMS template for packages/services you will need to make changes to the following components: 
 - appointment-card.svelte
 - service-card.svelte
 - testimonial-card.svelte

 Make sure to make changes in the `$lib/graphql.ts` to change the schema for your new CMS. The current Schema is below for getting services, and below that is the testimonials for the site to give another instance: 

 ```ts
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
```
2. You may want to customize the `schema.prisma` file for your use case. Make sure to do a `npx prisma db push` command to change the schema on your DB if any changes are made to this file after initial push. 
3. You may also want to customize or create your own queries in `lib/trpc`. If you do make sure to update any components where this may be called. You can remove as much as you need to start from where you want. 
4. You can customize the `user` and `admin` routes as needed. You can add admins by changing the user role in the database. 
5. Alternatively, you can also load local data in a `$lib/data/products.json` if you don't want to setup a CMS for this. This is not a directory setup, but is an example of one you can create.

## Questions? 
If you have any questions on the setup here or how you can customize it to your needs, open a discussion [here](https://github.com/solhosty/sveltekit-stripe-template/discussions). 
