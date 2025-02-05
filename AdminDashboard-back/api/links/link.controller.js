import { linksService } from "./link.service.js"
import { loggerService } from "../../services/logger.service.js"

export async function getLinks(req, res){
    try {
        const links = await linksService.query()
        res.send(links)
    } catch (error) {
        loggerService.error(`Could'nt get codeblocks`, error)
        res.status(400).send(`Could'nt get codeblocks`)
    }
}

export async function getLink(req, res) {
    try {
        const linkId = req.params.linkId
        console.log('codeblockId:', linkId)
        const link = await linksService.getById(linkId)
        res.send(link)
    } catch (error) {
        loggerService.error(`Could'nt get codeblock`, error)
        res.status(400).send(`Could'nt get codeblock`)
    }
}