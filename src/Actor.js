/**
 * Actor object extends the Phaser.Sprite object and represents a character
 */
Phaser.Plugin.PNCAdventure.Actor = function (game, actorDefinition) {
	if (actorDefinition === undefined) {
		actorDefinition = {
			x: 0,
			y: 0,
			image: '',
			frame: 0
		}
	}
	Phaser.Sprite.call(this, game, actorDefinition.x, actorDefinition.y, actorDefinition.image, actorDefinition.frame);
	console.log('Actor initialised');
};

Phaser.Plugin.PNCAdventure.Actor.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Plugin.PNCAdventure.Actor.prototype.constructor = Phaser.Plugin.PNCAdventure.Actor;