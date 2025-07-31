import { apiInstance } from '@/shared/api/instance'
import type { WorkerSchema } from '@/widgets/workers-form/schema'
import { type Worker } from './types'

export const getWorkers = async (): Promise<Worker[]> => {
	try {
		return await apiInstance.get<Worker[]>(`/workers`)
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const createWorker = async (worker: WorkerSchema): Promise<Worker> => {
	try {
		return await apiInstance.post<Worker>(`/workers`, worker)
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const updateWorker = async (id: string, worker: WorkerSchema): Promise<Worker> => {
	try {
		return await apiInstance.put<Worker>(`/workers/${id}`, worker)
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const deleteWorker = async (id: string): Promise<Worker> => {
	try {
		return await apiInstance.delete<Worker>(`/workers/${id}`)
	} catch (error) {
		console.error(error)
		throw error
	}
}
