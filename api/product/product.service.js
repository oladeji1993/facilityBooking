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
            `SELECT 
            seller_details.id, 
            seller_details.first_name, 
            seller_details.full_address, 
            seller_details.account_no, 
            seller_details.bank_name, 
            seller_details.seller_status, 
            seller_details.seller_id, 
            CONCAT("[", GROUP_CONCAT("{", "id:", products.id, "}", "," "{", "price:", products.price, "}"), "]") AS pros
            FROM seller_details
            LEFT JOIN products ON seller_details.seller_id=products.seller_id`,
            (error, results, fields) =>{
                if(error){
                    return callback(error)
                }
                // const products = [];
                // const users = [];
                // results.forEach(r => {
                //     console.log("HERE");
                //     if(!(users.find((u) => u.id === r.id))) {
                //         let x = {
                //             id: r.id,
                //             first_name: r.first_name,
                //             full_address: r.full_address,
                //             account_no: r.account_no,
                //             seller_status: r.seller_status,
                //             seller_id: r.seller_id,
                //             products: []
                //         }
                //         users.push(x);
                //     }
                //     if(users.length && users.find((u) => u.id === r.id)) {
                //         let p = {
                //             id: r.product_id,
                //             price: r.price,
                //             product_description: r.product_description,
                //             product_location: r.product_location,
                //             size: r.size,
                //         }
                //         users.map((u) => {
                //             if(u.id === r.id) {
                //                 u.products.push(p);
                //             }
                //         });
                //     }

                // })
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