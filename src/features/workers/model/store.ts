import type { Worker } from '@/entities/worker'
import { create } from 'zustand'
import type { DialogStore, WorkersStore } from './types'

export const useWorkersStore = create<WorkersStore>(set => ({
	workers: [],
	setWorkers: (workers: Worker[]) => set({ workers }),
	createWorker: (worker: Worker) => set(state => ({ workers: [...state.workers, worker] })),
	updateWorker: (worker: Worker) =>
		set(state => ({ workers: state.workers.map(w => (w.id === worker.id ? worker : w)) })),
	deleteWorker: (id: string) => set(state => ({ workers: state.workers.filter(w => w.id !== id) })),
}))

export const useDialogStore = create<DialogStore>(set => ({
	isOpen: false,
	setIsOpen: (isOpen: boolean) => set({ isOpen }),
	editingWorker: null,
	setEditingWorker: (worker: Worker | null) => set({ editingWorker: worker }),
}))

