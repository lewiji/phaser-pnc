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
		};
	}
	Phaser.Sprite.call(this, game, actorDefinition.x, actorDefinition.y, actorDefinition.image, actorDefinition.frame);
	this.anchor.setTo(0.5, 0.9);

	this.walkSpeed = 50;
	this.averageWalkSpeed = 100;

	console.debug('Actor initialised');
};

Phaser.Plugin.PNCAdventure.Actor.prototype = Object.create(Phaser.Sprite.prototype);

Phaser.Plugin.PNCAdventure.Actor.prototype.constructor = Phaser.Plugin.PNCAdventure.Actor;
Phaser.Plugin.PNCAdventure.Actor.prototype.walkTo = function (point, walkSpeed) {
	if (!walkSpeed) {
		walkSpeed = this.walkSpeed;
	}
	if (this.walkingTween) {
		this.walkingTween.stop();
	}
	var distance = Phaser.Math.distance(this.x, this.y, point.x, point.y);
	this.walkingTween = this.game.add.tween(this).to(
		{
			x: point.x,
			y: point.y
		}, 
		(distance * this.averageWalkSpeed) * (1 / walkSpeed)
	).start();
}