/**
 * Created by xieyicheng on 2014/10/15.
 */
module.exports = {
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"news-session",
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    autoReconnect: true,// Whether or not to re-establish a database connection after a disconnect.
    reconnectDelay: [
        500,// Time between each attempt in the first group of reconnection attempts; milliseconds.
        1000,// Time between each attempt in the second group of reconnection attempts; milliseconds.
        5000,// Time between each attempt in the third group of reconnection attempts; milliseconds.
        30000,// Time between each attempt in the fourth group of reconnection attempts; milliseconds.
        300000// Time between each attempt in the fifth group of reconnection attempts; milliseconds.
    ],
    reconnectDelayGroupSize: 5,// Number of reconnection attempts per reconnect delay value.
    maxReconnectAttempts: 25,// Maximum number of reconnection attempts. Set to 0 for unlimited.
    useConnectionPooling: false,// Whether or not to use connection pooling.
    keepAlive: true,// Whether or not to send keep-alive pings on the database connection.
    keepAliveInterval: 30000
}