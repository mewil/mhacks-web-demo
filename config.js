module.exports = {
    start_server: parseBool(process.env.START_SERVER, true),
    env: process.env.NODE_ENV || 'development',
    development: process.env.NODE_ENV !== 'production',
    production: process.env.NODE_ENV === 'production',
    server_port: process.env.PORT || 3000,
};

function parseBool(value, default_value) {
    if (typeof value === 'undefined') {
        return default_value;
    } else {
        return value === 'true';
    }
}
