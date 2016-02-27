var pncgame = function (game) {

};

pncgame.prototype = {
	preload: function () {

	},
	create: function () {
		var sceneDefinition = {
			bg: 'img/testbg.png'
		};
		var room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true);
	}
}