import type { Worker } from '@/entities/worker'
import { formatDate } from '@/shared/utils'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'

export const columns = (confirmDelete: (worker: Worker) => void, handleEdit: (worker: Worker) => void) => {
	return [
		{
			field: 'avatar',
			header: 'Avatar',
			body: (rowData: Worker) => <Avatar image={rowData.avatar} shape='circle' size='xlarge' />,
		},
		{ field: 'firstName', header: 'First Name', sortable: true },
		{ field: 'lastName', header: 'Last Name', sortable: true },
		{ field: 'position', header: 'Position', sortable: true },
		{ field: 'email', header: 'Email' },
		{
			field: 'status',
			header: 'Status',
			body: (rowData: Worker) => <Badge value={rowData.status ? 'Active' : 'Inactive'} />,
		},
		{
			field: 'updatedAt',
			header: 'Updated',
			body: (rowData: Worker) => formatDate(rowData.updatedAt),
		},
		{
			field: 'createdAt',
			header: 'Created',
			body: (rowData: Worker) => formatDate(rowData.createdAt),
		},
		{
			field: 'actions',
			header: 'Actions',
			body: (rowData: Worker) => {
				return (
					<div className={`flex gap-2`}>
						<Button icon='pi pi-pencil' severity='info' onClick={() => handleEdit(rowData)} />
						<Button icon='pi pi-trash' severity='danger' onClick={() => confirmDelete(rowData)} />
					</div>
				)
			},
		},
	]
}
