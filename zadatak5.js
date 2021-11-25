// kontrolnu funckiju u prethodnom zadatku refaktorisati tako da joj mozemo proslediti bilo koje polje i vrednost datog objekta i da nije staticki vezana za samo jedno polje

const fetch = require("node-fetch")

function uslov (polje, vrednost) {
    if(polje === vrednost) {
        return true
    } else {
        return false
    }
}

const getCats = async(userId) => {
    return fetch(`http://localhost:8080/users/${userId}`).then((response) => {
       return response.json();
    }).then((user) => {
        const cats = user.cats.map((catId) => {
            return fetch(`http://localhost:8080/cats/${catId}`).then((response) => {
                return Promise.resolve(response.json()).then((macka) => {
                    if(!uslov(macka.imageUrl, "http://images.somecdn.com/cat-33.jpg")){
                        return macka 
                    }
                })
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