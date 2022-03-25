const { Transaction, DetailTransaction } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      const { invoice = "" } = req.query;

      let condition = {
        user: req.user.id,
      };

      if (invoice !== "") {
        condition = { ...condition, invoice: { [Op.like]: `%${invoice}%` } };
      }

      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
        },
      });

      res.status(200).json({
        message: "success get all transaction",
        data: transaction,
      });
    } catch (err) {
      next(err);
    }
  },

  detailTransactionList: async (req, res, next) => {
    try {
      const { id } = req.params;
      const detailTransaction = await Transaction.findOne({
        where: {
          id: id,
        },
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
        },
      });

      res.status(200).json({
        message: "success get all detail transaction",
        data: detailTransaction,
      });
    } catch (err) {
      next(err);
    }
  },
};
