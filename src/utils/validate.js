
const isObjectID = (string) => {
    //TODO
    return {
        status: 200,
        message: ''
    }
}

const isName = (string) => {
    //TODO
    return {
        status: 200,
        message: ''
    }
}

const isCategory = (string) => {
    //TODO
    return {
        status: 200,
        message: ''
    }
}

const isExpiry = (string) => {
    //TODO
    return {
        status: 200,
        message: ''
    }
}

const isBarcode = (string) => {
    //TODO
    return {
        status: 200,
        message: ''
    }
}

const isFoodPic = (string) => {
    //TODO
    return {
        status: 200,
        message: ''
    }
}

const validateBody = (req, res, next, bodySchema) => {
    for(var propIndex in bodySchema.props) {
        var prop = bodySchema.props[propIndex]
        var propBody = req.body[prop.name]

        if(prop.required && propBody == null) {
            res.status(400).send(prop.name + " is required")
            return false
        }
        
        if(propBody) {
            let v = prop.validate(propBody)
            if(v.status != 200) {
                res.status(v.status).send(v.message)
                return false
            }
        }

        return true
    }
}

export default {
    validateBody,
    isObjectID,
    isName,
    isCategory,
    isExpiry,
    isBarcode,
    isFoodPic
}