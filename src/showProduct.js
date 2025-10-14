



function renderPage() {

    let product = JSON.parse(localStorage.getItem(`showProduct`))
    console.log(product);
    document.querySelector(`title`).textContent = `Страница товара - ${product.title}`


    let price = product.price * 12000
    console.log(price);


    let productBox = document.querySelector(`.product-box`)
    let reviewesBox = document.querySelector(`.reviews-box`)

    let productDiv = document.createElement(`div`)
    productDiv.classList = `product`


    productDiv.innerHTML = `
    
    <div class="name-otziv-box">

                                <p class="product-name">${product.title}</p>

                                <p class="otziv-count-text"><span class="otziv-count">${product.rating}</span> Рейтинг</p>

                            </div>

                            <div class="product-info-box">

                                <div class="product-info-left">
                                    <img class="product-image"
                                        src="${product.images[0]}"
                                        alt="">
                                </div>

                                <div class="product-info-right">

                                    <p class="weight-text">Вес: ................ ${product.weight}</p>
                                    <p class="category-product">Категория продукта: ................ ${product.category}</p>
                                    <p class="product-stock">Количесто товара в наличии: ................ ${product.stock}</p>
                                    <p class="product-rating">Рейтинг: ......................................... ${product.stock}</p>
                                    <p class="price">${price.toLocaleString(`RU-ru`)}сум</p>
                                    <button class="add-basket-btn">Добавить в корзину</button>
                                </div>

                            </div>
    
    `


    let reviewes = product.reviews
    console.log(reviewes);

    reviewes.forEach(rew => {
        let date = new Date(rew.date)
        console.log(date);



        let reviewDiv = document.createElement(`div`)
        reviewDiv.classList = `review`
        reviewDiv.innerHTML = `
    
    <div class="review-info">

                                <img class="reviewer-avatar"
                                    src="./images/default-avatar-profile-icon-social-600nw-1906669723.webp" alt="">

                                <div class="review-right">
                                    <p class="reviewer-name">${rew.reviewerName}</p>

                                    <div class="review-rating-date">

                                        <p class="review-rating">Рейтинг: ${rew.rating}/5</p>
                                        <p class="review-date">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</p>
                                    </div>
                                </div>

                            </div>

                            <p class="comment">${rew.comment}</p>

    
    `

        reviewesBox.append(reviewDiv)

    });
    productBox.append(productDiv)


}

renderPage()

let product = JSON.parse(localStorage.getItem(`showProduct`))
let basketStorage = JSON.parse(localStorage.getItem(`basket`)) || []

let findProduct = basketStorage.find(basket => basket.product.id === product.id)
let addBasketBtn = document.querySelector(`.add-basket-btn`)


if (findProduct) {
    addBasketBtn.textContent = `Добавлено в корзину`
}

addBasketBtn.addEventListener(`click`, () => {

    if (!findProduct) {

        console.log(basketStorage);
        basketStorage.push({ product: product, count: 1 })
        localStorage.setItem(`basket`, JSON.stringify(basketStorage))

        addBasketBtn.textContent = `Добавлено в корзину`

    } else {
        console.log(`Продукт уже добавлен`);

    }

})