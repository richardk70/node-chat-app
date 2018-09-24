const expect = require('expect');

var {User} = require('./users');

describe('User', () => {

    var users;
    beforeEach( () => {
        users = new User();
        users.users = [{
            id: 1,
            name: 'Dick',
            room: 'Marketing'
        }, {
            id: 2,
            name: 'Johnny',
            room: 'Marketing'
        }, {
            id: 3,
            name: 'Melanie',
            room: 'Sales'
        }];
    });
    it('should generate a user object', () => {
        var users = new User();
        var sampleUser = {
            id: '01234',
            name: 'Dick',
            room: 'Marketing'
        };
        var result = users.addUser(sampleUser.id, sampleUser.name, sampleUser.room);

        expect(result).toHaveProperty('id', sampleUser.id); 
        expect(result).toHaveProperty('name', sampleUser.name); 
        expect(result).toHaveProperty('room', sampleUser.room); 
        expect(users.users).toEqual([sampleUser]);
    });
    it('should return names for Marketing room', () => {
        var results = users.getUserList('Marketing');

        expect(results).toHaveLength(2);
        expect(results).toEqual(['Dick', 'Johnny']);
    });
    it('should remove a user', () => {
        var idToRemove = 1;
        var removedUser = users.removeUser(users.users[idToRemove].id);
        expect(removedUser.id).toEqual(idToRemove);
    });
    it('should NOT remove a user!', () => {
        // pass in invalid ID
        var idToRemove = 5;
        var removedUser = users.removeUser(users.users[idToRemove].id);
        expect(removedUser).toBeFalsy();        
    });
    it('should retrieve a user ID', () => {
        var idToFetch = 2;
        var desiredUser = users.getUser(idToFetch - 1);
        expect(desiredUser).toEqual(1);

    });
    it('should NOT retrieve a user ID', () => {
        // pass in invalid ID
        var idToFetch = 5;
        var desiredUser = users.getUser(idToFetch - 1);
        expect(desiredUser).toBeFalsy();

    });
});