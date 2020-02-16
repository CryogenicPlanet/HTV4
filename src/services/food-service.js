import axios from 'axios'



const getDetailsFromBarcode = async (barcode) => {

    try {
        let url = `https://trackapi.nutritionix.com/v2/search/item?upc=${barcode}`
        let request = await axios.get(url, {
            headers: {
                'x-app-id' : process.env.NUTRITION_APP_ID,
                'x-app-key' : process.env.NUTRITION_APP_KEY
            }
        })

        return {
            status: 200,
            data: request.data
        }
        
    }
    catch(err) {
        throw err
    }
}

const expiry = {
    apple: 30,
    banana: 6,
    egg: 35,
    cheese: 42,
    bread: 7,
    onion: 90
}

const getDetails = async (foodName) => {
    let expiryDays = expiry[foodName.toLowerCase()]
    return {
        expiryDays: expiryDays
    }
}

export default {
    getDetailsFromBarcode,
    getDetails
}