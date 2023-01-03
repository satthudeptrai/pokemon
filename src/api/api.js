import axios from "axios";
axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const getList = (page) => {
  return axios({
    method: 'get',
    url: `pokemon?limit=20&offset=${page}`,
  });
};
export const getInfo = (name) => {
  return axios({
    method: 'get',
    url: `pokemon/${name}`,
  });
}