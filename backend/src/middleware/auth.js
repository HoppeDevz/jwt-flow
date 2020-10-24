const jwt = require("jsonwebtoken");
const configfile = require("../config/secret");

module.exports = (req, res, next) => {
    if (!req.headers.authentication) return res.status(401).send({token_is_valid: false});


    let token = "";
    if (req.headers.authentication.search("Baerer") > -1) {
        token = req.headers.authentication.split(" ")[1];
    } else {
        token = req.headers.authentication;
    }
    
    
    try {
        const decode = jwt.verify(token, configfile.secret_jwt_key);
        req.headers.token_decoded = decode;
    } catch (err) {
        return res.status(500).send({token_is_valid: false});
    }

    next();
}