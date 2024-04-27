<script lang="ts">
	import { dateSelected, timeSelected } from '$lib/state/appointment';
	import {
		startOfMonth,
		endOfMonth,
		eachDayOfInterval,
		isBefore,
		subDays,
		addMonths,
		format
	} from 'date-fns';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	export let duration: number;
	let currentMonth = new Date();
	let days: any[] = [];
	let timeSlots: string[] = [];
	let selectedTime = '';
	let selectedDate: Date;
	let existingAppointments: any[] = [];

	async function getExistingAppointments() {
		const incomplete = await trpc($page).getIncomplete.query();
		const pending = await trpc($page).getPending.query();

		existingAppointments = [...incomplete, ...pending].map((app) => {
			return {
				...app,
				date: new Date(app.start)
			};
		});
	}
	onMount(() => {
		getExistingAppointments();
	});
	const loadMonth = (month: Date) => {
		let startDay = startOfMonth(month);
		let endDay = endOfMonth(month);
		days = eachDayOfInterval({ start: startDay, end: endDay });

		const startWeekday = startDay.getDay();
		for (let i = 0; i < startWeekday; i++) {
			days.unshift(null);
		}
	};
	const selectDate = (date: Date) => {
		if (isBefore(date, subDays(new Date(), 1))) {
			return;
		}
		selectedDate = date;
		dateSelected.set(date.toDateString());
		generateTimeSlots(date);
	};
	function parseAppointmentDate(dateStr: string) {
		// Replace ' at ' with a space for standard date format
		const formattedStr = dateStr.replace(' at ', ' ');
		return new Date(formattedStr);
	}
	function generateTimeSlots(date: Date) {
		timeSlots = [];
		let startTime = new Date(date.setHours(9, 0, 0, 0));
		let endTime = new Date(date.setHours(18, 0, 0, 0));

		// Parse existing appointments into Date objects
		const appointmentDates = existingAppointments.map((app) => {
			return {
				start: parseAppointmentDate(app.start),
				end: new Date(parseAppointmentDate(app.start).getTime() + duration * 60000)
			};
		});

		while (startTime < endTime) {
			let isSlotAvailable = true;
			for (let app of appointmentDates) {
				if (startTime >= app.start && startTime < app.end) {
					isSlotAvailable = false;
					break;
				}
			}

			if (isSlotAvailable) {
				timeSlots.push(format(startTime, 'hh:mm a'));
			}

			startTime = new Date(startTime.setMinutes(startTime.getMinutes() + duration));
		}
	}

	function setTime(time: string) {
		timeSelected.set(time);
		console.log($timeSelected + '30');
		selectedTime = time;
	}
	const changeMonth = (months: number) => {
		currentMonth = addMonths(currentMonth, months);
		loadMonth(currentMonth);
	};
	const isUnavailable = (date: Date) => {
		return isBefore(date, subDays(new Date(), 1));
	};
	loadMonth(currentMonth);
	$: monthYear = format(currentMonth, 'MMMM yyyy');
</script>

<div class="flex flex-col lg:flex-row">
	<div class="flex flex-col">
		<div class="flex justify-between items-center my-2">
			<button class="flex" on:click={() => changeMonth(-1)}> <ChevronLeft /></button>
			<h2 class="font-bold text-2xl">{monthYear}</h2>
			<button class="flex" on:click={() => changeMonth(1)}><ChevronRight /></button>
		</div>
		<div class="grid grid-cols-7">
			<div class="font-bold text-center">Sun</div>
			<div class="font-bold text-center">Mon</div>
			<div class="font-bold text-center">Tue</div>
			<div class="font-bold text-center">Wed</div>
			<div class="font-bold text-center">Thu</div>
			<div class="font-bold text-center">Fri</div>
			<div class="font-bold text-center">Sat</div>
			{#each days as day (day ? day.toISOString() : Math.random())}
				{#if day}
					<button
						class="w-1/7 p-4 border font-bold border-gray-200 hover:bg-blue-500 hover:text-white {selectedDate ===
						day
							? 'bg-blue-500 text-white'
							: 'text-black'} {isUnavailable(day)
							? 'text-gray-200 bg-gray-600 cursor-not-allowed'
							: ''}"
						disabled={isUnavailable(day)}
						on:click={() => !isUnavailable(day) && selectDate(day)}
					>
						{day.getDate()}
					</button>
				{:else}
					<div class="w-1/7 p-4 border border-gray-200 text-gray-400 bg-gray-600"></div>
				{/if}
			{/each}
		</div>
	</div>

	<div class="flex flex-col my-4 mx:0 lg:mx-5 max-w-2xl">
		<h2 class="font-semibold text-xl text-center my-2">
			{selectedDate?.toDateString() || 'Select for availability'}:
		</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-72 overflow-hidden overflow-y-scroll">
			{#each timeSlots as slot}
				<button
					class="p-2 border font-bold border-gray-200 hover:bg-blue-500 hover:text-white {selectedTime ===
					slot
						? 'bg-blue-500 text-white'
						: 'text-black'}"
					on:click={() => setTime(slot)}
				>
					{slot}
				</button>
			{/each}
		</div>
	</div>
</div>
