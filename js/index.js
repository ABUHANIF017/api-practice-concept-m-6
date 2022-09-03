const loadAllProduct = async() => {
    const respons = await fetch('https://fakestoreapi.com/products')
    const data = await respons.json();
    return data;
}

const setAllMenu = async() => {
    const data = await loadAllProduct();
    //get the ul
    const listMenu = document.getElementById('list-menu');

    const uniqueArray = [];

    for (const product of data) {
        if (uniqueArray.indexOf(product.category) === -1) {
            // console.log(product.category);
            uniqueArray.push(product.category)
            const li = document.createElement('li');
            li.innerHTML = `
            <a>${product.category}</a>
         `
            listMenu.appendChild(li)
        }

    }
}
setAllMenu();

// // productAll();

const searceField = document.getElementById("searce-field");

searceField.addEventListener('keypress', async(event) => {
    // console.log(event.key);
    if (event.key === 'Enter') {
        // console.log(searceField.value)

        const searceValue = searceField.value;
        // console.log(searceValue)

        const allProducts = await loadAllProduct();
        // console.log(allProducts)

        const foundProduct = allProducts.filter(product => product.category.includes(searceValue));
        // console.log(foundProduct);

        const productContainer = document.getElementById('product-container');
        const notFound = document.getElementById('not-found');

        productContainer.textContent = '';
        notFound.textContent = '';


        if (foundProduct.length === 0) {
            // console.log('not found')
            notFound.innerHTML = `
            <h3 class="text-2xl text-orange-500 text-center">Not found</h3>
            `
        }

        foundProduct.forEach(product => {
            const { category, description, image, title } = product;

            console.log(product);
            const createDiv = document.createElement('div');
            createDiv.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src="${image}" alt="Shoes" class="h-60 w-full"/></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length > 20 ? title.slice(0,20) + '...' : title }</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Show Details</button>
              </div>
            </div>
          </div>
            `
            productContainer.appendChild(createDiv);
        });
    }
})