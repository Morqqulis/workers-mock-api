import { Home } from '@/pages'
import { Particles } from '@/shared/ui/custom/particles'
import { Providers } from '@app/providers'
import '@shared/styles/index.css'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
	<Providers>
		<main>
			<Home />
		</main>
		<div className='-z-10 absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-red-800/20' />
		<Particles className='-z-10 absolute inset-0' />
      	
	</Providers>,
)
