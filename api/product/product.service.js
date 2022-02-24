const pool = require("../../config/database");


module.exports = ({
    createProduct: (data, callback) => {
        pool.query(
            `insert into products(
                product_description,
                product_defects, 
                product_location,
                price,
                size,
                seller_id
               )
            values(?,?,?,?,?,?)`,
            [
                data.product_description,
                data.product_defects,
                data.product_location,
                data.price,
                data.size,
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

    getProduct: callback => {
        pool.query(
            'SELECT * ' +
                  'FROM users ' +
                  'LEFT JOIN products ON users.id = products.seller_id',
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getAllVendors: callback => {
        pool.query(
            `select id, 
            first_name,
            last_name,
            seller_id
            from seller_details`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

})