const pool = require("../../config/database");
const { createProduct, getAllVendors, getProduct } = require('./product.service');


module.exports = {
    insertProduct:  (req, res) =>{
        pool.query('SELECT * FROM seller_details WHERE seller_id = ? ', req.body.seller_id, (err, user) => { 
            if(user > 0){
                return res.status(500).json({
                    error: 0,
                    message: "Seller Account Does not exist",
                })
            }else{
                const body = req.body;
                createProduct(body, (err, results) =>{
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
                        message: "Product Uploaded successfully",
                    })
                })

            }
        })

    },

    availableProducts: (req, res) => {
        getProduct((err, resp)=>{
            console.log(resp)
            // getAllVendors((err, response)=>{
            //     if(err){
            //         console.log(err);
            //         return;
            //     }
            //     let product = [];
            //     let prod = resp.map((o) => {
            //        return{
            //            ...o
            //        }
            //     })
            //     let vendors = response.map((v) =>{
            //         return{
            //             ...v,
            //         }
            //     })
            //     console.log(vendors)
            // })
            return res.json({
                status: 200,
                data: resp
            });
        })
    }
}