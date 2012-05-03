module.exports = function(err, res, data) {
    var response = err ? {status: 'error', message: err.message} : {status: 'OK', result: data};

    res.end(JSON.stringify(response));
};
