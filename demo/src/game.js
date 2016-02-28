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

[{"area":-2012,"_points":[{"x":164,"y":230,"type":25},{"x":186,"y":252,"type":25},{"x":251,"y":222,"type":25},{"x":205,"y":204,"type":25}],"closed":true,"type":12,"centroid":{"x":203.3772365805169,"y":226.97680583167661,"type":25}},{"area":2772,"_points":[{"x":202,"y":205,"type":25},{"x":309,"y":171,"type":25},{"x":314,"y":206,"type":25},{"x":253,"y":220,"type":25}],"closed":true,"type":12,"centroid":{"x":269.5151515151515,"y":198.79924242424244,"type":25}},{"area":-7530,"_points":[{"x":252,"y":219,"type":25},{"x":474,"y":288,"type":25},{"x":502,"y":253,"type":25},{"x":314,"y":206,"type":25}],"closed":true,"type":12,"centroid":{"x":390.3585657370518,"y":243.60876494023904,"type":25}},{"area":3573,"_points":[{"x":313,"y":203,"type":25},{"x":469,"y":193,"type":25},{"x":466,"y":239,"type":25}],"closed":true,"type":12,"centroid":{"x":416,"y":211.66666666666666,"type":25}},{"area":1064,"_points":[{"x":418,"y":191,"type":25},{"x":424,"y":166,"type":25},{"x":475,"y":172,"type":25},{"x":467,"y":189,"type":25}],"closed":true,"type":12,"centroid":{"x":444.5029761904762,"y":179.27678571428572,"type":25}},{"area":-5483.5,"_points":[{"x":324,"y":242,"type":25},{"x":316,"y":275,"type":25},{"x":298,"y":287,"type":25},{"x":450,"y":309,"type":25},{"x":471,"y":288,"type":25}],"closed":true,"type":12,"centroid":{"x":380.6730798455974,"y":279.97115589191816,"type":25}}]
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