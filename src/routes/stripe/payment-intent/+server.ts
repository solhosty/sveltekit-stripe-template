import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ request }): Promise<Response> {
	try {
		const { amount, name, packageName } = await request.json();
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Number(amount),
			description: `Payment for the ${packageName} package from ${name}.`,
			currency: 'usd',
			automatic_payment_methods: {
				enabled: true
			}
		});

		return new Response(
			JSON.stringify({
				clientSecret: paymentIntent.client_secret
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		console.error('Failed to create payment intent:', error);
		return new Response(
			JSON.stringify({
				error: 'Failed to create payment intent'
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
