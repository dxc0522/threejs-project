import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import Routers from './routers'

export default function Router() {
	return (
		<BrowserRouter>
			<Routers />
		</BrowserRouter>
	)
}
