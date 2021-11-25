//modifikovati zadatak na nacin da cemo imati jednu zajednicku funckiju (getDataFromApi) . 
//Data funckija ce primati url kao parametar i vratice promis . Potrebno je datu funckiju iskoristiti za svaki pojedinacni api poziv .

const fetch = require("node-fetch")

async function getDataFromApi(url) {
    return fetch(url).then((response) => {
       return response.json();
    })
}

const getCats = async(userId) => {
    return getDataFromApi(`http://localhost:8080/users/${userId}`).then((user) => {
        const cats = user.cats.map((catId) => {
            return getDataFromApi(`http://localhost:8080/cats/${catId}`)
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