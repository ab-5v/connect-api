module.exports = {
    index: function(params, end) {
        end(null, 'index');
    },
    bar: function(params, end, data, req, res) {
        end(null, 'success');
    }
}
