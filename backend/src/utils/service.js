

const handleError = (err) => {
    if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}

    return err
}

export default handleError