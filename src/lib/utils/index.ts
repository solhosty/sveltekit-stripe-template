import { services } from '$lib/data/services';

const loadPackageBySlug = async (requestedPackage: string) => {
	const packages = services.find(
		(service) => service.packages?.find((pkg) => pkg.slug === requestedPackage)
	);
	const selectedPackage = packages?.packages?.find((pkg) => pkg.slug === requestedPackage);
	return selectedPackage;
};

export { loadPackageBySlug };
