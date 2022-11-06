export default {
  changeinfo(state, payload) {
    state.receiver = payload.receiver;
    state.regions = payload.regions;
    state.address = payload.address;
  },
};
