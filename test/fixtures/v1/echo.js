module.exports = {
    create: function(params, end) {
        params.echo = 'yes';
        end(null, params);
    },
    read: function(params, end) {
        params.echo = 'yes';
        end(null, params);
    },
    update: function(params, end) {
        params.echo = 'yes';
        end(null, params);
    },
    destroy: function(params, end) {
        params.echo = 'yes';
        end(null, params);
    },
    custom: function(params, end) {
        params.echo = 'yes';
        end(null, params);
    }
};

