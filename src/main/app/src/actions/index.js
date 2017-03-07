export const getDataOnStart =(data) => {
    return {
      type: 'GET_DATA_ONLOAD',
      serviceData : data
    }
}
