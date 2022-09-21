import { useRoutes } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import React from 'react'
import lazyLoad from './utils/lazyLoad'
function formatePathName(str: String) {
	let tuo = ''
	let arr = str.split('')
	let newArr = arr.map((ite, idx) => {
		return ite.toUpperCase() === ite ? (ite = '-' + ite.toLowerCase()) : ite
	})
	tuo = newArr.join('')
	return tuo
}
const modules: { path: String; component: any }[] = import.meta.glob(
	'@/views/**/index.tsx',
	{
		eager: true,
	}
) as any

const rootRouter: RouteObject[] = []
for (let [path, component] of Object.entries(modules)) {
	rootRouter.push({
		path: `/${formatePathName(
			path.replace(/(\/src\/views\/|\/index\.tsx)/g, '')
		)}`,
		element: lazyLoad(React.lazy(() => import(path))),
	})
}
export default () => {
	const routes = useRoutes(rootRouter)
	return routes
}
