//modifikovati zadatak i za dohvatanje macaka koristiti forEach function . Nakon stizanja responsa smestiti imageUrl u poseban array.
// Rezultat date funckije  treba da vrati array niz url od svake macke .

const fetch = require("node-fetch")

const getCats = async(userId) => {
    return fetch(`http://localhost:8080/users/${userId}`).then((response) => {
       return response.json();
    }).then((user) => {
        const cats = user.cats.map((catId) => {
            return fetch(`http://localhost:8080/cats/${catId}`).then((response) => {
                return response.json()
            }).then((macka) => {
                return macka.imageUrl
            })
        })
        
        return Promise.all(cats);
    })
}

getCats(123);

const readData = async() => {
    let data = await getCats(123)
    console.log(data)
}

readData();