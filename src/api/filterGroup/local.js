import axios from 'common/js/http';
import axios_json from 'common/js/http_local';

// 获取国家数据
export function get_guoji() {
    return axios_json.get('./static/data/country.json').then(res => {
        return Promise.resolve(res);
    });
}
// 获取民族数据
export function get_minzu() {
    return axios_json.get('./static/data/nation.json').then(res => {
        return Promise.resolve(res);
    });
}
// 省市区
export function get_cities() {
    return axios_json.get('./static/data/cities.json').then(res => {
        return Promise.resolve(res);
    });
}
