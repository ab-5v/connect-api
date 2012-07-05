module.exports = {
    create: function(params, end) {
        end(null, params);
    },
    read: function(params, end) {
        end(null, [1, 2, 3, 4]);
    },
    update: function(params, end) {
        end(null, {ex: 1});
    },
    destroy: function(params, end) {
        end(null, 1);
    }
};
