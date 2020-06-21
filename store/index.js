import axios from "axios";

export const state = () => ({
  authUser: null,
  time: new Date().toTimeString().substring(0, 8),
  debug: [],
  x: null,
  y: null
});

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user;
  },
  SET_DEBUG(state, note) {
    state.debug.push(note + " " + new Date().toTimeString().substring(0, 8));
  },
  SET_X(state, a) {
    state[a[0]] = a[1];
    console.log(state[a[0]]);
  }
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    commit("SET_X", ["x", "deneme"]);
    commit("SET_DEBUG", "nuxtServerInit");
    if (req.session && req.session.authUser) {
      console.log(req.session);
      commit("SET_DEBUG", "nuxtServerInit-session " + req.session.toString());
      commit("SET_USER", req.session.authUser);
    }
  },
  async login({ commit }, { username, password }) {
    commit("SET_DEBUG", "login");
    try {
      const { data } = await axios.post("/api/login", { username, password });
      commit("SET_DEBUG", data.toString + " " + username + " : " + password);
      commit("SET_USER", data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw error;
    }
  },

  async logout({ commit }) {
    await axios.post("/api/logout");
    commit("SET_USER", null);
    commit("SET_X", ["y", "Y Değişti"]);
  }
};
