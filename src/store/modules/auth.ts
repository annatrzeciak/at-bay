import { User, UserRole } from "@/types/types";
import { Commit, Dispatch } from "vuex";
import * as fb from "@/firebase";

export enum AuthActions {
  LOGIN = "login",
  FETCH_USER_PROFILE = "fetchUserProfile",
  SIGNUP = "signup",
  LOGOUT = "logout",
  RESET_PASSWORD = "resetPassword",
  FETCH_USERS_LIST = "fetchUsersList"
}

export enum AuthMutations {
  SET_USER_PROFILE = "setUserProfile",
  SET_USERS_LIST = "setUsersList"
}

export interface AuthState {
  userProfile: User | null;
  usersList: Array<User | null>;
}

export const createInitialState = (): AuthState => ({
  userProfile: null,
  usersList: []
});

const state = createInitialState();

const getters = {
  isLogged: (state: AuthState) => {
    return Boolean(state.userProfile);
  },
  userProfile: (state: AuthState) => {
    return state.userProfile;
  },
  usersList: (state: AuthState) => {
    return state.usersList;
  },
  isModerator: (state: AuthState) =>
    state.userProfile &&
    (state.userProfile.role === UserRole.ADMIN ||
      state.userProfile.role === UserRole.MODERATOR),

  isUser: (state: AuthState) =>
    state.userProfile && state.userProfile.role === UserRole.USER
};
const mutations = {
  [AuthMutations.SET_USER_PROFILE](state: AuthState, user: any) {
    state.userProfile = user;
  },
  [AuthMutations.SET_USERS_LIST](state: AuthState, users: Array<User | null>) {
    state.usersList = users;
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

      return dispatch(AuthActions.FETCH_USER_PROFILE, user);
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
    try {
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      commit(AuthMutations.SET_USER_PROFILE, userProfile.data());
    } catch (e) {
      return Promise.reject(e);
    }
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
      return await fb.usersCollection
        .doc(user.uid)
        .set({ email: form.email, name: form.name, role: UserRole.USER });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  [AuthActions.LOGOUT]: async ({ commit }: { commit: Commit }) => {
    try {
      await fb.auth.signOut();
      commit(AuthMutations.SET_USER_PROFILE, null);
      commit(AuthMutations.SET_USERS_LIST, []);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  [AuthActions.RESET_PASSWORD]: async (
    { commit }: { commit: Commit },
    email: string
  ) => {
    return await fb.auth.sendPasswordResetEmail(email);
  },
  [AuthActions.FETCH_USERS_LIST]: async ({ commit }: { commit: Commit }) => {
    try {
      const collection = await fb.usersCollection.get();
      const users = collection.docs.map((doc: any) => doc.data());
      commit(AuthMutations.SET_USERS_LIST, users);
      return Promise.resolve();
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
