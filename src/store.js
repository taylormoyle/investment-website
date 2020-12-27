import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadingMap: {},
    },
    getters: {
        isLoading(state) {
            return Object.values(state.loadingMap).reduce((acc, item) => acc || item, false);
        },
    },
    mutations: {
        loading(state, progress) {
            state.loadingMap = { ...state.loadingMap, ...progress };
        },
    },
});
