const database = require('../../database/connect')

class IndexModel{
    adminLogin(username, pass){
        return database.query(`select * from users where username = '${username}' and password = '${pass}'`)
    }

    addShop(shopName, address){
        return database.query(`insert into shop(shop_name, shop_address) values ('${shopName}', '${address}') returning *`)
            .then((result) => {
                return result.rows
            })
    }

    addShopForAdmin(shopId, userId){
        return database.query(`update users set shop_id = ${shopId} where user_id = ${userId} `)
            .then((result) => {
                return result.rows
            })
    }

    //product
    getProForCust(){
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      s.sup_name,
                                      sp.shop_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.quantity
                               from product as p,
                                    category as c,
                                    supplier as s,
                                    shop as sp
                               where c.cate_id = p.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.shop_id = sp.shop_id`)
            .then((result) => {
                return result.rows
            })
    }

    custSearchPro(proName){
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      s.sup_name,
                                      sp.shop_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.quantity
                               from product as p,
                                    category as c,
                                    supplier as s,
                                    shop as sp
                               where c.cate_id = p.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.shop_id = sp.shop_id
                                 and p.pro_name like '%${proName}%'`)
            .then((result) => {
                return result.rows
            })
    }

    getPro(shopId, proName){
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      s.sup_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.quantity
                               from product as p,
                                    category as c,
                                    supplier as s
                               where c.cate_id = p.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.shop_id = ${shopId}
                                 and p.pro_name like '%${proName}%'`)
            .then((result) => {
                return result.rows
            })
    }

    getProList(shopId){
        return database.query(`select p.pro_id,
                                      c.cate_name,
                                      s.sup_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.pro_price,
                                      p.quantity
                               from product as p,
                                    category as c,
                                    supplier as s
                               where c.cate_id = p.cate_id
                                 and p.sup_id = s.sup_id
                                 and p.shop_id = ${shopId}`)
            .then((result) => {
                return result.rows
            })
    }

    insertPro(shopId, product){
        return  database.query(`insert into product(cate_id, shop_id, sup_id, pro_name, pro_image, pro_price, quantity)
                                                 values (${product.cateId}, ${shopId}, ${product.supId},
                                                         '${product.name}', '${product.image}',
                                                         '${product.price}', ${product.quantity})`)
    }

    removePro(proId){
        return database.query(`delete from product where pro_id = ${proId} returning *`)
            .then((result) => {
                return result.rows
            })
    }

    //category
    getCateList(){
        return database.query(`select * from category`)
            .then((result) => {
                return result.rows
            })
    }

    insertCate(cateName){
        return database.query(`insert into category(cate_name) values ('${cateName}')`)
    }

    //supplier
    getSupList(){
        return database.query(`select * from supplier`)
            .then((result) => {
                return result.rows
            })
    }

    insertSup(supName, address){
        return database.query(`insert into supplier(sup_name, sup_address) values ('${supName}', '${address}')`)
    }
}

module.exports = new IndexModel