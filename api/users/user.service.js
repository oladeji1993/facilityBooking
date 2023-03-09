const pool = require("../../config/database");


module.exports = ({
    create: (data, callback) => {
        pool.query(
            `insert into users(
                event_title, 
                event_day,
                event_date,
                requester,
                start_time,
                end_time,
                participants,
                date_requested,
                phone,
                
                )
            values(?,?,?,?,?,?,?,?,?)`,
            [
                data.event_title,
                data.event_day,
                data.event_date,
                data.requester,
                data.start_time,
                data.end_time,
                data.participants,
                data.date_requested,
                data.phone,
            ],
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },


    createSellerAlc: (data, callback) => {
        pool.query(
            `insert into seller_details(
                first_name, 
                full_address,
                account_no, 
                bank_name,
                seller_status,
                seller_id)
            values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.full_address,
                data.account_no,
                data.bank_name,
                data.seller_status,
                data.seller_id,
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


    verifyUser: (id, callback) =>{
        pool.query(
            `select * from users where id = ?`,
            [id],
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