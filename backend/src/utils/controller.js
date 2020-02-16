
const handleServiceResponse = (req, res, next, serviceResponse) => {
    if(serviceResponse.status == 200) return true;
    console.log(serviceResponse)
    if(serviceResponse.expected) {
        res.status(serviceResponse.status).send(serviceResponse.msg)
    }
    else {
        res.status(500).send('There was an internal error processing your request.')
    }

    return false
}


export default {
    handleServiceResponse
}
