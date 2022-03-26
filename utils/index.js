const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');
module.exports.GeneratePassword = async (password) => {
    return await bcrypt.hash(password, 12)
}
module.exports.FormateData = (data) => {
    if (data) {
        return { data }
    } else {
        throw new Error('Data Not found!')
    }
}

module.exports.ValidatePassword = async (inputPassword, password) => {
    return await bcrypt.compare(inputPassword, password);
}

module.exports.GenerateSignature = async (payload) => {
    const token = await jwt.sign(payload, APP_SECRET, { expiresIn: "1d" })
    return { token: token }
}
module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization")
    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);

        req.user = payload
        return true
    }
    return false
}