Phaser.Plugin.PNCAdventure.DebugNavmesh = function (game) {
	this.game = game;
	this.initSignals();
	this.initPoints();
	this.initGraphics();
	this.elOutput = document.getElementById('navmeshDebug');
	if (!this.elOutput) {
		this.elOutput = document.createElement('textarea');
		this.elOutput.cols = '80';
		this.elOutput.rows = '40';
		this.elOutput.id = 'navmeshDebug';
		this.elOutput.style.display = 'none';
		document.body.appendChild(this.elOutput);
	}
};

Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype = {
	constructor: Phaser.Plugin.PNCAdventure.DebugNavmesh,
	initSignals: function () {
		this.game.pncPlugin.signals.sceneTappedSignal.add(
			Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.drawPoint,
			this, 5000
		);

		this.confirmKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.confirmKey.onDown.add(Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.createPoly, this);

		this.toggleKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.toggleKey.onDown.add(Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.toggleTool, this);
	},
	toggleTool: function () {
		if (this.enabled) {
			this.enabled = false;
			this.graphics.visible = false;
			this.elOutput.style.display = 'none';
		} else {
			this.enabled = true;
			this.graphics.visible = true;
			this.elOutput.style.display = 'block';
		}
		
	},
	initPoints: function () {
		this.currentPoints = [];
		this.finishedPolys = [];
	},
	initGraphics: function () {
		this.graphics = this.game.add.graphics(0, 0);
	},
	drawPoint: function (e) {
		if (!this.enabled) {
			return;
		}
		// prevent onInputUp signal propogation
		this.game.pncPlugin.signals.sceneTappedSignal.halt();
		console.debug('Draw point');
		this.graphics.beginFill(0xFF00FF);
		this.graphics.drawCircle(e.x, e.y, 10);
		this.graphics.endFill();
		this.currentPoints.push({x: e.x, y: e.y});
	},
	clearPoints: function () {
		this.graphics.clear();
		this.currentPoints = [];
	},
	createPoly: function () {
		if (!this.enabled) {
			return;
		}
		if (this.currentPoints.length < 3) {
			console.warn('Not enough points to draw poly');
			return;
		}	

		var poly = new Phaser.Polygon();
		poly.setTo(this.currentPoints);

		this.finishedPolys.push(poly);	

		this.clearPoints();
		this.drawFinishedPolys();
	},
	drawFinishedPolys: function () {
		for (var i = 0; i < this.finishedPolys.length; i++) {
			this.graphics.beginFill(0x0000FF + (0x100000 * i) - (0x001000 * i));
			this.graphics.drawPolygon(this.finishedPolys[i].points);
			this.graphics.endFill();
		}
		this.elOutput.value = JSON.stringify(this.finishedPolys);
	}
};