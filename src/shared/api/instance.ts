import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const API_CONFIG = {
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
	sortBy: 'firstName' as SortBy,
	order: 'asc' as Order,
} as const

type SortBy = 'firstName' | 'lastName' | 'email' | 'position' | 'status'
type Order = 'asc' | 'desc'

export class ApiInstance {
	private instance: AxiosInstance

	constructor(config?: AxiosRequestConfig) {
		this.instance = axios.create({
			...API_CONFIG,
			...config,
		})
	}

	async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.get<T>(url, {
			...config,
			params: {
				sortBy: API_CONFIG.sortBy,
				order: API_CONFIG.order,
			},
		})
		return response.data
	}

	async post<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.post<T>(url, data, config)
		return response.data
	}

	async put<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.put<T>(url, data, config)
		return response.data
	}

	async patch<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.patch<T>(url, data, config)
		return response.data
	}

	async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.delete<T>(url, config)
		return response.data
	}
}

export const apiInstance = new ApiInstance()
