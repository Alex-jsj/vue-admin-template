import axios from 'common/js/http';

// get info
export function getInfo(data) {
    return axios.get('/kiosk', { params: data }).then(res => {
        return Promise.resolve(res);
    });
}
