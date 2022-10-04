const contextReducer = (state, action) => {
  let simulation;
  switch (action.type) {
    case "DELETE_TRANSACTION":
      localStorage.removeItem("simulation");
      return simulation;
    case "ADD_TRANSACTION":
      simulation = [...state];
      localStorage.setItem("simulation", JSON.stringify(simulation));
      return simulation;
    default:
      return state;
  }
};

export default contextReducer;
