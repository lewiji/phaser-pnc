var boot = function (game) {

};

boot.prototype = {
	preload: function () {

	},
	create: function () {
		this.game.state.start("Preload");
		this.game.pncPlugin = this.game.plugins.add(Phaser.Plugin.PNCAdventure);
	}
}