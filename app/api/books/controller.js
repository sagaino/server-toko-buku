const { Book, Category } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getAllBook: async (req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;
      console.log(keyword);

      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }

      if (category !== "") {
        condition = { ...condition, category: category };
      }

      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
      });
      res.status(200).json({
        message: "success get data books",
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { title, price, category, author, published, stock, image } =
        req.body;
      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({
          message: "Id category not found",
        });
      }

      const books = await Book.create({
        title,
        price,
        author,
        published,
        price,
        stock,
        image,
        category,
        user,
      });

      res.status(201).json({
        message: "success create book",
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },

  updateBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { id } = req.params;
      const { title, price, category, author, published, stock, image } =
        req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user,
        },
      });

      if (!checkCategory) {
        res.status(404).json({
          message: "Id category not found",
        });
      }

      const checkBook = await Book.findOne({
        where: {
          id: id,
        },
      });

      if (!checkBook) {
        res.status(404).json({
          message: "Id book not found",
        });
      }

      const books = await checkBook.update({
        title,
        price,
        author,
        published,
        price,
        stock,
        image,
        category,
        user,
      });

      res.status(200).json({
        message: "edit books success",
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBooks: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkBook = await Book.findOne({
        where: {
          id: id,
        },
      });

      if (checkBook) {
        const books = await checkBook.destroy();
        res.status(200).json({
          message: "success delete book",
          data: books,
        });
      }
      res.status(404).json({
        message: "failed delete book",
      });
    } catch (err) {
      next(err);
    }
  },
};
