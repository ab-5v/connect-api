module.exports = {
    read: function(data, end) {
        end(new Error('message'));
    }
};
