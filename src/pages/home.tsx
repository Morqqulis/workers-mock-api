import { getWorkers } from '@/entities/worker'
import { EmptyState } from '@/shared/ui/custom/empty-state'
import { ErrorState } from '@/shared/ui/custom/error-state'
import { LoadingState } from '@/shared/ui/custom/loading-state'
import { Section } from '@/shared/ui/custom/section'
import { Title } from '@/shared/ui/custom/title'
import { WorkersTable } from '@/widgets/workers-table'
import { useQuery } from '@tanstack/react-query'

export function Home() {
	const {
		data: workers,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['workers'],
		queryFn: () => getWorkers(),
	})

	if (isLoading) return <LoadingState />

	if (error) return <ErrorState error={error} />

	if (!workers || workers.length === 0) return <EmptyState />

	return (
		<Section className={`min-h-svh flex flex-col items-center justify-center`}>
			<Title className={`mb-10`} />
			<WorkersTable workers={workers} />
		</Section>
	)
}
