/* Keeps track of all info relevant to a particular session!
 * Author: Brifactor
 */

//Includes
const math = require('mathjs');
var __ = require('private-parts').createKey(); //Makes attributes private
const coord = require('./HexCoord.js');
var save = require('../save.json'); //Save file

class Session {
    constructor (starting_user) {
        __(this).users = [starting_user];
        __(this).season = save.season;
        __(this).coord = new coord.HexCoord(save.basex, save.basey, save.basez);
        __(this).facing = 0;
        //Add rations remaining later.

        __(this).time = new Date();
        __(this).time.setHours(8); //Start at 8 AM
        __(this).time.setMinutes(0);
    }

    hasUser(user) {
        var have = false;
        __(this).users.forEach(function(item, index, array) {
            if(item === user) {
                have = true;
            }
        });
        return have;
    }

    getUsers() {
        return __(this).users;
    }

    addUser(new_user) {
        if (this.hasUser(new_user) === false) {
            __(this).users.push(new_user);
        }
    }

    removeUser(to_remove) {
        __(this).users.forEach(function (item, index, array) {
            if (item === to_remove) {
                array.splice(index, 1);
            }
        });

    }

    numUsers() {
        return __(this).users.length;
    }

    getSeason() {
        return __(this).season;
    }

    setSeason(new_season) {
        __(this).season = new_season;
    }

    getPos() {
        return __(this).coord;
    }

    setPos(new_pos) {
        __(this).coord = new_pos;
    }

    getFacing() {
        return __(this).facing;
    }

    setFacing(new_facing) {
        __(this).facing = new_facing;
    }

    getHour() {
        return __(this).time.getHours();
    }

    setHour(new_hour) {
        __(this).time.setHours(new_hour);
    }

    getMinute() {
        return __(this).time.getMinutes();
    }

    setMinute(new_minute) {
        __(this).time.setMinutes(new_minute);
    }

    passMinutes(mins_passed) {
        var time = __(this).time;
        var new_mins = mins_passed + time.getMinutes();
        var new_hours = math.round(new_mins / 60) + time.getHours();
        new_mins = new_mins % 60;

        __(this).time.setHours(new_hours, new_mins, 0);
    }

}

exports.Session = Session;
