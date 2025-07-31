import { PrimeReactProvider } from 'primereact/api'

export function UIProvider({ children }: { children: React.ReactNode }) {
	return <PrimeReactProvider>{children}</PrimeReactProvider>
}
