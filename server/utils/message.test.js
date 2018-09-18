const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'text in chat';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('text', text);
        });
    });

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var lat = 1;
        var long = 1;
        var locationMessage = generateLocationMessage(from, lat, long);
        
        expect(typeof locationMessage.createdAt).toBe('number');
        expect (locationMessage).toHaveProperty('url', `https://www.google.com/maps?q=${lat}, ${long}`);
        expect(locationMessage).toHaveProperty('from', from);
    });
})