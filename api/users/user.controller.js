const pool = require("../../config/database");
const { create, createSellerAlc, getUserByEmail, verifyUser, updateStatus } = require('./user.service');
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
            let stringOtp = otp.toString();
            body.verification_code = hashSync(stringOtp, salt)
            body.verification_status = "pending"
            mailers.client(body, otp)
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
                    status: 200,
                    message: "Registration successful",
                    id: results.insertId,
                    email: body.email,
                    data: results
                })
            })

        }
    })

    },


    sellerReg: (req, res) =>{
        pool.query('SELECT * FROM seller_details WHERE first_name = ? ', req.body.first_name, (err, user) => { 
        if(user.length > 0){
            return res.status(500).json({
                error: 0,
                message: "User already exist"
            })
        }else{
            const body = req.body;
            body.seller_status = "registered"
            createSellerAlc(body, (err, results) =>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        error: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    status: 200,
                    message: "Information Saved successfully",
                    data: results,
                    seller_status: body.seller_status
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
        verifyUser(body.id, (err, results) =>{
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
            }
            const result = compareSync(body.verification_code, results.verification_code);
            if(result){
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
                }else{
                    return res.json({ 
                        success: 0,
                        message: "incorrect code",
                    })
                }
            });
    }
}