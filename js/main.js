
window.addEventListener('DOMContentLoaded', function () {

    "use strict"
    /////////////////////////////////////////////////////////
    //global

    let burgerButton = document.querySelector('.burger__btn');
    let burger = document.querySelector('.burger');
    let headerPage = document.querySelector('.header');
    let sidebar = document.querySelector('.sidebar');

    /////////////////////////////////////////////////////////
    //slider
    if (document.querySelector(".swiper")) {
        const sliderHomeAbout = new Swiper('.about__slider', {
            // Optional parameters

            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },

            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            },

            navigation: {
                nextEl: '.slider-arrow__next',
                prevEl: '.slider-arrow__prev',
            },
        });

        let assortmentSwiperSliderNum = 6;
        let swiperAssortment = document.querySelectorAll('.slider-assortment.swiper');
        for (let elemSwiper of swiperAssortment) {
            if (elemSwiper.querySelector('.swiper-wrapper ').children.length < assortmentSwiperSliderNum) {
                elemSwiper.classList.add('swiper__nocomplete');
            }
        }

        const sliderAssortment = new Swiper('.slider-assortment', {
            // Optional parameters
            spaceBetween: 20,

            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            },

            watchOverflow: true,

            navigation: {
                nextEl: '.slider-arrow__next',
                prevEl: '.slider-arrow__prev',
            },

            observer: true,
            observeParents: true,
            observeSlideChildren: true,

            breakpoints: {
                1700: {
                    slidesPerView: assortmentSwiperSliderNum,
                },
                1400: {
                    slidesPerView: --assortmentSwiperSliderNum,
                },
                1150: {
                    slidesPerView: --assortmentSwiperSliderNum,
                },
                850: {
                    slidesPerView: --assortmentSwiperSliderNum,
                },
                550: {
                    slidesPerView: --assortmentSwiperSliderNum,
                },
                320: {
                    slidesPerView: --assortmentSwiperSliderNum,
                },

            },
        });
    }


    /////////////////////////////////////////////////////////
    //tab

    let tabButtons = document.querySelectorAll('.tab .tab__btn');

    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener('click', function () {
            let tabHiddenItems = this.closest('.tab').querySelectorAll('.tab__item');
            for (let k = 0; k < tabButtons.length; k++) {
                tabButtons[k].classList.remove('tab__btn-active');
                tabHiddenItems[k].classList.remove('tab__item-active');
            }
            this.classList.add('tab__btn-active');
            for (let j = 0; j < tabHiddenItems.length; j++) {
                tabHiddenItems[i].classList.add('tab__item-active');
            }

        })
    }


    ////////////////////////////////////////////////////////
    //scroll smooth

    const scrollSmoothLinck = document.querySelectorAll('*[data-scroll-smooth]');


    for (let elem of scrollSmoothLinck) {
        elem.addEventListener('click', function (e) {
            e.preventDefault();

            let blockID = elem.getAttribute('data-scroll-smooth');
            let top = document.getElementById(blockID).getBoundingClientRect().top;
            console.log(top)

            document.querySelector('html,body').scrollTo({
                top: (top + window.pageYOffset) - 130,
                behavior: "smooth",
            });
        })
    }

    ////////////////////////////////////////////////////////
    //burger

    if (burgerButton) {
        burgerButton.addEventListener('click', function () {
            headerPositionActive();

            burger.classList.toggle("burger__active");
            burgerButton.classList.toggle("burger__btn-active");
            if (headerPage.classList.contains("header__active")) {
                burgerClosed(headerPage);
            }
        })
    }

    resizeHeaderNavigation();

    function resizeHeaderNavigation() {
        let burgerWrapper = burger.querySelector('.burger__wrapper');
        let headerNaviganion = headerPage.querySelector('.header__nav');
        let headerNaviganionLinks = headerPage.querySelector('.header__nav-links');
        if (window.innerWidth <= 1300) {
            if (headerPage && burger) {
                burgerWrapper.prepend(headerNaviganionLinks);
            }
        } else {
            if (headerPage && burger) {
                headerNaviganion.prepend(headerNaviganionLinks);
            }
        }
    }

    function headerPositionActive() {
        let headerDistanceTop = headerPage.getBoundingClientRect().top + window.pageYOffset;

        if (burgerButton.classList.contains('burger__btn-active') && headerDistanceTop == 0) {
            headerPage.classList.remove("header__active");
        } else {
            headerPage.classList.add("header__active");
        }
    }

    function burgerClosed(elem) { // вызвать в момент показа окна, где elem - окно
        function outsideClickListener(event) {
            if (!elem.contains(event.target) && isVisible(elem)) {  // проверяем, что клик не по элементу и элемент виден
                headerPositionActive()            //скрыть
                burger.classList.remove("burger__active");
                burgerButton.classList.remove("burger__btn-active");
                document.removeEventListener('click', outsideClickListener);
            }
        }
        document.addEventListener('click', outsideClickListener)
    }

    function isVisible(elem) { //открыто ли условное окно
        return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }


    ////////////////////////////////////////////////////////
    //scroll

    document.addEventListener('scroll', function () {
        scrollHeader();
    })

    scrollHeader();

    function scrollHeader() {
        if (headerPage) {
            let headerDistanceTop = headerPage.getBoundingClientRect().top + window.pageYOffset;

            if (headerDistanceTop > 0) {
                headerPage.classList.add('header__active');
            } else {
                headerPage.classList.remove('header__active');
            }
        }

    }



    ////////////////////////////////////////////////////////
    //sidebar navigaion


    let regulationItem = document.querySelectorAll('.regulations__item');
    let navigationLink = document.querySelectorAll('.sidebar__navigation-links li');


    document.addEventListener('scroll', function () {
        if (regulationItem.length > 0) {

            for (let i = 0; i < regulationItem.length; i++) {
                let elem = regulationItem[i];
                if (elem.getBoundingClientRect().top <= 130 && elem.getBoundingClientRect().bottom > 130) {

                    for (let link of navigationLink) {
                        // console.log(navigationLink)
                        link.classList.remove('sidebar__navigation-link-active');
                    }
                    navigationLink[i].classList.add('sidebar__navigation-link-active');
                }
            }
        }
    })

    //stickySidebar
    let sidebarSticky;

    function addStickySidebar() {
        if (sidebar) {

            if (window.innerWidth > 768 && document.querySelectorAll('.is-affixed').length == 0) {

                sidebarSticky = new StickySidebar('.sidebar', {
                    topSpacing: 150,
                    bottomSpacing: 0,
                    containerSelector: '.content__wrapper',
                    innerWrapperSelector: '.sidebar__wrapper'
                });
            } else if (window.innerWidth <= 768 && document.querySelectorAll('.is-affixed').length > 0) {
                sidebarSticky.destroy();
            }
        }
    }
    addStickySidebar();


    ////////////////////////////////////////////////////////
    //window.width

    window.addEventListener('resize', function () {
        resizeHeaderNavigation();
        addStickySidebar();
    })

});

