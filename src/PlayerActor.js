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
	 this.game.pncPlugin.signals.sceneTappedSignal.add(function (pointer, pathPolys, graph) {
	 	console.debug('Movement signal received');
	 	for (var i = 0; i < pathPolys.length; i++) {
	 		if (pathPolys[i].contains(pointer.x, pointer.y)) {
	 			this.targetPoly = i;
	 		}
	 		if (pathPolys[i].contains(this.x, this.y)) {
	 			this.actorPoly = i;
	 		}
	 	}

		// pathfind
		var path = this.game.pncPlugin.navGraph.findShortestPath(this.actorPoly, this.targetPoly);

		if (path) {
			if (path.length == 0) {
				this.walkTo(pointer, 50);
			} else {
				this.walkPath(path, pathPolys, pointer, 50);
			}
		}

		console.log(path);
	 	
	 }, this);
};