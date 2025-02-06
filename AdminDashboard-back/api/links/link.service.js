import fs from 'fs'
import { utilService } from "../../services/util.service.js"
import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb'
import { loggerService } from '../../services/logger.service.js';

const PAGE_SIZE = 2
const collectionName = 'links'

export const linksService = {
    query,
    getById,
    remove,
    save,
    update
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection(collectionName)
        const linkCursor = await collection.find(criteria)
        const links = await linkCursor.toArray()
        return links
    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

async function getById(linkId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const link = collection.findOne({ _id: new ObjectId(linkId) })
        if (!link) throw `Couldn't find link with _id ${linkId}`
        return link
    } catch (err) {
        loggerService.error(`while finding link ${linkId}`, err)
        throw err
    }
}


async function remove(linkId, loggedinUser) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(linkId) })
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove stay ${linkId}`, err)
        throw err
    }
}

async function add(linkToSave, loggedinUser) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(linkToSave)
        return linkToSave
    } catch (err) {
        loggerService.error('linkService, can not add stay : ' + err)
        throw err
    }
}

async function update(link) {
    const linkToUpdate = { ...link };
    // Remove the _id field from the object to avoid updating it
    delete linkToUpdate._id;

    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ _id: new ObjectId(link._id) }, { $set: linkToUpdate })
        console.log("SAVED LINK TO MONGO ", link)
        return link
    } catch (err) {
        loggerService.error(`cannot update stay ${link._id}`, err)
        throw err
    }
}


async function removeStayMsg(linkId, msgId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ _id: new ObjectId(linkId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        loggerService.error(`cannot add link msg ${linkId}`, err)
        throw err
    }
}

async function save(linkToSave) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const savedStay = await collection.insertOne(linkToSave)
        linkToSave._id = savedStay.insertedId
        loggerService.debug(linkToSave)
        return linkToSave
    } catch (err) {
        throw err
    }
}

function _buildCriteria() {
    const criteria = {}
    return criteria
}