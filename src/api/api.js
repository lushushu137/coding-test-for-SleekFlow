// import axios from "./axios";
import axios from "axios";
import asyncPool from "tiny-async-pool";

const getCharacterApi = "https://rickandmortyapi.com/api/character";
const getEpisodeApi = "https://rickandmortyapi.com/api/episode";

// get 20(as the API designed) characters by page
export const getCharactersByPage = async (page) => {
  const result = await axios.get(`${getCharacterApi}?page=${page}`);
  return result.data;
};

// get character by id
export const getCharacterById = async (id) => {
  const result = await axios.get(`${getCharacterApi}/${id}`);
  return result.data;
};

// get episode list by id list
export const getEpisodesByIdList = async (idList) => {
  if (idList.length === 0) {
    return [];
  } else if (idList.length === 1) {
    const result = await getEpisodeById(idList[0]);
    return [result];
  } else {
    const params = idList.join(",");
    const result = await axios.get(`${getEpisodeApi}/${params}`);
    return result.data;
  }
};

// get episode by id
export const getEpisodeById = async (id) => {
  if (id === null) return {};
  const result = await axios.get(`${getEpisodeApi}/${id}`);
  return result.data;
};

// get character page by page until the end.
// with 6 max requests at the same time.
export const getAllCharacters = async () => {
  const firstPage = await getCharactersByPage(1);
  const result = [...firstPage.results];
  let params = [];
  for (let i = 2; i < firstPage.info.pages + 1; i++) {
    params.push(i);
  }
  for await (const res of asyncPool(6, params, getCharactersByPage)) {
    result.push(...res.results);
  }

  return result;
};
