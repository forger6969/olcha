async function getProducts() {

    try {
        const products = await fetch(`https://dummyjson.com/products?limit=100`)
        const res = await products.json()
        console.log(res);
        let resProducts = res.products

        const filterProducts = resProducts.filter(product => product.category === `beauty`)
        console.log(filterProducts);

    }
    catch (err) {
        console.log(err);
    }
}

getProducts()