var pncgame = function (game) {

};

pncgame.prototype = {
	preload: function () {
		this.game.load.atlasJSONArray('bernard', 'img/bernard-0.png', 'img/bernard.json');
	},
	create: function () {
		var sceneDefinition = {
			bg: 'img/testbg.png',
			navmeshPoints: [{"x":224,"y":144},{"x":218,"y":216},{"x":170,"y":239},{"x":181,"y":248},{"x":236,"y":225},{"x":259,"y":209},{"x":335,"y":232},{"x":325,"y":272},{"x":304,"y":289},{"x":305,"y":300},{"x":339,"y":292},{"x":392,"y":292},{"x":399,"y":332},{"x":431,"y":306},{"x":462,"y":313},{"x":455,"y":279},{"x":490,"y":259},{"x":466,"y":240},{"x":458,"y":210},{"x":449,"y":197},{"x":420,"y":194},{"x":390,"y":203},{"x":344,"y":203},{"x":322,"y":187},{"x":294,"y":185},{"x":249,"y":137}]
		};
		// creates a scene and immediately switches to it
		var room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true);

		// adds actor using PlayerActor prototype which adds listeners for movement input
		var actor = this.game.pncPlugin.addActor(room, {
				x: 250,
				y: 170,
				image: 'bernard',
				animations: {
					idle: Phaser.Animation.generateFrameNames('bernard', 1, 1, '.png', 2),
					walk: Phaser.Animation.generateFrameNames('bernard', 8, 13, '.png', 2)
				},
				type: Phaser.Plugin.PNCAdventure.PlayerActor
		});
	}
};