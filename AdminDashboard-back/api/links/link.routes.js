import express from 'express'
import { getLinks, getLink } from './link.controller.js'

const router = express.Router()

router.get('/', getLinks)
router.get('/:linkId', getLink)

export const linkRoutes = router