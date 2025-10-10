async function getProducts() {

    try {
        const products = await fetch(`https://dummyjson.com/products?limit=100`)
        const res = await products.json()
        console.log(res);
        let resProducts = res.products

        const filterProducts = resProducts.filter(product => product.discountPercentage >= 15)
        console.log(filterProducts);

        const random = Math.floor(Math.random() * filterProducts.length)
        const randomProduct = filterProducts[random]
        const productOfTheDayImage = randomProduct.images[0]
        console.log(productOfTheDayImage);

        console.log(randomProduct);

        let productOfDay = document.querySelector(`.product-of-day-img`)
        console.log(productOfDay);
        productOfDay.src = randomProduct.images[0]


        const slicedProds = filterProducts.slice(0, 10)
        console.log(slicedProds);


        let cardBox = document.querySelector(`.card-wrapper`)
        slicedProds.forEach(product => {

            let card = document.createElement(`div`)
            card.classList = 'card'
            let price = product.price * 12000
            let priceDiscount = Math.round(price - (price * product.discountPercentage / 100))

            card.innerHTML = `
            
            <p class="card-discount">${product.discountPercentage}%</p>
                        <img class="card-product-img"
                            src="${product.images[0]}"
                            alt="">
                        <p class="card-product-item">${product.title}</p>
                        <p class="card-product-price">${priceDiscount.toLocaleString(`RU-ru`)} сум</p>
                        <p class="card-product-price-skidka">${price.toLocaleString(`RU-ru`)} сум</p>
                        <p class="card-product-price-rassrochka">324 000 x 12 мес</p>

                        <div class="card-btn-box">
                            <button class="add-basket-btn"><img src="./icons/basket-svgrepo-com.svg" alt=""></button>
                            <button class="buy-rassrochka-btn">В рассрочку</button>
                        </div>
            `
            cardBox.append(card)
        });

    }
    catch (err) {
        console.log(err);
    }
}

getProducts()



let timeBox = document.querySelector(`.time-text`)

setInterval(() => {
    let date = new Date()
    timeBox.innerHTML = `
                            <span class="time" id="hour">${date.getHours()}</span>
                            :
                            <span class="time" id="minute">${date.getMinutes()}</span>
                            :
                            <span class="time" id="secund">${date.getSeconds()}</span>
        `
}, 1000);

const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 2500 },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


const header = document.querySelector('.main-wrapper-1_div');
const trigger = document.querySelector('.nav-banner_section');

window.addEventListener('scroll', () => {
    const triggerTop = trigger.getBoundingClientRect().top;

    if (triggerTop <= 0) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});
