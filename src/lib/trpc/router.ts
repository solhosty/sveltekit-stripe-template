import { t } from './t';
import { approveAppointment } from './routes/approve';
import { createAppointment } from './routes/book';
import { denyAppointment } from './routes/denied';
import { getCompleted, getPending, getCancelled, getIncomplete } from './routes/get-appointments';
import { completeAppointment } from './routes/complete';
import { deleteAppointment } from './routes/delete-appointment';
import { getUserAppointments } from './routes/user-appointments';
import { createDogProfile } from './routes/create-dog-profile';
import { getDogProfiles } from './routes/get-dog-profile';
import { getDogProfileById } from './routes/get-dog-by-id';

export const router = t.router({
	approveAppointment,
	createAppointment,
	denyAppointment,
	getCompleted,
	getPending,
	getCancelled,
	getIncomplete,
	completeAppointment,
	deleteAppointment,
	getUserAppointments,
	createDogProfile,
	getDogProfiles,
	getDogProfileById
});

export type Router = typeof router;
