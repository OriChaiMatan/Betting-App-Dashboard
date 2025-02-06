import express from 'express'
import { getLinks, getLink, removeLink, updateLink, addLink } from './link.controller.js'
import { log } from '../../middlewares/logger.middleware.js'

const router = express.Router()

router.get('/', getLinks)
router.get('/:linkId', getLink)
router.delete('/:linkId', log, removeLink)
router.put('/:linkId', log, updateLink)
router.post('/', log, addLink)

export const linkRoutes = router