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
			var poly = new Phaser.Polygon(data[i].points);
			poly.centroid = data[i].centroid;
			this.finishedPolys.push(poly);
		}
		if (!data.length && data[0].points) {
			return;
		}
		
		this.drawDebugLayer();
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
			this.graphics.alpha = 0.1;
		} else {
			this.initSignals();
			Phaser.Plugin.PNCAdventure.debugMode = true;
			this.enabled = true;
			this.graphics.visible = true;
			this.graphics.alpha = 1;
			this.drawDebugLayer();
		}
		
	},
	undo: function () {
		if (this.currentPoints.length > 0) {
			this.currentPoints.pop();
		} else {
			this.finishedPolys.pop();
		}
		this.graphics.clear();
		this.drawDebugLayer();
	},
	initPoints: function () {
		this.currentPoints = [];
		this.finishedPolys = [];
	},
	initGraphics: function () {
		this.graphics = this.game.add.graphics(0, 0);
		this.graphics.alpha = 0.1;
	},
	drawPoint: function (e) {
		// prevent onInputUp signal propogation
		this.game.pncPlugin.signals.sceneTappedSignal.halt();
		console.debug('Draw point');
		this.currentPoints.push({x: e.x, y: e.y});
		this.drawDebugLayer();
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
		poly.centroid = this.getPolygonCentroid(poly);

		this.finishedPolys.push(poly);	

		this.clearPoints();
		this.drawDebugLayer();

		this.game.pncPlugin.signals.navMeshUpdatedSignal.dispatch(this.finishedPolys);
	},
	getPolygonCentroid: function(poly) {
		var x = 0,
	        y = 0,
	        i,
	        j,
	        f,
	        point1,
	        point2;

	    var points = poly._points;

	    for (i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
	        point1 = points[i];
	        point2 = points[j];
	        f = point1.x * point2.y - point2.x * point1.y;
	        x += (point1.x + point2.x) * f;
	        y += (point1.y + point2.y) * f;
	    }

	    f = poly.area * 6;

	    return new Phaser.Point(Math.abs(x / f), Math.abs(y / f));
	},
	/**
	 * Calculate graph of centre points of all polys. INEFFICIENT NEEDS SOME WIZARDRY
	 * @return {[type]} [description]
	 */
	graphCentroids: function () {
		this.map = {};

		for (var i = 0; i < this.finishedPolys.length; i++) {
			var thisPoly = this.finishedPolys[i];
			thisPoly.connectedPolys = [];
			if (this.map[i] === undefined) { this.map[i] = {}; }
			for (var j = 0; j < this.finishedPolys.length; j++) {
				if (i !== j) {
					var testPoly = this.finishedPolys[j];
					var intersects = this.testPolyPointIntersection(thisPoly, testPoly);
					if (intersects) {
						if (this.map[j] === undefined) { this.map[j] = {}; }
						thisPoly.connectedPolys.push(j);
						this.map[i][j] = Phaser.Math.distance(thisPoly.centroid.x, thisPoly.centroid.y, testPoly.centroid.x, testPoly.centroid.y);
						this.map[j][i] = Phaser.Math.distance(thisPoly.centroid.x, thisPoly.centroid.y, testPoly.centroid.x, testPoly.centroid.y);
					}
				}
			}
		}
		console.log(this.map);
		this.graph = new Graph(this.map);
		this.game.pncPlugin.signals.navGraphUpdated.dispatch(this.graph);
	},
	testPolyPointIntersection: function (poly1, poly2) {
		for (var i = 0; i < poly2.points.length; i++) {
			if (poly1.contains(poly2.points[i].x, poly2.points[i].y)) {
				return true;
			}
		}
		return false;
	},
	drawFinishedPolys: function () {
		for (var i = 0; i < this.finishedPolys.length; i++) {
			this.graphics.beginFill(0x0000FF + (0x100000 * i) - (0x001000 * i));
			this.graphics.drawPolygon(this.finishedPolys[i].points);
			this.graphics.endFill();
		}
		this.graphCentroids();
		this.elOutput.value = this.welcomeString + JSON.stringify(this.finishedPolys);
	},
	drawPaths: function () {
		if (this.finishedPolys.length == 0) { return; }
		this.graphics.beginFill(0xFF3300);
		this.graphics.lineStyle(2, 0xffd900, 1);
		for (var i = 0; i < this.finishedPolys.length; i++) {
			var thisPoly = this.finishedPolys[i];
			for (var j = 0; j < thisPoly.connectedPolys.length; j++) {
				var thatPoly = this.finishedPolys[thisPoly.connectedPolys[j]];

				this.graphics.moveTo(thisPoly.centroid.x, thisPoly.centroid.y);
				this.graphics.lineTo(thatPoly.centroid.x, thatPoly.centroid.y);
			}
		}

	},
	drawPolyPoints: function () {
		for (var i = 0; i < this.finishedPolys.length; i++) {
			for (var j = 0; j < this.finishedPolys[i].points.length; j++) {
				this.graphics.beginFill(0xFF0055);
				this.graphics.drawCircle(this.finishedPolys[i].points[j].x, this.finishedPolys[i].points[j].y, 3);
				this.graphics.endFill();
			}

			if (this.finishedPolys[i].centroid) {
				this.graphics.beginFill(0xFF0055);
				this.graphics.drawCircle(this.finishedPolys[i].centroid.x, this.finishedPolys[i].centroid.y, 4);
				this.graphics.endFill();
			}		
		}
	},
	drawDebugLayer: function () {
		this.graphics.clear();
		this.drawFinishedPolys();
		this.drawPaths();
		this.drawPolyPoints();
		this.drawCurrentPoints();

	}
};