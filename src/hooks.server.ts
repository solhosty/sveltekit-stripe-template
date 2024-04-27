import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import prisma from '$lib/prisma';
import GoogleProvider from '@auth/core/providers/google';

export const handle: Handle = sequence(
	SvelteKitAuth({
		secret: AUTH_SECRET,
		trustHost: true,
		adapter: PrismaAdapter(prisma),
		callbacks: {
			session: async ({ session, user }) => {
				if (session?.user && user.id) {
					session.user.id = user.id;
				}
				return session;
			}
		},
		logger: {
			error(code, ...message) {
				console.error(code, message);
			},
			warn(code, ...message) {
				console.warn(code, message);
			},
			debug(code, ...message) {
				console.debug(code, message);
			}
		},
		providers: [
			GoogleProvider({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET
			})
		]
	}),
	createTRPCHandle({
		router,
		createContext
	})
);
