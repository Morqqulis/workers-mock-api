import { cn } from '@/shared/utils'
import { ShinyText } from './shiny-text'

export function Title({ className }: { className?: string }) {
	return (
		<div className={cn(`flex flex-col items-center justify-center gap-4`, className)}>
			<h1 className={`text-2xl md:text-4xl lg:text-6xl font-bold text-center`}>
				<ShinyText>✨ Workers App ✨</ShinyText>
			</h1>
			<p className={`text-center text-sm md:text-base lg:text-lg text-neutral-500`}>
				Manage your workers with ease and efficiency
			</p>
		</div>
	)
}
