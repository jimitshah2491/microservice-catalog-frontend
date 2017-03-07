const getDataOnLoad = (state={}, action) =>{
  switch (action.type) {
    case "GET_DATA_ONLOAD":
    return{
      ...state,
      serviceData:action.serviceData
    }
    default:
    return state;

  }
};

export default getDataOnLoad;
