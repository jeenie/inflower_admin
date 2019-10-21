import qs from 'qs';
import {axios} from '../config';

class Request {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(uriParams, query) {
    const param = query ? `${uriParams}?${qs.stringify(query)}` : uriParams;
    const URL = `${this.baseURL}/${param}`;
    return axios.get(URL).then(res => res.data);
  }

  post(param, body) {
    return axios.post(`${this.baseURL}/${param}`, body, {
      onUploadProgress: e => {
      // const percent = parseInt(Math.round(((Number(e.loaded) * 100) / Number(e.total)));
      // console.log(`${percent}%`);
      }
    }).then(res => res.data);
  }

  put(param, body) {
    return axios.put(`${this.baseURL}/${param}`,
      body,
      {
        onUploadProgress: e => {
          // const percent = parseInt(Math.round(((Number(e.loaded) * 100) / Number(e.total)));
          // console.log(`${percent}%`);
        }
      }
    );
  }

  delete(uriParams) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.baseURL}/${uriParams}`)
        .then(res => resolve(res.data)).catch(reject);
    });
  }

  postFile(uriParams, file) {
    const formData = new FormData();
    formData.append('imgFile', file);
    return new Promise((resolve, reject)=>{
      axios.post(`${this.baseURL}/${uriParams}`, formData, {
        onUploadProgress: e => {
          // const percent = parseInt(Math.round(((Number(e.loaded) * 100) / Number(e.total)));
          // console.log(`${percent}%`);
        }
      }).then(res => resolve(res.data)).catch(reject);
    });
  }

  postFiles(uriParams, files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('img', file);
    }
    return axios.post(`${this.baseURL}/${uriParams}`, formData, {
      onUploadProgress: e => {
        // const percent = parseInt(Math.round(((Number(e.loaded) * 100) / Number(e.total)));
        // console.log(`${percent}%`);
      }
    });
  }
}

export default Request;
