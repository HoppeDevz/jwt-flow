const express = require("express");
const database = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configfile = require("../config/secret");
const { config } = require("../database");

class AccountController {
    Login(req, res) {
        let {username, password} = req.headers;

        console.log(username, password);
        database.query("SELECT * FROM users_accounts WHERE username = ?", [ username ],
        (error, results, fields) => {
            if (error) return res.status(500).send({login: false, message: "Error"});
            if (results.length < 1) return res.status(401).send({login: false, message: "Authentication Failed!"}); 
            bcrypt.compare(password, results[0].password, (err, result) => {
                if (err) return res.status(500).send({login: false, message: "Error"});
                if (!result) return res.status(401).send({login: false, message: "Authentication Failed"});

                const token = jwt.sign(
                    { id: results[0].id, username, password },
                    configfile.secret_jwt_key, 
                    {expiresIn: "2m"}
                );

                return res.status(200).send({login: true, token});
            });
        });
    }

    Register(req, res) {
        const {username, password} = req.body;
        database.query("SELECT * FROM users_accounts WHERE username = ?", [ username ],
        (error, results, fields) => {
            if (error) return res.status(500).send({register: false, message: "Error"});
            if (results.length > 0) return res.status(401).send({register: false, message: "Bad Request"}); 
            bcrypt.hash(password, 10, (err, hash) => {
                // console.log('hash', hash);
                database.query("INSERT INTO users_accounts (username, password) VALUES(?,?)",
                [username, hash], 
                (error, results, fields) => {
                    if (error) return res.status(500).send({register: false, message: "Error"});
                    return res.status(200).send({register: true})
                })
            });
        });
    }

    VerifyTokenAuthenticationStatus(req, res) {
        const token_decoded = req.headers.token_decoded;
        return res.status(200).send({token_is_valid: true, token_decoded});
    }
}

module.exports = new AccountController();