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

[{"area":-3313.5,"_points":[{"x":213,"y":156,"type":25},{"x":206,"y":208,"type":25},{"x":307,"y":174,"type":25},{"x":277,"y":163,"type":25},{"x":254,"y":143,"type":25}],"closed":true,"type":12,"centroid":{"x":244.7773250842513,"y":173.9375282933454,"type":25},"connectedPolys":[]},{"area":3768,"_points":[{"x":327,"y":197,"type":25},{"x":227,"y":238,"type":25},{"x":205,"y":207,"type":25},{"x":303,"y":170,"type":25}],"closed":true,"type":12,"centroid":{"x":264.880042462845,"y":203.37048832271762,"type":25},"connectedPolys":[0,2,3]},{"area":1599,"_points":[{"x":227,"y":233,"type":25},{"x":184,"y":255,"type":25},{"x":158,"y":227,"type":25},{"x":211,"y":211,"type":25}],"closed":true,"type":12,"centroid":{"x":193.66854283927455,"y":231.81175734834272,"type":25},"connectedPolys":[]},{"area":-3299,"_points":[{"x":259,"y":221,"type":25},{"x":317,"y":241,"type":25},{"x":382,"y":192,"type":25},{"x":327,"y":185,"type":25}],"closed":true,"type":12,"centroid":{"x":320.5741133676872,"y":211.05163180761846,"type":25},"connectedPolys":[1,4]},{"area":-9049.5,"_points":[{"x":312,"y":234,"type":25},{"x":456,"y":292,"type":25},{"x":507,"y":255,"type":25},{"x":380,"y":191,"type":25}],"closed":true,"type":12,"centroid":{"x":411.26465550582907,"y":242.07978341344827,"type":25},"connectedPolys":[5,6]},{"area":3857,"_points":[{"x":394,"y":196,"type":25},{"x":397,"y":164,"type":25},{"x":471,"y":173,"type":25},{"x":469,"y":193,"type":25},{"x":469,"y":244,"type":25}],"closed":true,"type":12,"centroid":{"x":436.8847117794486,"y":196.06723705816265,"type":25},"connectedPolys":[]},{"area":-5260,"_points":[{"x":329,"y":234,"type":25},{"x":316,"y":269,"type":25},{"x":457,"y":318,"type":25},{"x":458,"y":280,"type":25}],"closed":true,"type":12,"centroid":{"x":389.5961977186312,"y":275.3912547528517,"type":25},"connectedPolys":[4,7,8]},{"area":-1870,"_points":[{"x":325,"y":265,"type":25},{"x":293,"y":280,"type":25},{"x":381,"y":299,"type":25},{"x":375,"y":263,"type":25}],"closed":true,"type":12,"centroid":{"x":346.2427807486631,"y":278.58787878787876,"type":25},"connectedPolys":[]},{"area":-1656,"_points":[{"x":397,"y":286,"type":25},{"x":387,"y":324,"type":25},{"x":431,"y":334,"type":25},{"x":439,"y":300,"type":25}],"closed":true,"type":12,"centroid":{"x":413.0595813204509,"y":310.94685990338166,"type":25},"connectedPolys":[]}]
		};
		// creates a scene and immediately switches to it
		var room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true);

		// adds actor using PlayerActor prototype which adds listeners for movement input
		var actor = this.game.pncPlugin.addActor(room, {
				x: 250,
				y: 170,
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