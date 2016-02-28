Phaser.Plugin.PNCAdventure.DebugNavmesh = function (game) {
	this.game = game;
	this.initPoints();
	this.initGraphics();
	this.elOutput = document.getElementById('navmeshDebug');
	this.welcomeString = "Navmesh tool JSON Output\nPress D to enable navmesh drawing\nClick to set points to define navmesh area\nPress Enter/Return to create poly\nPress Z to undo last action\nPaste JSON Poly data into this box to load into the current scene.\nMultiple polys can be drawn, all JSON outputted below\n\n\n";
	if (!this.elOutput) {
		this.elOutput = document.createElement('textarea');
		this.elOutput.cols = '80';
		this.elOutput.rows = '40';
		this.elOutput.id = 'navmeshDebug';
		this.elOutput.value = this.welcomeString;
		document.body.appendChild(this.elOutput);
		this.elUpdateButton = document.createElement('button');
		document.body.appendChild(this.elUpdateButton);
		this.elUpdateButton.addEventListener('click', this.loadJSONPolyDataFromElement.bind(this));
	}
	this.toggleKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.toggleKey.onDown.add(Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.toggleTool, this);
	this.game.pncPlugin.signals.navMeshUpdatedSignal = new Phaser.Signal();
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

		this.undoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.undoKey.onDown.add(Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.undo, this);
	},
	loadJSONPolyData: function (data) {
		this.finishedPolys = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i]._points) {
				data[i].points = data[i]._points;
				data[i]._points = null;
			}
			this.finishedPolys.push(new Phaser.Polygon(data[i].points))
		}
		if (!data.length && data[0].points) {
			return;
		}
		
		this.drawFinishedPolys();
	},
	loadJSONPolyDataFromElement: function () {
		this.loadJSONPolyData(this.elOutput.value);
	},
	removeSignals: function () {
		this.confirmKey.onDown.remove(Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.createPoly, this);
		this.undoKey.onDown.remove(Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.undo, this);

		this.game.pncPlugin.signals.sceneTappedSignal.remove(
			Phaser.Plugin.PNCAdventure.DebugNavmesh.prototype.drawPoint,
			this, 5000
		);
	},
	toggleTool: function () {
		if (this.enabled) {
			this.removeSignals();
			Phaser.Plugin.PNCAdventure.debugMode = false;
			this.enabled = false;
			this.graphics.alpha = 0.3;
		} else {
			this.initSignals();
			Phaser.Plugin.PNCAdventure.debugMode = true;
			this.enabled = true;
			this.graphics.visible = true;
			this.graphics.alpha = 1;
			this.drawFinishedPolys();
			this.drawCurrentPoints();
		}
		
	},
	undo: function () {
		if (this.currentPoints.length > 0) {
			this.currentPoints.pop();
		} else {
			this.finishedPolys.pop();
		}
		this.graphics.clear();
		this.drawFinishedPolys();
		this.drawCurrentPoints();
	},
	initPoints: function () {
		this.currentPoints = [];
		this.finishedPolys = [];
	},
	initGraphics: function () {
		this.graphics = this.game.add.graphics(0, 0);
		this.graphics.alpha = 0.3;
	},
	drawPoint: function (e) {
		// prevent onInputUp signal propogation
		this.game.pncPlugin.signals.sceneTappedSignal.halt();
		console.debug('Draw point');
		this.currentPoints.push({x: e.x, y: e.y});
		this.drawFinishedPolys();
		this.drawCurrentPoints();
	},
	drawCurrentPoints: function () {
		for (var i = 0; i < this.currentPoints.length; i++) {
			this.graphics.beginFill(0xFF00FF);
			this.graphics.drawCircle(this.currentPoints[i].x, this.currentPoints[i].y, 10);
			this.graphics.endFill();
		}
		
	},
	clearPoints: function () {
		this.graphics.clear();
		this.currentPoints = [];
	},
	createPoly: function () {
		if (this.currentPoints.length < 3) {
			console.warn('Not enough points to draw poly');
			return;
		}	

		var poly = new Phaser.Polygon();
		poly.setTo(this.currentPoints);

		this.finishedPolys.push(poly);	

		this.clearPoints();
		this.drawFinishedPolys();

		this.game.pncPlugin.signals.navMeshUpdatedSignal.dispatch(this.finishedPolys);
	},
	drawFinishedPolys: function () {
		for (var i = 0; i < this.finishedPolys.length; i++) {
			this.graphics.beginFill(0x0000FF + (0x100000 * i) - (0x001000 * i));
			this.graphics.drawPolygon(this.finishedPolys[i].points);
			this.graphics.endFill();
		}
		this.elOutput.value = this.welcomeString + JSON.stringify(this.finishedPolys);
	}
};