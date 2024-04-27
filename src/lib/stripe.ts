import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(
	'pk_test_51Opqy8RrUuXTJpBxp9U8Od9E1R7xszwCz9YY3fup55DhMLuPB9U2mFs2Ny3yBGNwRr0I59V8HmgxDL9RLL5hX6Ed00gqhBMGsa'
);

export { stripe };
