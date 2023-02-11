import db from '../models'
import { Op } from 'sequelize'

export const getBooks = ({page, limit, order, name, available, ...query}) => new Promise(async(resolve, reject) => {
    try {
        const queries = {raw: true, nest: true}
        const offsetStep = (!page || +page <= 1) ? 0 : (+page - 1)
        const Flimit = +limit || +process.env.LIMIT_BOOK
        queries.offset = offsetStep * Flimit
        queries.limit = Flimit
        if (order) queries.order = [order]
        if (name) query.title = {[Op.substring]: name}
        if (available) query.available = {[Op.between]: available }

        const response = await db.Book.findAndCountAll({
            where: query,
            ...queries
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "Can't found book",
            bookData: response
        })
        
    } catch (error) {
        reject(error)
    }
})
