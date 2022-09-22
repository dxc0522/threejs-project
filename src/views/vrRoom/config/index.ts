// 水天一色的小岛
import { LegacyRef, MutableRefObject } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入fltf 载入库
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
function getPath(path: string | URL) {
	return new URL(path, import.meta.url).href
}
export default async function (current: HTMLDivElement) {
	// 1、创建场景
	const scene = new THREE.Scene()
	// 2、创建相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		2000
	)

	// 设置相机位置
	camera.position.set(0, 0, 0.1)
	//更新 摄像头款高比例
	camera.aspect = window.innerWidth / window.innerHeight
	// 更新矩阵
	camera.updateProjectionMatrix()
	scene.add(camera)

	// 设置坐标系
	const axesHelper = new THREE.AxesHelper(500)
	scene.add(axesHelper)

	// 初始化渲染器
	const renderer = new THREE.WebGLRenderer({
		// 抗锯齿
		antialias: true,
	})
	// 设置渲染的尺寸大小
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.outputEncoding = THREE.sRGBEncoding
	current.appendChild(renderer.domElement)
	// 控制器
	const controls = new OrbitControls(camera, renderer.domElement)
	// 阻尼器
	controls.enableDamping = true
	//  设置动画
	;(function render() {
		controls.update()
		renderer.render(scene, camera)
		requestAnimationFrame(render)
	})()
	// 监听窗口变化 更新
	window.addEventListener('resize', () => {
		console.log('画面变化了')
		// 更新摄像头
		camera.aspect = window.innerWidth / window.innerHeight
		// 更新摄像机的投影矩阵
		camera.updateProjectionMatrix()
		// 更新渲染器
		renderer.setSize(window.innerWidth, window.innerHeight)
		// 设置渲染器的像素比
		renderer.setPixelRatio(window.innerWidth / window.innerHeight)
	})

	// 正方体加载六张图组成立体场景
	// const textLoader = new THREE.TextureLoader()
	// const boxMaterials = ['4_l', '4_r', '4_u', '4_d', '4_b', '4_f'].map(
	// 	(item) => {
	// 		// 加载纹理
	// 		let texture = textLoader.load(getPath(`../img/living/${item}.jpg`))
	// 		if (item === '4_u' || item == '4_d') {
	// 			texture.rotation = Math.PI
	// 			texture.center = new THREE.Vector2(0.5, 0.5)
	// 		}
	// 		return new THREE.MeshBasicMaterial({ map: texture })
	// 	}
	// )
	// const cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), boxMaterials)
	// cube.geometry.scale(1, 1, -1)
	// scene.add(cube)
	// 球体 加载hdr 全景图
	const loader = new RGBELoader()
	loader.load(getPath(`../img/hdr/Living.hdr`), (texture) => {
		const sphere = new THREE.Mesh(
			new THREE.SphereGeometry(5, 32, 32),
			new THREE.MeshBasicMaterial({ map: texture })
		)
		sphere.geometry.scale(1, 1, -1)
		scene.add(sphere)
	})
}
