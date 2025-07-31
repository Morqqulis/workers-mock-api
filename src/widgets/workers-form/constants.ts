import type { WorkerSchema } from './schema'

export const workerFormFields: { label: string; name: keyof WorkerSchema }[] = [
	{
		label: 'Avatar',
		name: 'avatar',
	},
	{
		label: 'First Name',
		name: 'firstName',
	},
	{
		label: 'Last Name',
		name: 'lastName',
	},
	{
		label: 'Email',
		name: 'email',
	},
	{
		label: 'Position',
		name: 'position',
	},
	{
		label: 'Status',
		name: 'status',
	},
]
