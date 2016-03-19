var pncgame = function (game) {

};

pncgame.prototype = {
	preload: function () {
		this.game.load.image('player', 'img/p1_front.png');
	},
	create: function () {
		var sceneDefinition = {
			bg: 'img/testbg.png',
			navmeshPoints: [{"x":212,"y":134},{"x":206,"y":206},{"x":158,"y":232},{"x":186,"y":258},{"x":253,"y":223},{"x":314,"y":238},{"x":311,"y":275},{"x":276,"y":281},{"x":292,"y":289},{"x":288,"y":303},{"x":318,"y":312},{"x":326,"y":299},{"x":374,"y":307},{"x":377,"y":328},{"x":432,"y":345},{"x":439,"y":324},{"x":459,"y":330},{"x":494,"y":313},{"x":479,"y":307},{"x":476,"y":288},{"x":524,"y":252},{"x":497,"y":246},{"x":472,"y":196},{"x":473,"y":184},{"x":390,"y":178},{"x":371,"y":192},{"x":347,"y":193},{"x":342,"y":178},{"x":350,"y":168},{"x":327,"y":168},{"x":311,"y":174},{"x":277,"y":163},{"x":256,"y":128}] 
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