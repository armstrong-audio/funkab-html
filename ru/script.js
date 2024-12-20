Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

document.addEventListener("DOMContentLoaded", function () {
    // Fetch content from the API
    fetch('https://api.admin.servicehost.io/api/rest/getfunkabpages-ru')
        .then(response => response.json())
        .then(data => {
            const pagesData = data.funkab_pages;

            // Process data for the slider (Slides with IDs 1, 2, 3)
            const slidesData = pagesData.filter(page => [14, 15, 16].includes(page.id)).map(page => ({
                backgroundImage: '../assets/images/backgrounds/main-slider-bg.jpg',
                title: page.title,
                title2: page.title2,
                title3: page.title3,
                title4: page.title4,
                content: page.content
            }));

            // Process data for services (Service items with IDs 18 to 24)
            const servicesTopData = pagesData.find(page => page.id === 17);
            const servicesData = pagesData.filter(page => page.id >= 18 && page.id <= 24).map((page, index) => ({
                icon: getServiceIcon(index),
                title: page.title,
                title2: page.title2
            }));

            // Process data for the about section (ID 25)
            const aboutData = pagesData.find(page => page.id === 25);
            let points = aboutData.strings_array || [];
            const about = {
                imageSrc: '../assets/images/resources/tallinn-kodumasinate-remont.webp',
                imageAlt: 'Ремонт стиральных машин и холодильников в Таллине',
                tagline: 'firmast',
                title: aboutData.title2,
                title3: aboutData.title3,
                content: aboutData.content,
                pointsLeft: points.slice(0, 3),
                pointsRight: points.slice(3)
            };

            // Render Slider Template
            const sliderTemplateSource = document.getElementById('slider-template').innerHTML;
            const sliderTemplate = Handlebars.compile(sliderTemplateSource);
            const sliderHtml = sliderTemplate({ slides: slidesData });
            document.getElementById('main-slider-container').innerHTML = sliderHtml;

            // **Initialize Swiper after injecting the slider content**
            var swiper = new Swiper('.main-slider .swiper-container', {
                slidesPerView: 1,
                loop: true,
                effect: 'fade',
                pagination: {
                    el: '#main-slider-pagination',
                    type: 'bullets',
                    clickable: true
                },
                navigation: {
                    nextEl: '#main-slider__swiper-button-next',
                    prevEl: '#main-slider__swiper-button-prev'
                },
                autoplay: {
                    delay: 5000
                }
            });

            // Render Services Template
            const servicesTemplateSource = document.getElementById('services-template').innerHTML;
            const servicesTemplate = Handlebars.compile(servicesTemplateSource);
            const servicesHtml = servicesTemplate({ servicesTop: servicesTopData, services: servicesData });
            document.getElementById('services-container').innerHTML = servicesHtml;

            // Render About Template
            const aboutTemplateSource = document.getElementById('about-template').innerHTML;
            const aboutTemplate = Handlebars.compile(aboutTemplateSource);
            const aboutHtml = aboutTemplate({ about: about });
            document.getElementById('about-container').innerHTML = aboutHtml;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to map service index to icon class
    function getServiceIcon(index) {
        const icons = [
            'icon-refrigerator',
            'icon-washing-machine',
            'icon-oven',
            'icon-water-heater',
            'icon-gas',
            'icon-blender',
            'icon-ac'
        ];
        return icons[index] || 'icon-default';
    }
});