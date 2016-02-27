/**
 * Room object extends the Phaser.State object and represent a single scene in which the player can
 * move around and interact
 */
Phaser.Plugin.PNCAdventure.Room = function () {

};

Phaser.Plugin.PNCAdventure.Room.prototype = Object.create(Phaser.State.prototype);
Phaser.Plugin.PNCAdventure.Room.prototype.constructor = Phaser.Plugin.PNCAdventure.Room;

Phaser.Plugin.PNCAdventure.Room.prototype.preload = function () {

};

Phaser.Plugin.PNCAdventure.Room.prototype.create = function () {
	console.log('Room initialised');

};