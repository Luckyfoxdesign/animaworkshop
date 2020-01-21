document.addEventListener("DOMContentLoaded", catAnimation)

const cat = "#cat",
	catShadow = "#catShadow",
	coinWaves = "#coinWaves",
	coinObject = "#coinObject",
	tongue = "#tongueObject",
	coinRect = "#coinRect",
	coinShadow = "#coinShadow",
	headObject = "#headObject",
	earTop = "#earObjectT",
	earTopChild = "#earObjectTChild",
	earBottom = "#earObjectB",
	earBottomChild = "#earObjectBChild",
	tail = "#tailObject",
	legTop = "#legObjectT",
	legBottom = "#legObjectB",
	eye = "#eyeObject"

const S = 0.17
const WS = 0.3
const coinWavesNodes = document.querySelector("#coinWaves").children

function catAnimation() {
	let waveAnimDuration = 0
	const settings = (t, d) => {
		t = t || "50% 50%"
		d = d || S
		return {
			repeat: -1,
			defaults: { transformOrigin: t, ease: "none", duration: d }
		}
	}

	const catLegT = gsap.set(legTop, { x: 10, rotate: -20 })
	const catLegB = gsap.set(legBottom, { y: -4 })

	const coinRectTl = gsap
		.timeline({ repeat: -1 })
		.to(coinRect, {
			duration: 0.4,
			rotate: "360_cw",
			transformOrigin: "50% 50%",
			ease: "none"
		})
		.set(coinRect, { rotate: 0 })

	const coinEllipseTl = gsap
		.timeline({ repeat: -1, defaults: { ease: "none", duration: WS } })
		.to(coinObject, { x: 5 })
		.yoyo(true)

	const coinShadowTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "50% 50%", ease: "none", duration: WS }
		})
		.to(coinShadow, { x: 10 })
		.yoyo(true)

	const coinWavesArrTl = [...coinWavesNodes].map(node => {
		waveAnimDuration += 0.1
		let nodeId = "#" + node.id
		return gsap
			.timeline({
				repeat: -1,
				defaults: { ease: "none", duration: 0.05 + waveAnimDuration / 10 }
			})
			.to(nodeId, { x: -1.2 })
			.yoyo(true)
	})

	const wavesXTl = gsap
		.timeline({
			repeat: -1,
			defaults: { ease: "none", duration: WS }
		})
		.to(coinWaves, { x: 5 })
		.yoyo(true)

	const coinMainTl = gsap
		.timeline()
		.add(coinRectTl, 0)
		.add(coinEllipseTl, 0)
		.add(coinShadowTl, 0)
		.add(coinWavesArrTl, 0)
		.add(wavesXTl, 0)

	const tongueTl = gsap
		.timeline({
			repeat: -1,
			defaults: { duration: S, ease: "none" },
			delay: S
		})
		.set(tongue, { y: -4 })
		.to(tongue, { rotate: 8 })
		.yoyo(true)

	const headTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "50% 100%", ease: "none", duration: S }
		})
		.to(headObject, { y: -2, rotate: -2 })
		.yoyo(true)

	const earTopTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "0% 200%", ease: "none", duration: S }
		})
		.to(earTop, { x: -2, rotate: -3 })
		.yoyo(true)

	const earTopChildTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "100% 0%", ease: "none", duration: S }
		})
		.to(earTopChild, { rotate: -6 })
		.yoyo(true)

	const earTopMainTl = gsap
		.timeline()
		.add(earTopTl, 0)
		.add(earTopChildTl, 0)

	const earBottomTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "100% 100%", ease: "none", duration: S * 2 }
		})
		.to(earBottom, { x: -2, y: 2 })
		.yoyo(true)

	const earBottomChildTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "100% 0%", ease: "none", duration: S * 2 }
		})
		.to(earBottomChild, { rotate: -2 })
		.yoyo(true)

	const earBottomMainTl = gsap
		.timeline()
		.add(earBottomTl, 0)
		.add(earBottomChildTl, 0)

	const headObjectMainTl = gsap
		.timeline()
		.add(tongueTl, 0)
		.add(headTl, 0)
		.add(earTopMainTl, 0)
		.add(earBottomMainTl, 0)

	const tailTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "100% 50%", ease: "none", duration: S }
		})
		.to(tail, { rotate: 14 })
		.yoyo(true)

	const catRunYTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "100% -50%", ease: "none", duration: S }
		})
		.to(cat, { y: 10 })
		.yoyo(true)

	const legTopTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "0% -12%", ease: "none", duration: S * 2 }
		})
		.to(legTop, { rotate: 105 })
		.yoyo(true)

	const legBottomTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "100% 0", ease: "none", duration: S * 2 }
		})
		.to(legBottom, { rotate: -110 })
		.yoyo(true)

	const catShadowTl = gsap
		.timeline({
			repeat: -1,
			defaults: { transformOrigin: "50% 50%", ease: "none", duration: S }
		})
		.to(catShadow, { scaleX: 1.1 })
		.to(catShadow, { scaleX: 0.8 })

	const eyeTl = gsap
		.timeline({
			repeat: -1,
			defaults: { ease: "none", duration: S * 2 }
		})
		.to(eye, { scaleX: 1.1, scaleY: 1.1 })
		.yoyo(true)

	const catMainTl = gsap
		.timeline()
		.add(headObjectMainTl, 0)
		.add(tailTl, 0)
		.add(catRunYTl, 0)
		.add(legTopTl, 0)
		.add(legBottomTl, 0)
		.add(catShadowTl, 0)
		.add(eyeTl, 0)

	const mainTl = gsap
		.timeline()
		.add(coinMainTl, 0)
		.add(catMainTl, 0)
}
