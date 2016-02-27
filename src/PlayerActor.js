/**
 * PlayerActor object extends the Phaser.Sprite object and represents the player's character
 */
Phaser.Plugin.PNCAdventure.PlayerActor = function (game, actorDefinition) {
	Phaser.Plugin.PNCAdventure.Actor.call(this, game, actorDefinition);
	console.debug('PlayerActor initialised');
	this.initSignalListeners();
};

Phaser.Plugin.PNCAdventure.PlayerActor.prototype = Object.create(Phaser.Plugin.PNCAdventure.Actor.prototype);
Phaser.Plugin.PNCAdventure.PlayerActor.prototype.constructor = Phaser.Plugin.PNCAdventure.PlayerActor;

Phaser.Plugin.PNCAdventure.PlayerActor.prototype.initSignalListeners = function () {
	 this.game.pncPlugin.signals.sceneTappedSignal.add(function (pointer) {
	 	console.debug('Movement signal received');
	 	this.walkTo(pointer);
	 }, this);
};