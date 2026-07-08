const Product = require('../models/product');


class MetricsController {
static async getMetrics(req, res) {
    try {
      const totalProducts = await Product.count();


      const products = await Product.findAll({ attributes: ['price', 'quantity'] });
      const totalValue = products.reduce((soma, item) => soma + (item.price * item.quantity), 0);


      return res.status(200).json({
        totalProducts,
        criticalStock: 0,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao gerar métricas", details: error.message });
    }
  }
}

module.exports = MetricsController;