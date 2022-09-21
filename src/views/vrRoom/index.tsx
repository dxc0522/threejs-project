import { useEffect, useRef } from 'react'
import initThreeJs from './config/index'

export default function VRRoom() {
	const threeJSDom = useRef<HTMLDivElement>()
	useEffect(() => {
		console.log('mounted event')
		initThreeJs(threeJSDom)
	}, [])
	return <div className='App' ref={threeJSDom}></div>
}
