const axios = require('axios')



const req = async () => {
    const response = await axios.get(url_inspire)
    return response
}

quote = req().data[0].q


console.log(quote)