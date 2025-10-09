async function getProducts() {
    try {
        const products = await fetch(`https://dummyjson.com/products`)
        const res = await products.json()
        console.log(res);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log(`finall`);

    }
}

getProducts()