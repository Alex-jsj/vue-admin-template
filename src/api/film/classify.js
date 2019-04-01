import axios from 'utils/http_local';

// get
export function getData(data) {
    return axios.get(`./static/mock/list.json`, { params: data }).then(res => {
        return Promise.resolve(res);
    });
}
// delete
export function deleteItem(data) {
    return axios.delete(`./static/mock/login.json/${data.id}`).then(res => {
        return Promise.resolve(res);
    });
}
// batch delete
export function batchDelete(data) {
    return axios.delete(`./static/mock/login.json/${data.id}`).then(res => {
        return Promise.resolve(res);
    });
}
// add
export function addItem(data) {
    return axios.post(`./static/mock/login.json`, data).then(res => {
        return Promise.resolve(res);
    });
}
// edit
export function getEdit(id) {
    return axios.get(`./static/mock/list.json`).then(res => {
        return Promise.resolve(res);
    });
}
export function editItem(data) {
    return axios.patch(`./static/mock/list.json/${data.id}`, data).then(res => {
        return Promise.resolve(res);
    });
}
