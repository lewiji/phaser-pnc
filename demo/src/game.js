var pncgame = function (game) {

};

pncgame.prototype = {
	preload: function () {
		this.game.load.image('player', 'img/p1_front.png');
	},
	create: function () {
		var sceneDefinition = {
			bg: 'img/testbg.png'
		};
		var room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true);
		var actor = this.game.pncPlugin.addActor(room, {
				x: 0,
				y: 0,
				image: 'player',
				type: Phaser.Plugin.PNCAdventure.PlayerActor
		});
		var actor2 = this.game.pncPlugin.addActor(room, {
				x: 100,
				y: 100,
				image: 'player'
		});
	}
}