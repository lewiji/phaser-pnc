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

[{"area":-5002.5,"_points":[{"x":160,"y":230,"type":25},{"x":190,"y":256,"type":25},{"x":319,"y":191,"type":25},{"x":274,"y":167,"type":25},{"x":210,"y":210,"type":25}],"closed":true,"type":12,"centroid":{"x":239.31564217891054,"y":211.1766116941529,"type":25},"connectedPolys":[1,6]},{"area":9805,"_points":[{"x":305,"y":190,"type":25},{"x":480,"y":227,"type":25},{"x":432,"y":280,"type":25},{"x":248,"y":217,"type":25}],"closed":true,"type":12,"centroid":{"x":371.9136834948156,"y":230.87846336902942,"type":25},"connectedPolys":[2,3,4,5]},{"area":4930,"_points":[{"x":428,"y":269,"type":25},{"x":383,"y":302,"type":25},{"x":295,"y":286,"type":25},{"x":335,"y":234,"type":25}],"closed":true,"type":12,"centroid":{"x":358.5473968897904,"y":271.33103448275864,"type":25},"connectedPolys":[4]},{"area":3645.5,"_points":[{"x":374,"y":212,"type":25},{"x":427,"y":172,"type":25},{"x":470,"y":175,"type":25},{"x":467,"y":191,"type":25},{"x":462,"y":235,"type":25}],"closed":true,"type":12,"centroid":{"x":432.10556393727427,"y":201.97124308508205,"type":25},"connectedPolys":[5]},{"area":-3151.5,"_points":[{"x":378,"y":292,"type":25},{"x":456,"y":320,"type":25},{"x":467,"y":279,"type":25},{"x":423,"y":254,"type":25}],"closed":true,"type":12,"centroid":{"x":428.78534031413614,"y":287.2373472949389,"type":25},"connectedPolys":[1,2,5]},{"area":-1426,"_points":[{"x":449,"y":221,"type":25},{"x":442,"y":278,"type":25},{"x":494,"y":262,"type":25}],"closed":true,"type":12,"centroid":{"x":461.6666666666667,"y":253.66666666666666,"type":25},"connectedPolys":[3]},{"area":3452,"_points":[{"x":216,"y":210,"type":25},{"x":215,"y":145,"type":25},{"x":270,"y":140,"type":25},{"x":273,"y":163,"type":25},{"x":291,"y":181,"type":25}],"closed":true,"type":12,"centroid":{"x":244.8729239088451,"y":171.5944380069525,"type":25},"connectedPolys":[0]}]
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