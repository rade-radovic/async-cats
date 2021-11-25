//dodati jos jednu kontrolnu funkciju koja ce proveravati da li dati objekat ima odredjeni key. Za potrebe datog zadatka potrebno je jednoj od macaka dodati jos jedan key : value na api-ju . 
//Ukoliko ima odredjeni key (postaviti mogucnost prosledjivanja key-a, nije hardcodovan) izbacuje ga iz array-a . 

const fetch = require("node-fetch")

function hasKeyAndValue (key, value) {
    if(key === value) {
        return true
    } else {
        return false
    }
}

function hasProperty(object, key) {
    if(object.hasOwnProperty(key)) {
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
                    if(!hasKeyAndValue(macka.imageUrl, "http://images.somecdn.com/cat-33.jpg") && !hasProperty(macka, 'type')){
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