import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(event: RequestEvent) {
	try {
		const session = await event?.locals.getSession();
		return {
			user_id: session?.user?.id,
			user_email: session?.user?.email
		};
	} catch {
		return {
			user_id: ''
		};
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;
