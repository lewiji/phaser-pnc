/**
 * Scene object extends the Phaser.State object and represent a single scene in which the player can
 * move around and interact
 * @param {String} key - the name which refers to this scene
 * @param {Object} scenedefinition - object containing scene data
 */
Phaser.Plugin.PNCAdventure.Scene = function (key, sceneDefinition) {
	this.key = key;
	this.sceneDefinition = sceneDefinition;
	this.preloadItems = [];
};

Phaser.Plugin.PNCAdventure.Scene.prototype = Object.create(Phaser.State.prototype);
Phaser.Plugin.PNCAdventure.Scene.prototype.constructor = Phaser.Plugin.PNCAdventure.Scene;

Phaser.Plugin.PNCAdventure.Scene.prototype.preload = function () {
	/*
	Hacky implementation for now - need to standardise scenedef and process this separately
	 */
	if (this.sceneDefinition.bg) {
		this.game.load.image(this.key + 'bg', this.sceneDefinition.bg);
	}
};

Phaser.Plugin.PNCAdventure.Scene.prototype.create = function () {
	console.log('Scene initialised');
	if (this.sceneDefinition.bg) {
		this.initBackground();
	}
};

/**
 * initBackground - create the background sprite
 */
Phaser.Plugin.PNCAdventure.Scene.prototype.initBackground = function () {
	this.game.add.sprite(0, 0, this.key + 'bg');
};