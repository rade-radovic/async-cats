//napisati dodatan uslov koji ce vracati novi array vrednosti, dobijenih sa Promise.all, koji zadovoljavaju kriterijum  imageUrl !== http://images.somecdn.com/cat-33.jpg.

const fetch = require("node-fetch")

const getCats = async(userId) => {
    return fetch(`http://localhost:8080/users/${userId}`).then((response) => {
       return response.json();
    }).then((user) => {
        const cats = user.cats.map((catId) => {
            return fetch(`http://localhost:8080/cats/${catId}`).then((response) => {
                return Promise.resolve(response.json()).then((macka) => {
                    if(macka.imageUrl !== "http://images.somecdn.com/cat-33.jpg"){
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

//ovo nisam nikako uspeo da napravim da mi ne vrati jednu undefined macku