import axios from "utils/http";

// 修改个人信息
export function modifyPersonalInfo(data) {
    return axios.post(`/user/passwd`, data).then(res => {
        return Promise.resolve(res);
    });
}
