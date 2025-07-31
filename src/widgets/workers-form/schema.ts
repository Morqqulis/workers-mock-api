import { z } from 'zod'

export const workerSchema = z.object({
	firstName: z
		.string()
		.min(1, 'First name is required')
		.min(2, 'First name must be at least 2 characters')
		.max(50, 'First name must be less than 50 characters')
		.regex(/^[a-zA-Zа-яА-Я\s-']+$/, 'First name can only contain letters, spaces, hyphens and apostrophes')
		.trim(),

	lastName: z
		.string()
		.min(1, 'Last name is required')
		.min(2, 'Last name must be at least 2 characters')
		.max(50, 'Last name must be less than 50 characters')
		.regex(/^[a-zA-Zа-яА-Я\s-']+$/, 'Last name can only contain letters, spaces, hyphens and apostrophes')
		.trim(),

	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address')
		.max(100, 'Email must be less than 100 characters')
		.toLowerCase()
		.trim(),

	position: z
		.string()
		.min(1, 'Position is required')
		.min(2, 'Position must be at least 2 characters')
		.max(100, 'Position must be less than 100 characters')
		.regex(
			/^[a-zA-Zа-яА-Я\s\-&.,()]+$/,
			'Position can only contain letters, spaces, hyphens, ampersands, dots, commas and parentheses',
		)
		.trim(),

	avatar: z
		.string()
		.min(1, 'Avatar URL is required')
		.url('Please enter a valid URL')
		.max(500, 'Avatar URL must be less than 500 characters')

		.trim(),

	status: z.boolean(),
})

export type WorkerSchema = z.infer<typeof workerSchema>
