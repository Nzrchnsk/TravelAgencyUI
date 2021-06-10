<script>
import axios from 'axios';

let link = 'https://localhost:5001/api/'

async function Get(api, params) {
  let linkFull = link + api;
  if (Array.isArray(params)){
    params.forEach((element) => {
      if(element[0] != undefined){
        linkFull += `${element[0]}=${element[1]}&`;
      }
    });
  }
  const data = await axios.get(linkFull);
  return data;
}

async function Post(api, value) {
  let linkFull = link + api;
  const data = await axios.post(linkFull, value);
  return data;
}
async function Put(api, id, value) {
  let linkFull = link + api + `id=${id}`;
  const data = await axios.put(linkFull, value);
  return data;
}
async function Delete(api, id) {
  let linkFull = link + api + `id=${id}`;
  const data = await axios.delete(linkFull);
  return data;
}
export default {
  Get,
  Post,
  Put,
  Delete,
}
</script>