function renderCards(array, container) {
    let basketCountShowText = document.querySelector(`.basket-count`)
    basketCountShowText.textContent = array.length

    let box = document.querySelector(container)
    box.innerHTML = ``
    array.forEach((prod, theRealIndex) => {
        let aProd = prod.product


        let card = document.createElement(`div`)


        const price = aProd.price * 12000
        const rassrochka = price / 12

        card.classList = `card`

        card.innerHTML = `
                                <img class="product-img"
                                    src="${aProd.images[0]}"
                                    alt="">

                                <div class="card-right">

                                    <div class="product-items-box">

                                        <div class="product-name-box">
                                            <p class="product-name">${aProd.title}</p>
                                            <p class="product-brand">${aProd.brand}</p>
                                        </div>

                                        <p class="product-price">${price.toLocaleString(`RU-ru`)} сум</p>
                                    </div>

                                    <div class="product-btns-box">
                                        <button data-index="${theRealIndex}" class="delete_btn"><img src="../icons/close-sm-svgrepo-com.svg" alt=""></button>

                                        <div class="add-count-box">

                                            <button class="minus"><img src="./icons/minus-svgrepo-com.svg"
                                                    alt=""></button>
                                            <p class="count">${prod.count}</p>
                                            <button class="plus"><img src="./icons/plus-large-svgrepo-com.svg"
                                                    alt=""></button>
                                        </div>

                                    </div>

                                </div>
                        `

        box.append(card)
        deleteEvent()
        priceRender()
    })
}

let productsSumm = 0


function priceTotal() {

    let resProducts = JSON.parse(localStorage.getItem(`basket`))
    let productsSumm = 0

    resProducts.forEach(prod => {
        productArr = prod.product
        productsSumm += productArr.price * prod.count * 12000

    })

    return productsSumm
}


function emptyBasket() {

    const resProducts = JSON.parse(localStorage.getItem(`basket`))

    if (resProducts.length === 0) {

        let basketBox = document.querySelector(`.basket-box`)
        basketBox.innerHTML = `
    
    <div class="empty-basket-box">

                        <img class="basket-icon" src="./icons/cart.DYGF4swC.png" alt="">

                        <p class="empty-basket-item-1">Корзина пуста</p>
                        <p class="empty-basket-item-2">Но вы всегда можете ее наполнить</p>
                        
                        <a href="../index.html"> <button class="back-page-btn">На главную</button> </a>

                    </div>

    `
    }
}

emptyBasket()

let resProducts = JSON.parse(localStorage.getItem(`basket`))


renderCards(resProducts, '.basket-cards-wrapper')
console.log(productsSumm);

function priceRender() {
    priceTotal()
    let dostavkaPriceElement = document.querySelector(`.dostavka-price`)
    let priceProductElement = document.querySelector(`.price-product`)
    let zakazSummElement = document.querySelector(`.price`)

    const dostavkaPrice = priceTotal() * 0.0010
    const zakazSumm = priceTotal() + dostavkaPrice

    dostavkaPriceElement.textContent = `${dostavkaPrice.toLocaleString(`RU-ru`)} сум`
    priceProductElement.textContent = `${priceTotal().toLocaleString(`RU-ru`)} сум`
    zakazSummElement.textContent = `сумма заказа: ${zakazSumm.toLocaleString(`RU-ru`)} сум`
}

priceRender()

function deleteEvent() {

    let deleteBtns = document.querySelectorAll(`.delete_btn`)

    deleteBtns.forEach(delbtn => {
        delbtn.onclick = () => {
            emptyBasket()
            priceRender()

            const prodIndex = +delbtn.getAttribute(`data-index`)

            const deletedProduct = resProducts[prodIndex]
            console.log(deletedProduct);

            resProducts = resProducts.filter(res => res.product.id !== deletedProduct.product.id)

            localStorage.setItem(`basket`, JSON.stringify(resProducts))

            renderCards(resProducts, '.basket-cards-wrapper')
        }
    });

}