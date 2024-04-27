import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

// init api client
const stripe = new Stripe(env.SECRET_STRIPE_KEY);

// endpoint to handle incoming webhooks
export async function POST({ request }) {
	// extract body
	const body = await request.text();

	// get the signature from the header
	const signature = request.headers.get('stripe-signature');

	if (!signature) throw error(400, 'Invalid request');
	// var to hold event data
	let event;

	// verify it
	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err: any) {
		// signature is invalid!
		console.warn('⚠️  Webhook signature verification failed.', err.message);

		// return, because it's a bad request
		throw error(400, 'Invalid request');
	}

	// signature has been verified, so we can process events
	// full list of events: https://stripe.com/docs/api/events/list
	if (event.type == 'charge.succeeded') {
		// get data object
		const charge = event.data.object;

		// TODO: fulfill the order here
		console.log(`✅ Charge succeeded ${charge.id}`);
	}

	// return a 200 with an empty JSON response
	return json({});
}
