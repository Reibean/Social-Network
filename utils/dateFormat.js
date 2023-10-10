const moment = require('moment');

function dateformat(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = dateformat;