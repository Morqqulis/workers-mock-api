import { QueryProvider } from './query-provider'
import { UIProvider } from './ui-provider'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<UIProvider>{children}</UIProvider>
		</QueryProvider>
	)
}