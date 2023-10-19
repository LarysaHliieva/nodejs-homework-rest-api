const messageList = {
  404: "Not Found",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
