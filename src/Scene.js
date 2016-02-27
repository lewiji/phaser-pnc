/**
 * Scene object extends the Phaser.State object and represent a single scene in which the player can
 * move around and interact
 */
Phaser.Plugin.PNCAdventure.Scene = function () {

};

Phaser.Plugin.PNCAdventure.Scene.prototype = Object.create(Phaser.State.prototype);
Phaser.Plugin.PNCAdventure.Scene.prototype.constructor = Phaser.Plugin.PNCAdventure.Scene;

Phaser.Plugin.PNCAdventure.Scene.prototype.preload = function () {

};

Phaser.Plugin.PNCAdventure.Scene.prototype.create = function () {
	console.log('Scene initialised');
};