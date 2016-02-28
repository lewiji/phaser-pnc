var pncgame = function (game) {

};

pncgame.prototype = {
	preload: function () {
		this.game.load.image('player', 'img/p1_front.png');
	},
	create: function () {
		var sceneDefinition = {
			bg: 'img/testbg.png',
			pathPolys: 
[{"area":-27737,"_points":null,"closed":true,"type":12,"points":[{"x":166,"y":229,"type":25},{"x":187,"y":249,"type":25},{"x":249,"y":222,"type":25},{"x":319,"y":238,"type":25},{"x":319,"y":262,"type":25},{"x":305,"y":283,"type":25},{"x":340,"y":298,"type":25},{"x":387,"y":304,"type":25},{"x":389,"y":323,"type":25},{"x":430,"y":333,"type":25},{"x":450,"y":318,"type":25},{"x":486,"y":313,"type":25},{"x":469,"y":289,"type":25},{"x":498,"y":263,"type":25},{"x":518,"y":245,"type":25},{"x":476,"y":237,"type":25},{"x":470,"y":205,"type":25},{"x":464,"y":183,"type":25},{"x":462,"y":176,"type":25},{"x":412,"y":164,"type":25},{"x":394,"y":164,"type":25},{"x":380,"y":176,"type":25},{"x":354,"y":193,"type":25},{"x":338,"y":180,"type":25},{"x":328,"y":171,"type":25},{"x":302,"y":180,"type":25},{"x":275,"y":185,"type":25}]},{"area":13613,"_points":[{"x":522,"y":250,"type":25},{"x":474,"y":284,"type":25},{"x":542,"y":327,"type":25},{"x":563,"y":328,"type":25},{"x":599,"y":277,"type":25},{"x":656,"y":278,"type":25},{"x":720,"y":279,"type":25},{"x":669,"y":294,"type":25},{"x":637,"y":297,"type":25},{"x":608,"y":285,"type":25},{"x":596,"y":318,"type":25},{"x":614,"y":353,"type":25},{"x":650,"y":372,"type":25},{"x":658,"y":397,"type":25},{"x":613,"y":428,"type":25},{"x":589,"y":398,"type":25},{"x":547,"y":397,"type":25},{"x":502,"y":372,"type":25},{"x":499,"y":340,"type":25},{"x":453,"y":323,"type":25}],"closed":true,"type":12}]
		};
		// creates a scene and immediately switches to it
		var room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true);

		// adds actor using PlayerActor prototype which adds listeners for movement input
		var actor = this.game.pncPlugin.addActor(room, {
				x: 250,
				y: 150,
				image: 'player',
				type: Phaser.Plugin.PNCAdventure.PlayerActor
		});

		// adds static NPC character
		var actor2 = this.game.pncPlugin.addActor(room, {
				x: 100,
				y: 100,
				image: 'player'
		});
	}
}