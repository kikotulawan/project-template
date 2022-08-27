import API from "../../base/";

const auth = {
 namespaced: true,
 state() {
  return {
   user: {},
   token: localStorage.getItem("auth") || "",
   role: localStorage.getItem("role") || "",
  };
 },
 mutations: {
  SET_ACC(state, data) {
   state.user = data;
   const bearer_token = localStorage.getItem("auth") || "";
   API.defaults.headers.common["Authorization"] = `Bearer ${bearer_token}`;
  },
  SET_TOKEN(state, token) {
   state.token = token;
   localStorage.setItem("auth", token);
  },
  SET_ROLE(state, role) {
   state.role = role;
   localStorage.setItem("role", role);
  },
  SET_ADMINISTRATOR() {
   localStorage.setItem("isAdmin", true);
  },
  UNSET_USER(state) {
   localStorage.removeItem("auth");
   localStorage.removeItem("role");
   localStorage.removeItem("isAdmin");
   state.token = "";
   state.role = "";
   API.defaults.headers.common["Authorization"] = "";
  },
 },
 actions: {
  async login({ commit }, data) {
   const res = await API.post("/auth/login", data)
    .then((res) => {
     commit("SET_TOKEN", res.data.access_token);
     res.data.role == "Administrator" ? commit("SET_ADMINISTRATOR") : null;
     return res;
    })
    .catch((err) => {
     return err.response;
    });
   return res;
  },
  async logout({ commit }) {
   const res = await API.post("/auth/logout?token=" + localStorage.getItem("auth"))
    .then((response) => {
     commit("UNSET_USER");
     return response;
    })
    .catch((error) => {
     console.log(error.response);
     return error.response;
    });
   return res;
  },
 },
};
export default auth;
