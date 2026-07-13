const StockMovement = require('../models/stockmovement');
const Product = require('../models/product')
const Sequelize = ('Sequelize')

class StockMovementController {
  
  static async create(req, res) {
    const { type, quantity, product_id } = req.body;
    const quantidade = parseInt(quantity);

    if (!['entrada', 'saída'].includes(type)) {
      return res.status(400).json({ error: "Use 'entrada' ou 'saída'." });
    }

    try {

      const result = await sequelize.transaction(async (transação) => {
        const product = await Product.findByPk(product_id, { transaction: transação });
        
        if (!product) return { error: 'Produto não encontrado.', status: 404 };
        if (type === 'saída' && product.quantity < quantidade) return { error: 'Estoque insuficiente.', status: 400 };

        const newQuantity = type === 'entrada' ? product.quantity + quantidade : product.quantity - quantidade;
        await product.update({ quantity: newQuantity }, { transaction: transação });

        return await StockMovement.create({ type, quantity: quantidade, product_id, user_id: req.userId }, { transaction: transação });
      });

      if (result.error) return res.status(result.status).json({ error: result.error });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar movimentação.', details: error.message });
    }
  }
}

module.exports = StockMovementController;


