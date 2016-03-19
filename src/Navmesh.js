Phaser.Plugin.PNCAdventure.Navmesh = function (game) {
	console.debug('Navmesh initialised');
	this.game = game;
	this.initData();
	this.initGraphics();
};

Phaser.Plugin.PNCAdventure.Navmesh.prototype = {
	constructor: Phaser.Plugin.PNCAdventure.Navmesh,
	initSignals: function () {
		this.game.pncPlugin.signals.sceneTappedSignal.add(
			this.addPoint,
			this, 5000
		);

		this.confirmKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.confirmKey.onDown.add(this.addPolygon, this);

		this.undoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.undoKey.onDown.add(this.undo, this);
	},
	initGraphics: function () {
		this.graphics = this.game.add.graphics(0, 0);
		this.graphics.alpha = 0.5;
	},
	removeSignals: function () {
		this.confirmKey.onDown.remove(this.addPolygon, this);
		this.undoKey.onDown.remove(this.undo, this);

		this.game.pncPlugin.signals.sceneTappedSignal.remove(
			this.addPoint,
			this, 5000
		);
	},
	initData: function () {
		this.debugEnabled = false;

		this.toggleKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.toggleKey.onDown.add(this.toggleTool, this);

		this.grid = new Const.Grid();
		this.currentNodes = [];
		this.currentPolygons = [];
		this.edgeDistanceThreshold = 10;
		this.pointerLocation = {x: 0, y: 0};
		this.characterLocation = {x: 0, y: 0};
		this.nearestNodeToPointer = null;
		this.intersectorLine = new Phaser.Line(0, 0, 0, 0);
	},
	toggleTool: function () {
		if (this.debugEnabled) {
			this.removeSignals();
			this.debugEnabled = false;
			this.graphics.alpha = 0.25;
		} else {
			this.initSignals();
			this.debugEnabled = true;
			this.graphics.visible = true;
			this.graphics.alpha = 0.5;
		}
		
	},
	findPath: function () {
		this.characterNodeId = this.grid.addNode(this.characterLocation.x, this.characterLocation.y, {id: 'character'});
		this.pointerNodeId = this.grid.addNode(this.pointerLocation.x, this.pointerLocation.y, {id: 'pointer'});

		var lineOfSightPoints = this.intersectorLine.coordinatesOnLine();

		lineOfSightPoints.pop();
		lineOfSightPoints.shift();

		var hit = false;
		var intersectsGap = false;
		var direct = true;
		var crossingPoints = [];
		for (var i = 0; i < lineOfSightPoints.length; i++) {
			hit = this.grid.hitTestPointInPolygons({x: lineOfSightPoints[i][0], y: lineOfSightPoints[i][1]});
			if (hit === true) {
				if (intersectsGap) {
					crossingPoints.push({x: lineOfSightPoints[i][0], y: lineOfSightPoints[i][1]});
				}
				intersectsGap = false;
			} else {
				direct = false;
				if (!intersectsGap) {
					crossingPoints.push({x: lineOfSightPoints[i][0], y: lineOfSightPoints[i][1]});
				}
				intersectsGap = true;
			}
		}
		console.log(crossingPoints);
		var path = [];

		if (direct) {
			console.log('direct path');
			path.push(this.pointerLocation);
		} else {
			console.log('intersects obstacle');
			var snap;
			for (var i = 0; i < crossingPoints.length; i++) {
				snap = this.grid.snapPointToGrid(crossingPoints[i]);
				this.grid.addNode(snap.point.x, snap.point.y, {id: 'intersection'+i});
				for (var j = 0; j < snap.segment.length; j++) {
					this.grid.joinNodes('intersection'+i, snap.segment[j]);
				}

				// exit points
				if (i % 2 === 0 && i > 0) {
					this.grid.joinNodes('intersection' + (i - 1), 'intersection'+i);
				}
			}

			this.grid.joinNodes('character', 'intersection0');

			this.grid.joinNodes('pointer', 'intersection' + (crossingPoints.length - 1));

			var thePath = this.grid.findPath('character', 'pointer');

			path = thePath.nodes;

			path.shift();

			this.grid.removeNodes('character');
			this.grid.removeNodes('pointer');

			for (var i = 0; i < crossingPoints.length; i++) {
				this.grid.removeNodes('intersection'+i);
			}
		}

		return path;

		
	},
	undo: function () {

	},
	addPoint: function (pointer) {
		this.game.pncPlugin.signals.sceneTappedSignal.halt();
		var node = this.grid.addNode(pointer.x, pointer.y);
		this.currentNodes.push(node.id);
		this.drawAll();
		return node;
	},
	loadPolygonFromNodes: function (nodes) {
		for (var i = 0; i < nodes.length; i++) {
			this.addPoint(nodes[i]);
		}
		this.addPolygon();
	},
	outputNodesAsJson: function (nodes) {
		if (nodes === undefined) {
			nodes = this.currentNodes;
		}
		var points = [];
		var node;
		for (var i = 0; i < nodes.length; i++) {
			node = this.grid.getNodeById(nodes[i]);
			points.push({x: node.x, y: node.y});
		}
		console.log(JSON.stringify(points));
	},
	addPolygon: function (e, nodes) {
		if (nodes === undefined) {
			nodes = this.currentNodes;
		}
		this.outputNodesAsJson();
		var polygon = this.grid.addPolygon(nodes);
		if (polygon !== null) {			
			for (var i = 1; i < polygon.nodes.length; i++) {
				this.grid.joinNodes(polygon.nodes[i - 1], polygon.nodes[i]);
			}
			this.currentNodes = [];
			this.currentPolygons.push(polygon.id);
			console.debug(this.currentPolygons);
			console.debug(this.getCurrentPolygons());
		}
		this.drawAll();
		return polygon;
	},
	drawAll: function () {
		this.graphics.clear();
		this.drawCurrentPolygons();
		this.drawCurrentNodes();
		this.drawPointerLocation();
		this.drawCharacterLocation();
	},
	getCurrentNodes: function () {
		return this.grid.getNodes(this.currentNodes);
	},
	getCurrentPolygons: function () {
		return this.grid.getPolygons(this.currentPolygons);
	},
	drawCurrentNodes: function () {
		var nodes = this.getCurrentNodes();
		for (var i = 0; i < nodes.length; i++) {
			this.graphics.beginFill(0x00ff00);
			this.graphics.drawCircle(nodes[i].x, nodes[i].y, 10);
			this.graphics.endFill();
		}
	},
	drawCurrentPolygons: function () {
		var polys = this.getCurrentPolygons();
		for (var i = 0; i < polys.length; i++) {
			// Draw phaser polygon
			var polyNodes = this.grid.getNodes(polys[i].nodes);
			this.graphics.beginFill(0x0000FF + (0x100000 * i) - (0x001000 * i));
			this.graphics.drawPolygon(polyNodes);
			this.graphics.endFill();

			// Draw boundary nodes
			for (j = 0; j < polyNodes.length; j++) {
				this.graphics.beginFill(0xFF00FF);
				this.graphics.drawCircle(polyNodes[j].x, polyNodes[j].y, 10);
				this.graphics.endFill();
			}
		}
	},
	drawPointerLocation: function () {
		this.graphics.beginFill(0xFF5533);
		this.graphics.drawCircle(this.pointerLocation.x, this.pointerLocation.y, 4);
		this.graphics.endFill();

		if (this.nearestNodeToPointer != null) {
			this.graphics.moveTo(this.pointerLocation.x, this.pointerLocation.y);
			this.graphics.lineStyle(1, 0xFF0000, 1);
			this.graphics.lineTo(this.nearestNodeToPointer.x, this.nearestNodeToPointer.y);
			this.graphics.endFill();
		}


	},
	drawCharacterLocation: function () {
		this.graphics.beginFill(0xFF5533);
		this.graphics.drawCircle(this.characterLocation.x, this.characterLocation.y, 4);
		this.graphics.endFill();

		if (this.nearestNodeToCharacter != null) {
			this.graphics.moveTo(this.characterLocation.x, this.characterLocation.y);
			this.graphics.lineStyle(1, 0xFF0000, 1);
			this.graphics.lineTo(this.nearestNodeToCharacter.x, this.nearestNodeToCharacter.y);
			this.graphics.endFill();

			this.graphics.moveTo(this.intersectorLine.start.x, this.intersectorLine.start.y);
			this.graphics.lineStyle(1, 0x55322F, 1);
			this.graphics.lineTo(this.intersectorLine.end.x, this.intersectorLine.end.y);
			this.graphics.endFill();
		}
	},
	updatePointerLocation: function (x, y) {
		var inGrid = this.grid.hitTestPointInPolygons({x: x, y: y});
		var pointer;
		if (!inGrid) {
			pointer = this.grid.snapPointToGrid({x: x, y: y});
			pointer = pointer.point;
		} else {
			pointer = new Const.Point(x, y);
		}

		this.intersectorLine.setTo(this.characterLocation.x, this.characterLocation.y, pointer.x, pointer.y);
		
		this.pointerLocation = {x: pointer.x, y: pointer.y};
		this.nearestNodeToPointer = this.grid.getNearestNodeToPoint(this.pointerLocation);
		this.drawAll();
	},
	updateCharacterLocation: function (x, y) {
		this.characterLocation = {x: x, y: y};
		this.nearestNodeToCharacter = this.grid.getNearestNodeToPoint(this.characterLocation);
		this.drawAll();
	},
};