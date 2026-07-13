const Product = require('../models/product');

class ProductController {
  
  static async index(req, res) {
    try {
      const products = await Product.findAll({});
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produtos", details: error.message });
    }
  }
 
  static async create(req, res) {
    try {
      const { name, description, price, quantity, min_stock, category_id  } = req.body;

      if (!name) {
        return res.status(400).json({ error: "O campo 'name' é obrigatório." });
      }

      if (!price) {
        return res.status(400).json({ error: "O campo 'preço' é obrigatório." });
      }

      if (quantity === undefined || quantity === null) {
        return res.status(400).json({ error: "O campo 'quantidade' é obrigatório." });
      }

      if (!category_id) {
        return res.status(400).json({ error: "O campo 'categoria' é obrigatório." });
      }

      const newProduct = await Product.create({ 
        name, 
        description,
        price,
        quantity,
        min_stock,
        category_id
      });
 
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar produto", details: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, quantity, min_stock, category_id } = req.body;
      
      let product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      if (name !== undefined) product.name = name;
      if (description !== undefined) product.description = description;
      if (price !== undefined) product.price = price;
      if (quantity !== undefined) product.quantity = quantity;
      if (min_stock!== undefined) product.min_stock = min_stock;
      if (category_id !== undefined) product.category_id = category_id;


      await product.save();

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar produto", details: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      let product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await product.destroy();
      return res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar produto", details: error.message });
    }
  }

  
}




module.exports = ProductController;