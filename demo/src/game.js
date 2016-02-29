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

			[{"area":-3652,"_points":[{"x":212,"y":149,"type":25},{"x":208,"y":205,"type":25},{"x":299,"y":175,"type":25},{"x":248,"y":133,"type":25}],"closed":true,"type":12,"centroid":{"x":243.91639284410368,"y":168.6838262139467,"type":25},"connectedPolys":[1,2]},{"area":-2748,"_points":[{"x":162,"y":231,"type":25},{"x":190,"y":253,"type":25},{"x":253,"y":223,"type":25},{"x":231,"y":189,"type":25}],"closed":true,"type":12,"centroid":{"x":209.79803493449782,"y":222.97379912663754,"type":25},"connectedPolys":[0,2]},{"area":-2887.5,"_points":[{"x":223,"y":190,"type":25},{"x":245,"y":219,"type":25},{"x":328,"y":190,"type":25},{"x":276,"y":164,"type":25}],"closed":true,"type":12,"centroid":{"x":270.2181818181818,"y":191,"type":25},"connectedPolys":[1,3]},{"area":-3650.5,"_points":[{"x":253,"y":208,"type":25},{"x":323,"y":239,"type":25},{"x":396,"y":200,"type":25},{"x":322,"y":188,"type":25}],"closed":true,"type":12,"centroid":{"x":323.8946263068986,"y":210.29260831849518,"type":25},"connectedPolys":[2,4,5,6]},{"area":2330,"_points":[{"x":365,"y":197,"type":25},{"x":408,"y":180,"type":25},{"x":469,"y":187,"type":25},{"x":458,"y":220,"type":25}],"closed":true,"type":12,"centroid":{"x":425.88125894134475,"y":197.5050071530758,"type":25},"connectedPolys":[3,5]},{"area":-5212.5,"_points":[{"x":318,"y":233,"type":25},{"x":385,"y":273,"type":25},{"x":453,"y":213,"type":25},{"x":397,"y":194,"type":25}],"closed":true,"type":12,"centroid":{"x":386.747242206235,"y":230.3584332533973,"type":25},"connectedPolys":[3,6,7,8,13]},{"area":-3898,"_points":[{"x":320,"y":230,"type":25},{"x":315,"y":272,"type":25},{"x":292,"y":280,"type":25},{"x":328,"y":298,"type":25},{"x":381,"y":299,"type":25},{"x":383,"y":255,"type":25}],"closed":true,"type":12,"centroid":{"x":344.90721737643236,"y":270.38823328202494,"type":25},"connectedPolys":[3,7,8]},{"area":-2980,"_points":[{"x":373,"y":295,"type":25},{"x":404,"y":304,"type":25},{"x":453,"y":259,"type":25},{"x":434,"y":216,"type":25}],"closed":true,"type":12,"centroid":{"x":416.91946308724835,"y":265.7029082774049,"type":25},"connectedPolys":[8,9,11,12,13]},{"area":1001.5,"_points":[{"x":396,"y":288,"type":25},{"x":361,"y":277,"type":25},{"x":371,"y":254,"type":25},{"x":403,"y":254,"type":25}],"closed":true,"type":12,"centroid":{"x":383.6045931103345,"y":268.8355799633882,"type":25},"connectedPolys":[5,6]},{"area":-1491.5,"_points":[{"x":382,"y":293,"type":25},{"x":382,"y":327,"type":25},{"x":431,"y":340,"type":25},{"x":434,"y":316,"type":25}],"closed":true,"type":12,"centroid":{"x":405.9860319588781,"y":318.38115990613477,"type":25},"connectedPolys":[7,11,14]},{"area":-1109,"_points":[{"x":460,"y":325,"type":25},{"x":488,"y":313,"type":25},{"x":467,"y":288,"type":25},{"x":429,"y":308,"type":25}],"closed":true,"type":12,"centroid":{"x":460.44123835287047,"y":307.71535918244666,"type":25},"connectedPolys":[11,12,14]},{"area":-2085.5,"_points":[{"x":427,"y":318,"type":25},{"x":465,"y":294,"type":25},{"x":436,"y":253,"type":25},{"x":400,"y":300,"type":25}],"closed":true,"type":12,"centroid":{"x":432.70862303204666,"y":289.2525373611444,"type":25},"connectedPolys":[10,14]},{"area":-2031,"_points":[{"x":463,"y":296,"type":25},{"x":517,"y":253,"type":25},{"x":495,"y":242,"type":25},{"x":440,"y":256,"type":25}],"closed":true,"type":12,"centroid":{"x":475.73083866732316,"y":264.2875430822255,"type":25},"connectedPolys":[7,10,11,13]},{"area":2751,"_points":[{"x":445,"y":260,"type":25},{"x":427,"y":220,"type":25},{"x":468,"y":194,"type":25},{"x":502,"y":244,"type":25}],"closed":true,"type":12,"centroid":{"x":462.08833151581246,"y":229.6015994183933,"type":25},"connectedPolys":[4,5,7,12]},{"area":-525.5,"_points":[{"x":427,"y":336,"type":25},{"x":435,"y":323,"type":25},{"x":458,"y":321,"type":25},{"x":437,"y":302,"type":25},{"x":422,"y":310,"type":25}],"closed":true,"type":12,"centroid":{"x":435.93656834760543,"y":316.28163653663177,"type":25},"connectedPolys":[9,10,11]}]
					
			
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
	}
};