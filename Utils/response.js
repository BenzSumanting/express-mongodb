exports.responseError = (res, statusCode, message) => {
    res.status(statusCode).json({ success: false, message: message });
}

exports.ResponseSuccess = (res, statusCode, data=[],  message=null) => {
    res.status(statusCode).json({ success: true, data: data, message: message });
};