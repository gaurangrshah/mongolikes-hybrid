const getError = (err) =>
  err?.response?.data?.message
    ? err.response.data.message.toString()
    : err.message.toString();

const onError = async (err, req, res, next) => {
  res.status(500).send({ message: getError(err) });
};
export { getError, onError };
