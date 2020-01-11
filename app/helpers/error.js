exports.throwError = (status, err) => {
    const error = new Error(err);
    error.statusCode = status;
    throw error;
};

exports.throwErrorValidation = (status, err) => {
    throw {status, err};
};
