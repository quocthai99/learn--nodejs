import db from "../models";
import { Op } from "sequelize";
import {v4 as generateId} from 'uuid'

// READ
export const getBooks = ({ page, limit, order, name, available, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offsetStep = !page || +page <= 1 ? 0 : +page - 1;
      const Flimit = +limit || +process.env.LIMIT_BOOK;
      queries.offset = offsetStep * Flimit;
      queries.limit = Flimit;
      if (order) queries.order = [order];
      if (name) query.title = { [Op.substring]: name };
      if (available) query.available = { [Op.between]: available };

      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: ["category_code"],
        },
        include: [
          {
            model: db.Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            as: "CategoryData",
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Can't found book",
        bookData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// CREATE
export const createNewBook = (body) => new Promise(async (resolve, reject) => {
    try {
      const response = await db.Book.findOrCreate({
        where: { title: body.title },
        defaults: {
            ...body,
            id: generateId()
        }
      });

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created" : "Can't create new book",
      });
    } catch (error) {
      reject(error);
    }
  });
