const Category = require('../models/category');

class CategoryController {
  
  static async index(req, res) {
    try {
      const categories = await Category.findAll({});
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar categorias", details: error.message });
    }
  }
 
  static async create(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ error: "O campo 'name' é obrigatório" });
      }


      const newCategory = await Category.create({ 
        name, 
        description 
      });
 
      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar categoria", details: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      
      let category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      if (name !== undefined) category.name = name;
      if (description !== undefined) category.description = description;

      await category.save();

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar categoria", details: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      let category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      await category.destroy();
      return res.status(200).json({ message: "Categoria deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar categoria", details: error.message });
    }
  }
}

module.exports = CategoryController;