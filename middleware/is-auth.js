const { ValidateSignature } = require("../utils/index")
module.exports = async (req, res, next) => {

    const isAuthonrized = await ValidateSignature(req)
    if (isAuthonrized) {
        return next()
    }
    return res.status(403).json({ message: "not auth" })
}