const pool = require("../../config/database");


module.exports = ({
    create: (data, callback) => {
        pool.query(
            `insert into users(
                user_name,
                first_name, 
                last_name,
                email, 
                password,
                verification_code, 
                terms, 
                newsletter,
                verification_status)
            values(?,?,?,?,?,?,?,?,?)`,
            [
                data.user_name,
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.verification_code,
                data.terms,
                data.newsletter,
                data.verification_status
            ],
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },


    getUserByEmail: (email, callback) =>{
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) =>{
                if(error) {
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    },


    verifyUser: (verification_code, callback) =>{
        pool.query(
            `select * from users where verification_code = ?`,
            [verification_code],
            (error, results, fields) =>{
                if(error) {
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    updateStatus: (data, callback) => {
        pool.query(
            `update users set verification_status=? Where id=?`,
            [
                data.verification_status = "verified",
                data.id,
            ],
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

})