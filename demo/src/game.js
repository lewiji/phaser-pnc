var pncgame = function (game) {

};

pncgame.prototype = {
	preload: function () {

	},
	create: function () {
		var room = this.game.pncPlugin.addScene('lobby', true);
	}
}