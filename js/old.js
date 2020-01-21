const dialogsCat = [
	{ text: "Стой! Пес!" },
	{ text: "Стой! Кому говорю!" },
	{ text: "Копейка рубль бережет!" },
	{ text: "Котик хочет сделать Кусь!" },
	{ text: "Все равно догоню!" },
	{ text: "Не убежишь!" },
	{ text: "Я твою доллар ронял!" },
	{ text: "Ты мой сладкий!" },
	{ text: "Ты моя прелесть!" },
	{ text: "Котик хочет кушать!" }
]
const dialogsCoin = [
	{ text: "Сам ты пес!" },
	{ text: "Я от бабушки ушел..." },
	{ text: "Да ну тебя нахрен!" },
	{ text: "Сколько можно! Дай сбежать!" },
	{ text: "Все равно обрушу рынок!" }
]

const getRandomText = arr => {
	let currentIndex, previousIndex

	try {
		if (currentIndex === undefined || previousIndex) {
			while (currentIndex === previousIndex || currentIndex < 0) {
				currentIndex = gsap.utils.random(0, arr.length, 1) - 1
			}
			return arr[currentIndex].text
			console.log("if " + currentIndex + " " + previousIndex)
		} else {
			previousIndex = currentIndex
			currentIndex = undefined
			console.log("arr index " + arr[currentIndex].text)
			console.log("else " + currentIndex + " " + previousIndex)
			return arr[previousIndex].text
		}
	} catch (error) {
		console.log(error)
	}
}

/// ------------
let animateText = () => {
	let [obj1, obj2] = getDialogs(dialogTexts)
	console.log(obj1, obj2)
	const textDefaults = gsap.set([obj1.name, obj2.name], {
		css: { x: -60, y: 80, scale: 0, color: "#ffffff" }
	})

	if (obj1.objectText === "Стой! Пес!") {
		let coinTextBlockAnimation = () => {
			let coinPesText = getPesText(dialogTexts)
			let textWidth = getBlockWidthWithText(obj2.name, coinPesText)
			let coinObjParams = {
				name: obj2.name,
				objectText: coinPesText,
				objectWidth: textWidth
			}
			setTimeout(() => {
				let coinTl = textBlockAnimation(coinObjParams, () => {
					catAndCoinTextBlockTl.reverse()
					setTimeout(() => coinTl.reverse(), 500)
				})
			}, 500)
		}
		let catAndCoinTextBlockTl = textBlockAnimation(
			obj1,
			coinTextBlockAnimation()
		)
		return catAndCoinTextBlockTl
	} else {
		let catTextBlockTl = textBlockAnimation(obj1, () => {
			setTimeout(() => catTextBlockTl.reverse(), 500)
		})
		return catTextBlockTl
	}
}

let getBlockWidthWithText = (target, text) => {
	let width
	let tg = document.querySelector(target)
	tg.innerHTML = text
	width = tg.offsetWidth
	tg.innerHTML = ""
	return width
}

let getRandomText = arr => {
	try {
		let currentIndex
		while (currentIndex === undefined || currentIndex < 0) {
			currentIndex = gsap.utils.random(0, arr.length, 1) - 1
		}
		return arr[currentIndex].text
	} catch (error) {
		console.log(error)
	}
}

let getDialogs = dialogs => {
	let text, width
	arr = []
	dialogs.map(el => {
		text = getRandomText(el.text)
		width = getBlockWidthWithText(el.name, text)
		console.log(width)
		arr.push({
			name: el.name,
			objectText: text,
			objectWidth: width
		})
	})
	return arr
}

let textBlockAnimation = (obj, func) => {
	return gsap
		.timeline({ onComplete: func })
		.to(obj.name, {
			duration: 0.6,
			css: { opacity: 1, scale: 1, x: 0, y: 0 },
			ease: "none"
		})
		.to(obj.name, {
			duration: 0.4,
			css: { width: obj.objectWidth, height: 24 },
			ease: "power1.out"
		})
		.set(obj.name, { text: obj.objectText })
		.to(obj.name, { duration: 0.6, css: { color: "#333333" } })
}

let getPesText = arr => {
	let text = ""
	arr.map(el => {
		el.text.map(elt => {
			if ((elt = "Сам ты пес!")) text = elt
		})
	})
	return text
}

let recursedAnimation = () => {
	let textTl = animateText().eventCallback("onUpdate", () => {
		if (textTl.progress() === 0) {
			let movingTl = animateObjectsMovingX().eventCallback("onComplete", () => {
				recursedAnimation()
			})
		}
	})
}

function animateObjectsMovingX() {
	const coinMovingX = gsap
		.timeline({ defaults: { ease: "none" } })
		.to("#coinGroup", {
			duration: 1,
			x: 300
		})
		.to("#coinGroup", {
			duration: 1,
			x: 0
		})
	const catMovingX = gsap
		.timeline({ defaults: { ease: "none" } })
		.to([catShadow, cat], {
			duration: 1,
			x: -100
		})
		.to([catShadow, cat], {
			duration: 1,
			x: 0
		})
	return gsap
		.timeline()
		.add(coinMovingX, 0)
		.add(catMovingX, 0)
}

const dialogTexts = [
	{
		name: ".cat",
		text: [
			{ text: "Стой! Пес!" },
			{ text: "Стой! Кому говорю!" },
			{ text: "Копейка рубль бережет!" },
			{ text: "Котик хочет сделать Кусь!" },
			{ text: "Все равно догоню!" },
			{ text: "Не убежишь!" },
			{ text: "Я твой доллар ронял!" },
			{ text: "Ты мой сладкий!" },
			{ text: "Ты моя прелесть!" },
			{ text: "Котик хочет кушать!" }
		]
	},
	{
		name: ".coin",
		text: [
			{ text: "Сам ты пес!" },
			{ text: "Я от бабушки ушел..." },
			{ text: "Да ну тебя нахрен!" },
			{ text: "Сколько можно! Дай сбежать!" },
			{ text: "Все равно обрушу рынок!" }
		]
	}
]
