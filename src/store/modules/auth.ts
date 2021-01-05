import { User, UserRole } from "@/types/types";
import { Commit, Dispatch } from "vuex";
import * as fb from "@/firebase";
import router from "@/router";

export enum AuthActions {
  LOGIN = "login",
  FETCH_USER_PROFILE = "fetchUserProfile",
  SIGNUP = "signup"
}

export enum AuthMutations {
  SET_USER_PROFILE = "setUserProfile"
}

export interface AuthState {
  userProfile: User | null;
}

export const createInitialState = (): AuthState => ({
  userProfile: null
});

const state = createInitialState();

const getters = {
  isLogged: (state: AuthState) => {
    return Boolean(state.userProfile);
  }
};
const mutations = {
  [AuthMutations.SET_USER_PROFILE](state: AuthState, user: any) {
    state.userProfile = user;
  }
};

const actions = {
  [AuthActions.LOGIN]: async (
    {
      dispatch
    }: {
      dispatch: Dispatch;
    },
    form: { email: string; password: string }
  ) => {
    try {
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      await dispatch(AuthActions.FETCH_USER_PROFILE, user);
      return router.push({ name: "Home" });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  [AuthActions.FETCH_USER_PROFILE]: async (
    {
      commit
    }: {
      commit: Commit;
    },
    user: any
  ) => {
    const userProfile = await fb.usersCollection.doc(user.uid).get();

    commit(AuthMutations.SET_USER_PROFILE, userProfile.data());
  },
  [AuthActions.SIGNUP]: async (
    {
      dispatch
    }: {
      dispatch: Dispatch;
    },
    form: { name: string; email: string; password: string }
  ) => {
    try {
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      await fb.usersCollection
        .doc(user.uid)
        .set({ email: form.email, name: form.name, role: UserRole.USER });
      await router.push({ name: "Login" });
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};