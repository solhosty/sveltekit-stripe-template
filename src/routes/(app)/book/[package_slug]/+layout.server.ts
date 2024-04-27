import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { loadServices } from '$lib/graphql';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();
	const requestedPackage = params.package_slug;
	if (!session) {
		throw redirect(302, '/?error=unauthorized');
	}

	const services = (await loadServices()) as any[];
	console.log(services);

	const loadSimilarPackages = async (requestedPackage: string) => {
		const packages = services.find(
			(service) => service.packages?.find((pkg: { slug: string }) => pkg.slug === requestedPackage)
		);
		return packages?.packages?.filter((pkg: { slug: string }) => pkg.slug !== requestedPackage);
	};
	const loadServiceName = async (requestedPackage: string) => {
		const packages = services.find(
			(service) => service.packages?.find((pkg: { slug: string }) => pkg.slug === requestedPackage)
		);
		return packages;
	};
	const loadPackageBySlug = async (requestedPackage: string) => {
		const packages = services.find(
			(service) => service.packages?.find((pkg: { slug: string }) => pkg.slug === requestedPackage)
		);
		const selectedPackage = packages?.packages?.find(
			(pkg: { slug: string }) => pkg.slug === requestedPackage
		);
		return selectedPackage;
	};

	const selectedPackage = await loadPackageBySlug(requestedPackage);
	const similarPackages = await loadSimilarPackages(requestedPackage);
	const service = await loadServiceName(requestedPackage);
	return {
		session: {
			user: {
				name: session?.user?.name,
				image: session?.user?.image
			}
		},
		selectedPackage: selectedPackage,
		similarPackages: similarPackages,
		service: service
	};
};
