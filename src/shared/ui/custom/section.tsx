import { cn } from '@shared/utils'

type SectionProps = {
	children: React.ReactNode
	className?: string
	center?: boolean
}
export function Section({ children, className, center = true }: SectionProps) {
	return (
		<section className={cn('py-14 md:py-20', className)}>
			<div className={cn('container', center && 'flex flex-col items-center h-full')}>{children}</div>
		</section>
	)
}
