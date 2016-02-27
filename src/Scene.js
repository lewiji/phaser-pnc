/**
 * Scene object extends the Phaser.State object and represent a single scene in which the player can
 * move around and interact
 * @param {String} key - the name which refers to this scene
 * @param {Object} scenedefinition - object containing scene data
 */
Phaser.Plugin.PNCAdventure.Scene = function (key, sceneDefinition) {
	Phaser.State.call(this);
	this.key = key;
	this.sceneDefinition = sceneDefinition;
	this.preloadItems = [];
	this.actors = [];
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
	if (this.sceneDefinition.player) {
		this.game.load.image(this.sceneDefinition.player.image, this.sceneDefinition.player.image);
	}
};

Phaser.Plugin.PNCAdventure.Scene.prototype.create = function () {
	console.log('Scene initialised');
	this.createSceneHierarchy();
	if (this.sceneDefinition.bg) {
		this.initBackground();
	}
	if (this.actors.length > 0) {
		for (var i = 0; i < this.actors.length; i++) {
			this.addActorToScene(this.actors[i]);
		}
	}
};

Phaser.Plugin.PNCAdventure.Scene.prototype.createSceneHierarchy = function () {
	this.sceneGroup = this.game.add.group();

	this.layers = {};
	this.layers.background = this.game.add.group();
	this.layers.actors = this.game.add.group();

	this.sceneGroup.add(this.layers.background);
	this.sceneGroup.add(this.layers.actors);
};

/**
 * initBackground - create the background sprite
 */
Phaser.Plugin.PNCAdventure.Scene.prototype.initBackground = function () {
	this.background = this.game.add.sprite(0, 0, this.key + 'bg');
	this.layers.background.add(this.background);
	this.background.inputEnabled = true;
	this.background.events.onInputUp.add(function (sprite, pointer) {
		this.game.pncPlugin.playerMovementSignal.dispatch(pointer);
	}, this);
};

Phaser.Plugin.PNCAdventure.Scene.prototype.initActor = function (actorDefinition) {
	// if this state is not active defer actor creation until it is
	if (this.state === undefined) {
		this.actors.push(actorDefinition);
	} else {
		this.addActorToScene(actorDefinition);
	}
	
};

Phaser.Plugin.PNCAdventure.Scene.prototype.addActorToScene = function (actorDefinition) {
	if (actorDefinition.type === undefined) {
		this.layers.actors.add(new Phaser.Plugin.PNCAdventure.Actor(this.game, actorDefinition));
	} else {
		this.layers.actors.add(new actorDefinition.type(this.game, actorDefinition));
	}
	
};

