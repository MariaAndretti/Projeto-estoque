const ActivityLog = require('../models/activitylog');

class LogController {

  static async index(req, res) {

     try {
       let { pag = 1, limite = 10 } = req.query;

      pag = Number(pag);
      limite = Number(limite);

       if (pag < 1) pag = 1;
       if (limite < 1) limite = 10;

      const offset = (pag - 1) * limite;

      const result = await ActivityLog.findAndCountAll({
        limite,
        offset,
        order: [['created_at', 'DESC']]
      });

      const totalpags = Math.ceil(result.count / limite);

      return res.status(200).json({
        totalItems: result.count,
        totalpags,
        currentpag: pag,
        logs: result.rows
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar os logs',
        details: error.message
      });
    }
  }
}

module.exports = LogController;
