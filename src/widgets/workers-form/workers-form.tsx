import { useDialogStore } from '@/features/workers'
import { BorderBeam } from '@/shared/ui/custom/border-beam'
import { cn } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiInstance } from '@shared/api/instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { ToggleButton } from 'primereact/togglebutton'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { workerSchema, type WorkerSchema } from './schema'
import type { WorkersFormProps } from './types'

type FormData = z.infer<typeof workerSchema>

export function WorkersForm({ type = 'create', defaultValues, toastRef }: WorkersFormProps) {
	const { setIsOpen, setEditingWorker } = useDialogStore()
	const queryClient = useQueryClient()

	const form = useForm<FormData>({
		resolver: zodResolver(workerSchema),
		defaultValues: defaultValues ?? {
			firstName: '',
			lastName: '',
			email: '',
			position: '',
			avatar: '',
			status: true,
		},
	})

	const createMutation = useMutation({
		mutationFn: async (worker: WorkerSchema) => {
			const res = await apiInstance.post('/workers', worker)
			console.log(res)
			return res
		},
		onSuccess: () => {
			toastRef?.current?.show({
				severity: 'success',
				summary: 'Success',
				detail: 'Worker created successfully',
			})
			queryClient.invalidateQueries({ queryKey: ['workers'] })
			handleClose()
		},
		onError: () => {
			toastRef?.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to create worker',
			})
		},
	})

	const updateMutation = useMutation({
		mutationFn: async ({ id, worker }: { id: string; worker: WorkerSchema }) => {
			return await apiInstance.put(`/workers/${id}`, worker)
		},
		onSuccess: () => {
			toastRef?.current?.show({
				severity: 'success',
				summary: 'Success',
				detail: 'Worker updated successfully',
			})
			queryClient.invalidateQueries({ queryKey: ['workers'] })
			handleClose()
		},
		onError: () => {
			toastRef?.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to update worker',
			})
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = form

	const status = watch('status')

	const handleClose = () => {
		setIsOpen(false)
		setEditingWorker(null)
	}

	const onSubmit = (data: FormData) => {
		if (type === 'create') {
			createMutation.mutate(data)
		} else if (type === 'edit' && defaultValues?.id) {
			updateMutation.mutate({ id: defaultValues.id, worker: data })
		}
	}

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				staggerChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
	}

	return (
		<motion.div
			className={`bg-gradient-to-tl from-blue-800/10 to-red-700/10 p-6 border border-zinc-500/10 rounded-2xl overflow-hidden`}
			variants={containerVariants}
			initial='hidden'
			animate='visible'>
			<motion.div className={`mb-10 text-center`} variants={itemVariants}>
				<h2 className={`mb-2 font-semibold text-surface-900 dark:text-surface-0 text-2xl`}>
					{type === 'create' ? 'Add Worker' : 'Edit Worker'}
				</h2>
				<p className={`text-surface-600 dark:text-surface-400`}>Fill in the worker information</p>
			</motion.div>

			<form onSubmit={handleSubmit(onSubmit)} className={`space-y-8 rounded-xl`}>
				<motion.div className={`gap-8 grid grid-cols-1 md:grid-cols-2`} variants={itemVariants}>
					<div className={`space-y-1`}>
						<FloatLabel>
							<InputText size={10} id='firstName' {...register('firstName')} className={`w-full`} autoComplete='on' />
							<label htmlFor='firstName'>First Name</label>
						</FloatLabel>
						{errors.firstName && (
							<motion.p
								className={`text-red-500 text-sm`}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								transition={{ duration: 0.2 }}>
								{errors.firstName.message}
							</motion.p>
						)}
					</div>

					<div className={`space-y-1`}>
						<FloatLabel>
							<InputText id='lastName' {...register('lastName')} className={`w-full`} autoComplete='on' />
							<label htmlFor='lastName'>Last Name</label>
						</FloatLabel>
						{errors.lastName && (
							<motion.p
								className={`text-red-500 text-sm`}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								transition={{ duration: 0.2 }}>
								{errors.lastName.message}
							</motion.p>
						)}
					</div>
				</motion.div>

				<motion.div className={`gap-8 grid grid-cols-1 md:grid-cols-2`} variants={itemVariants}>
					<div className={`space-y-1`}>
						<FloatLabel>
							<InputText id='email' {...register('email')} className={`w-full`} autoComplete='on' />
							<label htmlFor='email'>Email</label>
						</FloatLabel>
						{errors.email && (
							<motion.p
								className={`text-red-500 text-sm`}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								transition={{ duration: 0.2 }}>
								{errors.email.message}
							</motion.p>
						)}
					</div>

					<div className={`space-y-1`}>
						<FloatLabel>
							<InputText id='position' {...register('position')} className={`w-full`} autoComplete='on' />
							<label htmlFor='position'>Position</label>
						</FloatLabel>
						{errors.position && (
							<motion.p
								className={`text-red-500 text-sm`}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								transition={{ duration: 0.2 }}>
								{errors.position.message}
							</motion.p>
						)}
					</div>
				</motion.div>

				<motion.div className={`space-y-1`} variants={itemVariants}>
					<FloatLabel>
						<InputText id='avatar' {...register('avatar')} className={`w-full`} autoComplete='on' />
						<label htmlFor='avatar'>Avatar URL</label>
					</FloatLabel>
					{errors.avatar && (
						<motion.p
							className={`text-red-500 text-sm`}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							transition={{ duration: 0.2 }}>
							{errors.avatar.message}
						</motion.p>
					)}
				</motion.div>

				<motion.div className={`space-y-1`} variants={itemVariants}>
					<div className={`flex justify-between items-center`}>
						<label className={`block mb-2 font-medium text-surface-700 dark:text-surface-300 text-sm`}>
							Worker Status
						</label>
						<ToggleButton
							onIcon='pi pi-check'
							offIcon='pi pi-times'
							onLabel='Active'
							offLabel='Inactive'
							checked={status}
							onChange={e => setValue('status', e.value)}
							className={cn('w-32 transition-colors duration-200')}
						/>
					</div>
					<p className={`text-surface-500 dark:text-surface-400 text-xs`}>
						{status ? 'Worker is currently active and available' : 'Worker is currently inactive'}
					</p>
				</motion.div>

				<motion.div
					className={`flex justify-end gap-3 pt-4 border-surface-200 dark:border-surface-700 border-t`}
					variants={itemVariants}>
					<Button
						type='button'
						severity='danger'
						label='Cancel'
						rounded
						outlined
						size={'small'}
						icon='pi pi-times'
						onClick={handleClose}
						disabled={createMutation.isPending || updateMutation.isPending}
					/>
					<Button
						severity='success'
						rounded
						outlined
						size={'small'}
						icon='pi pi-check'
						type='submit'
						label={type === 'create' ? 'Create' : 'Update'}
						loading={createMutation.isPending || updateMutation.isPending}
						disabled={createMutation.isPending || updateMutation.isPending}
					/>
				</motion.div>
			</form>
			<BorderBeam
				duration={6}
				borderWidth={2}
				reverse
				size={400}
				className={`from-transparent via-red-500 to-transparent`}
			/>
			<BorderBeam
				duration={6}
				delay={3}
				size={400}
				borderWidth={2}
				reverse
				className={`from-transparent via-emerald-500 to-transparent`}
			/>
		</motion.div>
	)
}
