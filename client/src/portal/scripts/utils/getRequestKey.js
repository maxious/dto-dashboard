const getRequestKey = reducerName => (type, id) => {
  if (!id) {
    return `${reducerName}/${type}`
  }
  return `${reducerName}/${type}/${id}`
};

export default getRequestKey;
