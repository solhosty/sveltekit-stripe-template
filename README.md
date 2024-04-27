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

To run the app make sure to fill out anything in the `.env.template`. Then run `npm install`.

When making test payments locally you will need to start the webhook server via this command:

```bash
stripe listen --forward-to localhost:4242/webhook
```

You can install Stripe CLI if you don't have it using the following command:

```bash
brew install stripe/stripe-cli/stripe
```

**You will need various keys from the above stack config to place in your `.env`.**

**You can also load local data in a `$lib/data/products.json` if you don't want to setup a CMS for this.**
