
const res = JSON.parse(localStorage.getItem(`basket`))

function renderCards(array, container) {


    let box = document.querySelector(container)
    box.innerHTML = ``
    array.forEach(prod => {

        let aProd = prod.product

        let theRealIndex = array.indexOf(aProd)
        console.log(theRealIndex);

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
                                        <button data-index="${theRealIndex}" class="delete_btn">del</button>

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

    })
}

const resProducts = JSON.parse(localStorage.getItem(`basket`))

renderCards(resProducts, '.basket-cards-wrapper')

function deleteEvent() {

    let deleteBtns = document.querySelectorAll(`.delete_btn`)


    deleteBtns.forEach(delbtn => {
        delbtn.onclick = () => {

            const prodIndex = +delbtn.getAttribute(`data-index`)
            console.log(prodIndex);
            const resProducts = JSON.parse(localStorage.getItem(`basket`))

            resProducts.splice(prodIndex, 1)
            console.log(resProducts);

            localStorage.setItem(`basket`, JSON.stringify(resProducts))

            renderCards(resProducts, '.basket-cards-wrapper')
        }
    });

}
