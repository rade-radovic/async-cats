const fetch = require("node-fetch")

const getUser = async(userId) => {
    try {
        let user = await fetch(`http://localhost:8080/users/${userId}`)
        return await user.json()
    } catch(err) {
        console.log(err)
    }
}

const getCats = async(user) => {
    try {
        const cats = user.cats.map(async (catId) => {
            let cat = await fetch(`http://localhost:8080/cats/${catId}`)
            //let data = await cat.json
            return await cat.json()
        })
        return Promise.all(cats)
    } catch (error) {
        console.log(error)
    }
}

const readData = async() => {
    data = await getCats(await getUser(123))
    console.log(data)
    
}

readData()
