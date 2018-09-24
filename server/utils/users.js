class Users {
    constructor () {
        this.users=[];
    }
    // add user (id, name, room)
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    // remove user (id)
    removeUser(id) {
        var userToGetRidOf = this.getUser(id);

        if (userToGetRidOf) {
            this.users = this.users.filter( (user) => user.id!== id);
        }

        return userToGetRidOf;
    }

    // fetch a user (id)
    getUser(id) {
        return this.users.filter( (user) => user.id == id)[0];
    }
    
    // get user list (room)
    getUserList(room) {
        var usersInRoom = this.users.filter( (user) => user.room === room );
        var namesArray = usersInRoom.map( (el) => el.name );

        return namesArray;
    }
}


module.exports = {Users};

// create a ES6 class
/*
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    getUserDescription () {
        return `${this.name} is ${this.age} years old.`;
    }
}

var me = new Person('Richard', 48);
console.log(me.getUserDescription());
*/