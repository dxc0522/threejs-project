import { useEffect, useRef, LegacyRef } from 'react'
import initThreeJs from './config/index'

export default function VRRoom() {
	const threeJSDom = useRef<LegacyRef<HTMLDivElement> | undefined>(null)
	useEffect(() => {
		initThreeJs(threeJSDom.current as unknown as HTMLDivElement)
	}, [])
	return (
		<div
			className='App'
			ref={threeJSDom as unknown as LegacyRef<HTMLDivElement> | undefined}
		></div>
	)
}
