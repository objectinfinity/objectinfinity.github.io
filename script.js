// carosuel.js (Kevin Powell)

const track = document.querySelector('.carousel-track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel--right')
const prevButton = document.querySelector('.carousel--left')
const dotsContainer = document.querySelector('.carousel-nav')
const dots = Array.from(dotsContainer.children)

const slideWidth = slides[0].getBoundingClientRect().width
const setSlidePos = (slide, idx) => {
	slide.style.left = (slideWidth*idx)+'px'
}
slides.forEach(setSlidePos)

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = `translateX(-${targetSlide.style.left})`

	currentSlide.classList.remove('current-slide')
	targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('current-slide')
	targetDot.classList.add('current-slide')
}

const hideshowArrows = (slides, prevButton, nextButton, targetIdx) => {
	console.log(targetIdx)
	if (targetIdx === 0) {
		prevButton.classList.add('is-hidden')
		nextButton.classList.remove('is-hidden')
	} else if (targetIdx === slides.length-1) {
		prevButton.classList.remove('is-hidden')
		nextButton.classList.add('is-hidden')
	} else {
		prevButton.classList.remove('is-hidden')
		nextButton.classList.remove('is-hidden')
	}
}

const nextSlideFunc = (e) => {
	e.preventDefault()
	const currentSlide = track.querySelector('.current-slide')
	const nextSlide = currentSlide.nextElementSibling
	const currentDot = dotsContainer.querySelector('.current-slide')
	const nextDot = currentDot.nextElementSibling
	const nextIdx = slides.findIndex(slide => slide === nextSlide)

	moveToSlide(track, currentSlide, nextSlide)
	updateDots(currentDot, nextDot)
	hideshowArrows(slides, prevButton, nextButton, nextIdx)
}

const prevSlideFunc = (e) => {
	e.preventDefault()
	const currentSlide = track.querySelector('.current-slide')
	const prevSlide = currentSlide.previousElementSibling
	const currentDot = dotsContainer.querySelector('.current-slide')
	const prevDot = currentDot.previousElementSibling
	const prevIdx = slides.findIndex(slide => slide === prevSlide)

	moveToSlide(track, currentSlide, prevSlide)
	updateDots(currentDot, prevDot)
	hideshowArrows(slides, prevButton, nextButton, prevIdx)
}

const dotsFunc = (e) => {
	const targetDot = e.target.closest('button');
	if (!targetDot) {return}
	const currentSlide = track.querySelector('.current-slide')
	const currentDot = dotsContainer.querySelector('.current-slide')
	const targetIdx = dots.findIndex(dot => dot === targetDot)
	const targetSlide = slides[targetIdx]

	moveToSlide(track, currentSlide, targetSlide)
	updateDots(currentDot, targetDot)
	hideshowArrows(slides, prevButton, nextButton, targetIdx)
}

prevButton.addEventListener('click', prevSlideFunc)
prevButton.addEventListener('touchstart', prevSlideFunc)
nextButton.addEventListener('click', nextSlideFunc)
nextButton.addEventListener('touchstart', nextSlideFunc)

dotsContainer.addEventListener('click', dotsFunc)

const allImageLabels = 