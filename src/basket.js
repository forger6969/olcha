
const res = JSON.parse(localStorage.getItem(`basket`))
console.log(res);

function renderCards(array, container) {


    let appleBox = document.querySelector(container)
    appleBox.innerHTML = ``
    array.forEach(aProd => {

        let theRealIndex = array.indexOf(aProd)
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
                            <button class="add-basket-btn"><img src="./icons/basket-svgrepo-com.svg" alt=""></button>
                            <button data-index="${theRealIndex}"  class="delete-prod"><img src="../icons/trash-blank-svgrepo-com.svg" alt=""></button>
                        </div>`

        appleBox.append(appleCard)

    })

}

const resProducts = JSON.parse(localStorage.getItem(`basket`))
console.log(resProducts);

renderCards(resProducts, '.apples-cards')
let deleteBtns = document.querySelectorAll(`.delete-prod`)


deleteBtns.forEach(delbtn => {
    delbtn.addEventListener(`click`, () => {

        const prodIndex = +delbtn.getAttribute(`data-index`)
        console.log(prodIndex);
        const resProducts = JSON.parse(localStorage.getItem(`basket`))

        resProducts.splice(prodIndex, 1)
        console.log(resProducts);

        localStorage.setItem(`basket`, JSON.stringify(resProducts))
        renderCards(resProducts, '.apples-cards')

    })
});
