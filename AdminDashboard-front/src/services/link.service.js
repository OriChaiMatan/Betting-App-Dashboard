import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";

export const linkService = {
  query,
  getById,
  save,
  remove
}

window.cs = linkService;

const BASE_URL = "link/";

async function query() {
  return httpService.get(BASE_URL);
}

async function getById(stayId) {
  const stay = await httpService.get(`${BASE_URL}${stayId}`)
  return stay
}

async function remove(stayId) {
  return httpService.delete(`${BASE_URL}${stayId}`)
}

async function save(stay) {
  var savedStay;
  if (stay && stay._id) {
    savedStay = await httpService.put(`${BASE_URL}${stay._id}`, stay)
  } else {
    savedStay = await httpService.post(`${BASE_URL}`, stay)
  }
  return savedStay
}
  
