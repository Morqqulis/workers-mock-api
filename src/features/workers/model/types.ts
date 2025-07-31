import type { Worker } from '@/entities/worker'

export type WorkersStore = {
	workers: Worker[]
	setWorkers: (workers: Worker[]) => void
	createWorker: (worker: Worker) => void
	updateWorker: (worker: Worker) => void
	deleteWorker: (id: string) => void
}

export type DialogStore = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	editingWorker: Worker | null
	setEditingWorker: (worker: Worker | null) => void
}
