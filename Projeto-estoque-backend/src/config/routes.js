const UserController = require("../controllers/user_controller");
const CategoryController = require("../controllers/category_controller");
const ProductController = require("../controllers/product_controller");
const StockMovementController = require('../controllers/stockmovement_controller');
const LogsController = require('../controllers/logs_controller');
const MetricsController = require('../controllers/metricscontroller');
const express = require('express');

function Routes(app) {

    app.get("/", (req, res) => { res.status(200).json({}); });

    app.post("/user", (req, res) => { UserController.register(req, res); });
    app.post("/authenticate", (req, res) => { UserController.authenticate(req, res); });

    const protectedRoutes = express.Router();
    
    protectedRoutes.use(UserController.ValidateToken);

    protectedRoutes.get("/user/me", (req, res) => { UserController.index(req, res); });

    protectedRoutes.get('/categories', (req, res) => { CategoryController.index(req, res); });
    protectedRoutes.post("/category", (req, res) => { CategoryController.create(req, res); }); 

    protectedRoutes.get('/products', (req, res) => { ProductController.index(req, res); });
    protectedRoutes.post("/product", (req, res) => { ProductController.create(req, res); });
    protectedRoutes.put("/product/:id", (req, res) => { ProductController.update(req, res); });

    protectedRoutes.post("/stock/movement", (req, res) => { StockMovementController.create(req, res); }); 
 
    protectedRoutes.get('/logs', (req, res) => { LogsController.index(req, res); });
 
    protectedRoutes.get('/metrics', (req, res) => { MetricsController.index(req, res); });

    app.use("/", protectedRoutes);
}

module.exports = Routes;