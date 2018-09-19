
const dayjs = require('dayjs');

var generateMessage = (from, text) => {
    return { 
        from: from,
        text: text,
        createdAt: dayjs()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude}, ${longitude}`,
        createdAt: dayjs()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};