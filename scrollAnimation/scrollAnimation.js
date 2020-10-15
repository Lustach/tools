//На элемент которые мы хотим анимировать, добавляем класс ._anim-items, анимации отображаются как при скролле вверх так и вниз
const animItems = document.querySelectorAll('._anim-items')

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)

    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffset = offset(animItem).top
            const animStart = 4//видимая часть экрана при которой элемент отобразится
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active')// класс элемента с анимациями
            } else {
                if (!animItem.classList.contains('_anim-once')) {// анимация отобразится лишь единожды
                    animItem.classList.remove('_active')
                }
            }
        }
    }

    let offset = (el) => {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(() => animOnScroll()
        , 300)
}
