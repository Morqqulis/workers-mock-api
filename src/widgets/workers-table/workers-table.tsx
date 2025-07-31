import type { Worker } from '@/entities/worker'
import { deleteWorker } from '@/entities/worker'
import { useDialogStore } from '@/features/workers'
import { BorderBeam } from '@/shared/ui/custom/border-beam'
import { cn } from '@/shared/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column as PrimeColumn } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable as PrimeDataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'
import { WorkersForm } from '../workers-form'
import { columns } from './columns'

export function WorkersTable({ workers }: { workers: Worker[] }) {
	const { isOpen, setIsOpen, editingWorker, setEditingWorker } = useDialogStore()
	const queryClient = useQueryClient()
	const toast = useRef<Toast>(null)
	const [search, setSearch] = useState('')

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteWorker(id)
		},
		onSuccess: () => {
			toast.current?.show({
				severity: 'success',
				summary: 'Success',
				detail: 'Worker deleted successfully',
			})
			queryClient.invalidateQueries({ queryKey: ['workers'] })
		},
		onError: () => {
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to delete worker',
			})
		},
	})

	const handleCloseDialog = () => {
		setIsOpen(false)
		setEditingWorker(null)
	}

	const handleEdit = (worker: Worker) => {
		setEditingWorker(worker)
		setIsOpen(true)
	}

	const handleConfirmDelete = (worker: Worker) => {
		confirmDialog({
			message: `Are you sure you want to delete ${worker.firstName} ${worker.lastName}?`,
			header: 'Delete Confirmation',
			icon: 'pi pi-exclamation-triangle',
			acceptClassName: 'p-button-danger',
			accept: () => {
				deleteMutation.mutate(worker.id)
			},
			reject: () => {
				toast.current?.show({
					severity: 'info',
					summary: 'Cancelled',
					detail: 'Delete operation cancelled',
				})
			},
		})
	}

	return (
		<>
			<Toast ref={toast} position='top-center' />
			<ConfirmDialog />

			<div
				className={`p-4 border rounded-xl overflow-hidden h-full border-zinc-600/50  z-10  backdrop-blur-sm bg-gradient-to-tl from-blue-800 to-red-700/50`}>
				<Dialog
					className='w-full max-w-2xl'
					closeOnEscape
					visible={isOpen}
					onHide={handleCloseDialog}
					modal
					header={false}
					footer={false}
					closable={true}
					draggable={false}
					resizable={false}>
					<WorkersForm type='create' toastRef={toast} />
				</Dialog>

				<div className={`flex justify-between items-center mb-4 gap-4 w-full`}>
					<h3 className={`text-2xl font-bold`}>Workers</h3>
					<div className={`flex items-center gap-4`}>
						<Button
							type='button'
							severity='info'
							size={'small'}
							rounded
							outlined
							icon='pi pi-plus'
							onClick={() => setIsOpen(true)}
						/>
						<InputText placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
					</div>
				</div>

				<PrimeDataTable
					className={`[&>div]:rounded-t-xl border border-zinc-600/50 rounded-xl`}
					paginatorClassName={`!rounded-b-xl`}
					value={workers}
					paginator
					rows={5}
					size={'small'}
					sortMode='multiple'
					defaultSortOrder={-1}
					filters={{
						firstName: {
							value: search,
							matchMode: 'contains',
						},
					}}
					rowsPerPageOptions={[5, 10, 25, 50]}>
					{columns(handleConfirmDelete, handleEdit).map((column, index) => (
						<PrimeColumn
							key={index}
							bodyClassName={cn(
								`text-sm !py-1 !px-2 !w-fit`,
								column.field === 'createdAt' && '!whitespace-nowrap',
								column.field === 'updatedAt' && '!whitespace-nowrap',
								column.field === 'Avatar' && 'text-center',
							)}
							headerClassName={`!whitespace-nowrap`}
							{...column}
						/>
					))}
				</PrimeDataTable>
				<BorderBeam duration={6} borderWidth={5} size={400} className='from-transparent via-red-500 to-transparent' />
				<BorderBeam
					duration={6}
					delay={3}
					size={400}
					borderWidth={5}
					className='from-transparent via-blue-500 to-transparent'
				/>

				<Dialog
					className='w-full max-w-2xl'
					closeOnEscape
					visible={isOpen}
					onHide={handleCloseDialog}
					modal
					header={false}
					footer={false}
					closable={true}
					draggable={false}
					resizable={false}>
					<WorkersForm
						type={editingWorker ? 'edit' : 'create'}
						defaultValues={editingWorker ? { ...editingWorker, id: editingWorker.id } : undefined}
						toastRef={toast}
					/>
				</Dialog>
			</div>
		</>
	)
}
