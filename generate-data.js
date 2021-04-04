const faker = require("faker");
const fs = require("fs");

// set locale at vietnam
faker.locale = "vi";

const randomCategogy = (n) => {
    if(n <= 0){
        return;
    }
    const dataRandom = [];
    // random data categogy
    for(var i=0; i<=n; i++){
        const objData = {
            id: faker.random.uuid(),
            nameCategogy: faker.commerce.department(),
            imageCategogy: faker.image.imageUrl(),
            created_at: Date.now(),
            update_at: Date.now()
        }
        dataRandom.push(objData);
    }
    return dataRandom;
}
const randomProductWithIdCategogy = (categogyList, n) => {
    if(n<=0){
        return;
    }
    const productList = [];
    // random data product with id categogy
    for(const categogy of categogyList){
        for(var j=0; j<n; j++){
            const objProduct = {
                categogyId: categogy.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                price: Number.parseFloat(faker.commerce.price()),
                color: faker.commerce.color(),
                material: faker.commerce.productMaterial(),
                description: faker.commerce.productDescription(),
                created_at: Date.now(),
                update_at: Date.now()
            }
            productList.push(objProduct);
        }
    }
    return productList;
}

// iffe
(()=>{
    const categogyList = randomCategogy(10);
    const productList = randomProductWithIdCategogy(categogyList, 5);
    const db = {
        categories: categogyList,
        products: productList,
        profile: {
            name: "Lý đẹp trai"
        }
    }
    fs.writeFile("db.json", JSON.stringify(db), ()=>{
        console.log("readfile successfully");
    })   
})()