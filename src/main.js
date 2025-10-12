
const userNameElement = document.querySelector(`.login-text`)

if (localStorage.getItem(`loginUser`)) {
    const loginedUser = JSON.parse(localStorage.getItem(`loginUser`))
    console.log(loginedUser);
    userNameElement.textContent = loginedUser.firstName
}

let productsCount = document.querySelector('.korzina-count')
let basketStorage = JSON.parse(localStorage.getItem(`basket`)) || []

productsCount.textContent = basketStorage.length


function notification(text, color) {
    let notBox = document.querySelector(`.notificationsBox`)
    let notElement = document.createElement(`div`)
    notElement.classList = `notification`

    notElement.innerHTML = `
    <p>${text}</p>
    <div class="poloska"></div>
    `
    notElement.classList.remove(`none`)
    notBox.classList.remove(`none`)
    notElement.style.backgroundColor = color

    notBox.append(notElement)

    setTimeout(() => {
        notElement.classList.add(`none`)
        setTimeout(() => {
            notElement.remove()
        }, 300);
    }, 5000);
}

async function getProducts() {

    try {
        const products = await fetch(`https://dummyjson.com/products?limit=0`)
        const res = await products.json()
        console.log(res);
        let resProducts = res.products

        function renderCards(array, container) {

            let appleBox = document.querySelector(container)
            appleBox.innerHTML = ``
            array.forEach(aProd => {

                let basketStorage = JSON.parse(localStorage.getItem(`basket`)) || []
                let findRenderingProduct = basketStorage.find(find => find.product.id === aProd.id)

                let theRealIndex = resProducts.indexOf(aProd)
                console.log(theRealIndex);


                let appleCard = document.createElement(`div`)

                const applePrice = aProd.price * 12000
                const rassrochka = applePrice / 12

                appleCard.classList = `smartphone-card`

                appleCard.innerHTML = `
            
             <img class="product-img-smartphone"
                            src="${aProd.images[0]}" alt="">
                        <p class="product-name-smartphone">${aProd.title}</p>
                        <div class="smartphone-card-price-box">

                            <p class="product-price-smartphone">${applePrice.toLocaleString(`RU-ru`)}сум</p>
                            <p class="product-rassrochka-price-smartphone">${rassrochka.toLocaleString(`RU-ru`)} сум x мес</p>

                        </div>

                        <div class="smartphone-card-btn-box">
                            <button data-index="${theRealIndex}" class="add-basket-btn"><img src="./icons/basket-svgrepo-com.svg" alt=""></button>
                            <button class="buy-rassrochka-btn">В рассрочку</button>
                        </div>
                        
                        <div class="add-count-btns">
                    <button class="minus"><img src="./icons/minus-svgrepo-com.svg" alt=""></button>
                    <p class="count"></p>
                    <button class="plus"><img src="./icons/plus-large-svgrepo-com.svg" alt=""></button>
                </div>
                        `

                let count = appleCard.querySelector(`.count`)
                let addCountsBtn = appleCard.querySelector('.add-count-btns')
                let btnsBox = appleCard.querySelector(`.smartphone-card-btn-box`)
                let plusBtn = appleCard.querySelector(`.plus`)
                let minusBtn = appleCard.querySelector(`.minus`)

                if (findRenderingProduct) {
                    addCountsBtn.classList.add(`active`)
                    btnsBox.style.display = `none`

                    plusBtn.onclick = () => {

                        basketStorage.map(basket => {
                            if (basket.product.id === findRenderingProduct.product.id) {
                                basket.count++
                                localStorage.setItem(`basket`, JSON.stringify(basketStorage))

                                count.textContent = basket.count
                            }
                        })
                        console.log(basketStorage);

                    }
                    minusBtn.onclick = () => {
                        let minusText = +count.textContent
                        console.log(minusText);


                        if (minusText <= 1) {
                            addCountsBtn.classList.remove(`active`)
                            btnsBox.style.display = `flex`

                            let findAddedProductCount = basketStorage.filter(find => findRenderingProduct.product.id === find.product.id)
                            console.log(findAddedProductCount);
                            basketStorage = basketStorage.filter(basket => basket.product.id !== findRenderingProduct.product.id)
                            console.log(basketStorage);
                            localStorage.setItem(`basket`, JSON.stringify(basketStorage))
                        }

                        basketStorage.map(basket => {
                            if (basket.product.id === findRenderingProduct.product.id) {
                                basket.count--
                                localStorage.setItem(`basket`, JSON.stringify(basketStorage))

                                count.textContent = basket.count
                            }
                        })
                        console.log(basketStorage);
                    }

                    count.textContent = findRenderingProduct.count

                }

                appleBox.append(appleCard)
            })

        }
        let apple = resProducts.filter(apple => apple.brand === `Apple`)
        renderCards(apple, '.apples-cards')

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

                        <div class="add-count-btns">
                    <button class="minus"><img src="./icons/minus-svgrepo-com.svg" alt=""></button>
                    <p class="count"></p>
                    <button class="plus"><img src="./icons/plus-large-svgrepo-com.svg" alt=""></button>
                </div>
            `
            cardBox.append(card)
        });

        let smartphones = resProducts.filter(smart => smart.category === 'smartphones')
        renderCards(smartphones, '.smartphone-cards')

        const sportProd = resProducts.filter(sport => sport.category === `sports-accessories`)
        renderCards(sportProd, '.sport-cards')

        const searchInput = document.querySelector(`.searchInput`)
        const searchBtn = document.querySelector(`.search-btn`)

        searchInput.addEventListener(`input`, () => {
            let searchValue = searchInput.value.toLowerCase().trim()

            if (searchValue === ``) {
                let searchCardWrapper = document.querySelector(`.search-cards-wrapper`)
                searchCardWrapper.innerHTML = ``
                return
            }

            const searchFilter = resProducts.filter(search => search.title.toLowerCase().trim().includes(searchValue))
            console.log(searchFilter);

            renderCards(searchFilter, '.search-cards-wrapper')

        })


        let addProductBtn = document.querySelectorAll(`.add-basket-btn`)
        addProductBtn.forEach(btn => {
            btn.addEventListener(`click`, () => {

                let productsCount = document.querySelector('.korzina-count')
                let basketStorage = JSON.parse(localStorage.getItem(`basket`)) || []
                console.log(`storage:`, basketStorage);


                productsCount.textContent = basketStorage.length

                const productIndex = btn.getAttribute(`data-index`)
                console.log(resProducts[productIndex]);
                let addedProduct = resProducts[productIndex]

                let checkBasketStorageInPush = basketStorage.find(check => check.product.id === addedProduct.id)
                console.log(basketStorage);

                if (!checkBasketStorageInPush) {
                    basketStorage.push({ product: addedProduct, count: 1 })
                    localStorage.setItem(`basket`, JSON.stringify(basketStorage))
                }

                let card = btn.closest('.smartphone-card')
                let addCountsBtn = card.querySelector('.add-count-btns')
                let btnsBox = card.querySelector(`.smartphone-card-btn-box`)
                let plusBtn = addCountsBtn.querySelector(`.plus`)
                let minusBtn = addCountsBtn.querySelector(`.minus`)
                let count = addCountsBtn.querySelector(`.count`)

                count.textContent = 1
                addCountsBtn.classList.add(`active`)
                btnsBox.style.display = `none`

                plusBtn.onclick = () => {

                    basketStorage.map(basket => {
                        if (basket.product.id === addedProduct.id) {
                            basket.count++
                            localStorage.setItem(`basket`, JSON.stringify(basketStorage))

                            count.textContent = basket.count
                        }
                    })
                    console.log(basketStorage);

                }
                minusBtn.onclick = () => {
                    let minusText = +count.textContent
                    console.log(minusText);


                    if (minusText <= 1) {
                        addCountsBtn.classList.remove(`active`)
                        btnsBox.style.display = `flex`

                        let findAddedProductCount = basketStorage.filter(find => addedProduct.id === find.product.id)
                        console.log(findAddedProductCount);
                        basketStorage = basketStorage.filter(basket => basket.product.id !== addedProduct.id)
                        console.log(basketStorage);
                        localStorage.setItem(`basket`, JSON.stringify(basketStorage))
                    }

                    basketStorage.map(basket => {
                        if (basket.product.id === addedProduct.id) {
                            basket.count--
                            localStorage.setItem(`basket`, JSON.stringify(basketStorage))

                            count.textContent = basket.count
                        }
                    })
                    console.log(basketStorage);
                }

            })
        })


    }
    catch (err) {
        console.log(err);
    }
}

getProducts()

let closeSearchBtn = document.querySelector(`.close-search`)
let openSearchInput = document.querySelector(`.serach_input`)
let searchPage = document.querySelector(`.search-page`)

openSearchInput.addEventListener(`focus`, () => {
    searchPage.classList.add(`active`)
})

closeSearchBtn.addEventListener(`click`, () => {
    searchPage.classList.remove(`active`)
})


async function usersGET() {

    try {
        const users = await fetch(`https://dummyjson.com/users`)
        const usersRes = await users.json()
        console.log(usersRes);
        let AllUsers = usersRes.users

        let emailInpit = document.querySelector(`.emailInpit`)
        let passwordInput = document.querySelector(`.passwordInput`)
        let loginBtn = document.querySelector(`.loginBtn`)
        let privacyBtn = document.querySelector(`.privacyBtn`)
        let loginBox = document.querySelector(`.login-box`)
        let loginOpenBtn = document.getElementById(`loginBtn`)
        let closeLoginBox = document.querySelector(`.close-login-btn`)
        let contentBox = document.querySelector(`.content`)

        closeLoginBox.addEventListener(`click`, () => {
            loginBox.classList.remove(`active`)
            contentBox.classList.remove(`login`)
        })

        loginOpenBtn.addEventListener(`click`, () => {


            if (loginBox.classList.contains(`active`)) {
                loginBox.classList.remove(`active`)
                contentBox.classList.remove(`login`)

            } else {
                loginBox.classList.add(`active`)
                contentBox.classList.add(`login`)
            }
        })

        loginBtn.addEventListener(`click`, () => {


            let emailValue = emailInpit.value
            let passwordValue = passwordInput.value
            let privacyValue = privacyBtn.checked

            let findUser = AllUsers.find(user => emailValue === user.email)

            if (emailValue === '' || passwordValue === ``) {
                console.log(`Заполни все поля`);
                notification(`Зполните все поля`, `#da002b`)
                return
            }

            if (findUser) {
                if (!privacyValue) {
                    console.log(`Не согласен`);
                } else if (findUser.password === passwordValue && privacyValue) {
                    userNameElement.textContent = `${findUser.firstName}`
                    console.log(`succesful entry ${findUser.firstName}`);
                    notification(`Добро пожаловать ${findUser.firstName}`, `#da002b`)
                    loginBox.classList.remove(`active`)
                    contentBox.classList.remove(`login`)

                    localStorage.setItem(`loginUser`, JSON.stringify(findUser))

                } else if (findUser.password !== passwordValue) {
                    notification(`Неправильный пароль`, `#da002b`)

                }
            } else {
                notification(`Пользователь не найден`, `#da002b`)

            }
        })
    }

    catch (err) {
        console.log(err);
    }

    finally {
        console.log(`Запрос завершен`);
    }
}

usersGET()

// let timeBox = document.querySelector(`.tim3e-text`)

// setInterval(() => {
//     let date = new Date()
//     timeBox.innerHTML = `
//                             <span class="time" id="hour">${date.getHours()}</span>
//                             :
//                             <span class="time" id="minute">${date.getMinutes()}</span>
//                             :
//                             <span class="time" id="secund">${date.getSeconds()}</span>
//         `
// }, 1000);

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