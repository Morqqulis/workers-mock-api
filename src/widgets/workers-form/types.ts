import type { Toast } from 'primereact/toast'
import type { RefObject } from 'react'
import type { WorkerSchema } from './schema'

export type WorkersFormProps = {
	type: 'create' | 'edit'
	defaultValues?: (WorkerSchema & { id?: string }) | null
	toastRef?: RefObject<Toast | null>
}
