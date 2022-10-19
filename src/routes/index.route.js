const authentication = require('../middleware/auth')
const indexController = require('../app/controller/IndexController')
const upload = require('../middleware/storeFIle')

function route(app)
{
    //customer
    app.get('/', indexController.indexPage)
    app.get('/customer-search-pro/:name', indexController.custSearchPro)

    //login
    app.get('/login', (req, res) => indexController.login(req, res))
    app.post('/login-process', (req, res) => authentication.checkLogin(req, res))
    app.get('/logout', (req, res) => indexController.logout(res))

    //shop
    app.post('/shop-add', (req, res) => authentication.handleCreateShop(req, res))

    //product
    app.get('/product', (req, res, next) => authentication.checkCookieAdmin(req, res, next), (req, res) => indexController.proList(req, res))
    app.post('/product-new', (req, res, next) => authentication.checkCookieAdmin(req, res, next),  upload.single('proImage'), (req, res) => indexController.newPro(req,res))
    app.delete('/product-remove', (req, res, next) => authentication.checkCookieAdmin(req, res, next), (req, res) => indexController.deletePro(req,res))
    app.get('/product-search/:name', (req, res, next) => authentication.checkCookieAdmin(req, res, next), (req, res) => indexController.searchPro(req,res))

    // //category
    app.get('/category', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => indexController.cateList(req, res))
    app.post('/category-new', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => indexController.newCate(req,res))

    // //supplier
    app.get('/supplier', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => indexController.supList(req,res))
    app.post('/supplier-new', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => indexController.newSup(req,res))

    //404
    app.get('*', (req, res) => indexController.NotFond404(res))
}

module.exports = route