import { Commit } from "vuex";

export enum AppActions {
  START_LOADING = "startLoading",
  STOP_LOADING = "stopLoading"
}

export enum AppMutations {
  SET_LOADING = "setLoading"
}

export interface AppState {
  loading: boolean | null;
}
export const createInitialState = (): AppState => ({
  loading: false
});
const mutations = {
  [AppMutations.SET_LOADING](state: AppState, value: boolean) {
    state.loading = value;
  }
};
const actions = {
  [AppActions.START_LOADING]: async ({ commit }: { commit: Commit }) => {
    commit(AppMutations.SET_LOADING, true);
  },
  [AppActions.STOP_LOADING]: async ({ commit }: { commit: Commit }) => {
    commit(AppMutations.SET_LOADING, false);
  }
};

const state = createInitialState();

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
};
