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
  await axios.get(linkFull).then((data) => {
      return data;
  });
}

async function Post(api, value) {
  let linkFull = link + api;
  await axios.post(linkFull, value).then((data) => {
      return data;
  });
}
async function Put(api, value) {
  let linkFull = link + api;
  await axios.put(linkFull, value).then((data) => {
      return data;
  });
}
async function Delete(api) {
  let linkFull = link + api;
  await axios.delete(linkFull).then((data) => {
      return data;
  });
}
export default {
  Get,
  Post,
  Put,
  Delete,
}
</script>