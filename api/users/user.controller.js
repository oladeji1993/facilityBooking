const pool = require("../../config/database");
const { create, getUserByEmail, verifyUser, updateStatus } = require('./user.service');
const mailers = require('../../services/mailer')


const { genSaltSync, hashSync, compareSync  } =  require("bcrypt");
const { sign } = require("jsonwebtoken")    


module.exports = {
    createUser: (req, res) =>{
        pool.query('SELECT * FROM users WHERE email = ? ', req.body.email, (err, user) => { 
        if(user.length > 0){
            return res.status(500).json({
                error: 0,
                message: "Email already exist"
            })
        }else{
            // generate otp
            var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            const body = req.body;
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            body.verification_code = otp
            body.verification_status = "pending"
            mailers.client(body)
            create(body, (err, results) =>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        error: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Registration successful",
                    data: results
                })
            })

        }
    })

    },

    login: (req, res) =>{
        const body = req.body;
        getUserByEmail(body.email, (err, results) =>{
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json(
                    {
                        success: 0,
                        message: "invalid email or password"
                    }
                )
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results}, process.env.SECRET,
                {
                    expiresIn: "1h"
                });
                return res.json({ 
                    success: 1,
                    status: 200,
                    message: "login successful",
                    verification_status: results.verification_status,
                    token: jsontoken
                })
            }else{
                return res.json({ 
                    success: 0,
                    message: "incorrect email or password",
                })
            }
        });
    },


    verify: (req, res) =>{
        const body = req.body;
        verifyUser(body.verification_code, (err, results) =>{
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json(
                    {
                        success: 0,
                        message: "invalid code"
                    }
                )
            }else{
                updateStatus(results, (err, results) =>{
                    if(err){
                        console.log(err)
                        return res.status(500).json({
                            error: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Account Verification successful",
                    })
                })
                }
            });
    }
}