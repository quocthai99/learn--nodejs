import * as controllers from '../controllers'
import express from 'express'

const router = express.Router()

router.post('/register', controllers.registor)

module.exports = router