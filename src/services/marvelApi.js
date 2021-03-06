const API_KEY = '93f45297a2883d101c9b09a662ee1754';
const API_QUERY = `&apikey=${API_KEY}`;
const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';
const TS_QUERY = '?ts=1';
const HASH = '7146c279264ea35e0bfb7ea39dfe57c0';
const HASH_QUERY = `&hash=${HASH}`;

const EVERYTHING_URL = `${BASE_URL}${TS_QUERY}${API_QUERY}${HASH_QUERY}`;


const throwJson = json => { throw json; };
const get = url => fetch(url)
  .then(r => r.ok ? r.json() : r.json().then(throwJson));

export function checkResponseData(response) {
  if(response.Response === 'False') throw response.Error;
  return response;
}

export function getChar(id) {
  const url = `${BASE_URL}/${id}${TS_QUERY}${API_QUERY}${HASH_QUERY}`;
  return get(url);
}

export function getAllChars() {
  const url = `${EVERYTHING_URL}`;
  return get(url);
}

export function search(topic, { page = 1, perPage = 20 }) {
  const search = `&nameStartsWith=${topic}`;
  const paging = `&offset=${page * perPage - 20}&limit=${perPage}`;

  return get(`${EVERYTHING_URL}${search}${paging}`);
}

// proper url format should look like http://gateway.marvel.com/v1/public/characters?nameStartsWith=a&ts=1&apikey=93f45297a2883d101c9b09a662ee1754&hash=7146c279264ea35e0bfb7ea39dfe57c0
