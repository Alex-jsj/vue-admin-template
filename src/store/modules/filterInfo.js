// api
import { get_guoji, get_minzu, get_cities } from 'api/filterGroup/local';

const filterInfo = {
    state: {
        country: [],
        nation: [],
        cities: []
    },
    mutations: {
        // 国家
        SET_COUNTRY: function(state, newVal) {
            this.state.filterInfo.country = newVal;
        },
        // 民族
        SET_NATION: function(state, newVal) {
            this.state.filterInfo.nation = newVal;
        },
        // 民族
        SET_CITIES: function(state, newVal) {
            this.state.filterInfo.cities = newVal;
        }
    },
    actions: {
        // 国家
        getCountry({ commit }, val) {
            return new Promise(resolve => {
                get_guoji().then(res => {
                    if (res.code == 200) {
                        commit('SET_COUNTRY', res.data);
                    }
                });
            });
        },
        // 民族
        getNation({ commit }, val) {
            return new Promise(resolve => {
                get_minzu().then(res => {
                    if (res.code == 200) {
                        commit('SET_NATION', res.data);
                    }
                });
            });
        },
        // 省市区
        getCities({ commit }, val) {
            return new Promise(resolve => {
                get_cities().then(res => {
                    if (res.code == 200) {
                        commit('SET_CITIES', res.data);
                    }
                    if (res.code == 200) {
                        const list = res.data;
                        let arr = [];
                        // 将对象转化为数组
                        for (let key in list) {
                            arr.push(list[key]);
                        }
                        commit('SET_CITIES', arr);
                    }
                });
            });
        }
    }
};

export default filterInfo;
