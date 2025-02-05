import { utilService } from "../../services/util.service.js"

const codeblocks = utilService.readJsonFile('data/blocks.json')

export const linksService = {
    query,
    getById
}

async function query() {
    let filteredCodeblocks = [...codeblocks]
    return filteredCodeblocks
}

async function getById(codeblockId) {
    try {
        const codeblock = codeblocks.find(codeblock => codeblock._id === codeblockId)
        return codeblock
    } catch (error) {
        throw error
    }
}