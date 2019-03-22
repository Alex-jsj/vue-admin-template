import axios from 'utils/http_local';

// get info
export function getData(data) {
    return axios.get('./static/mock/userinfo.json', { params: data }).then(res => {
        return Promise.resolve(res);
    });
}
