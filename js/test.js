document.addEventListener("DOMContentLoaded", catAnimation)
function catAnimation() {
	const S = 0.17
	const WS = 0.3
	const coinWavesNodes = document.querySelector("#coinWaves").children
	let waveAnimDur = 0
	const tS = (t = "50% 50%", d = S) => {
		return {
			repeat: -1,
			defaults: { transformOrigin: t, ease: "none", duration: d }
		}
	}
	let tO = "#tongueObject",
		lOT = "#legObjectT",
		lOB = "#legObjectB",
		catS = "#catShadow",
		cR = "#coinRect"
	const catLegT = gsap.set(lOT, { x: 10, rotate: -20 })
	const catLegB = gsap.set(lOB, { y: -4 })
	const catTongue = gsap.set(tO, { y: -2 })
	const targets = [
		{
			name: "#coinObject",
			timelineSettings: tS(undefined, WS),
			vars: { x: 5 }
		},
		{
			name: "#coinShadow",
			timelineSettings: tS(undefined, WS),
			vars: { x: 8 }
		},
		{ name: "#coinWaves", timelineSettings: tS(undefined, WS), vars: { x: 5 } },
		{
			name: "#headObject",
			timelineSettings: tS("50% 100%"),
			vars: { y: -2, rotate: -3 }
		},
		{
			name: "#earObjectT",
			timelineSettings: tS("0% 200%"),
			vars: { x: -2, rotate: -3 }
		},
		{
			name: "#earObjectTChild",
			timelineSettings: tS("100% 0%"),
			vars: { rotate: -6 }
		},
		{
			name: "#earObjectBChild",
			timelineSettings: tS("100% 0%", S * 2),
			vars: { rotate: -2 }
		},
		{
			name: "#earObjectB",
			timelineSettings: tS("100% 100%", S * 2),
			vars: { x: -2, y: 2 }
		},
		{
			name: "#tailObject",
			timelineSettings: tS("100% 50%"),
			vars: { rotate: 14 }
		},
		{ name: "#cat", timelineSettings: tS("100% 50%"), vars: { y: 10 } },
		,
		{
			name: "#legObjectT",
			timelineSettings: tS("0% -12%", S * 2),
			vars: { rotate: 105 }
		},
		{
			name: "#legObjectB",
			timelineSettings: tS("100% 0%", S * 2),
			vars: { rotate: -110 }
		},
		{
			name: "#eyeObject",
			timelineSettings: tS(undefined, S * 2),
			vars: { scaleX: 1.1, scaleY: 1.1 }
		},
		{
			name: "#tongueObject",
			timelineSettings: tS(),
			vars: { rotate: 5 }
		}
	]

	const coinRectTl = gsap
		.timeline({ repeat: -1 })
		.to(cR, {
			duration: 0.4,
			rotate: "360_cw",
			transformOrigin: "50% 50%",
			ease: "none"
		})
		.set(cR, { rotate: 0 })

	const coinWavesArr = [...coinWavesNodes].map(node => {
		waveAnimDur += 0.1
		let nodeId = "#" + node.id
		return gsap
			.timeline(tS(undefined, 0.05 + waveAnimDur / 10))
			.to(nodeId, { x: -1.2 })
			.yoyo(true)
	})

	const catShadow = gsap
		.timeline(tS())
		.to(catS, { scaleX: 1.1 })
		.to(catS, { scaleX: 0.8 })

	targets.map(target => {
		return gsap
			.timeline(target.timelineSettings)
			.to(target.name, target.vars)
			.yoyo(true)
	})
}
