import { SET_BUSINESS_VERSION } from "../types/business";

const state = {
    versionId: null
};

const getters = {
    versionId: state => state.versionId
};

const mutations = {
    [SET_BUSINESS_VERSION]: (state, versionId) => {
        state.versionId = versionId;
    }
};


const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
}