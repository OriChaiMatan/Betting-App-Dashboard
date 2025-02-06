import { linksService } from "./link.service.js"
import { loggerService } from "../../services/logger.service.js"

export async function getLinks(req, res){
    try {
        const links = await linksService.query()
        res.json(links)
    } catch (err) {
        loggerService.error('Failed to get links', err)
        res.status(400).send({ err: 'Failed to get links' })
    }
}

export async function getLink(req, res) {
    try {
        const linkId = req.params.linkId
        console.log('linkId:', linkId)
        const link = await linksService.getById(linkId)
        res.send(link)
    } catch (error) {
        loggerService.error(`Could'nt get link`, error)
        res.status(400).send(`Could'nt get link`)
    }
}

export async function removeLink(req, res) {
    try {
        const { linkId } = req.params;

        if (!linkId) {
            return res.status(400).send({ error: "Missing linkId in request" });
        }

        const deletedCount = await linksService.remove(linkId);

        if (!deletedCount) {
            return res.status(404).send({ error: "Link not found" });
        }

        res.send({ message: "Deleted successfully", linkId });
    } catch (err) {
        loggerService.error(`Cannot remove link`, err);
        res.status(500).send({ error: "Cannot remove link" });
    }
}


export async function updateLink(req, res) {
    const { _id, title, imgUrl, link } = req.body
    let linkToSave = { _id, title, imgUrl, link }
    console.log("linkToSave? ", linkToSave)

    try {
        // const savedStay = await stayService.save(stayToSave, req.loggedinUser)
        const savedStay = await linksService.update(linkToSave)
        res.send(savedStay)
    } catch (err) {
        logger.error(`Cannot update stay`, err)
        res.status(400).send(`Cannot update stay`)
    }
}

export async function addLink(req, res) {
    const { title, imgUrl, link } = req.body
    let linkToSave = { _id, title, imgUrl, link }

    try {
        const savedStay = await linksService.save(linkToSave)
        res.send(savedStay)
    } catch (err) {
        logger.error(`Cannot save stay`, err)
        res.status(400).send(`Cannot save stay`)
    }
}