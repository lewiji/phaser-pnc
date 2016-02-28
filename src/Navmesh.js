/**
 * Navmesh object takes in poly data and generates a usable data structure on which to perform
 * pathfinding
 * @requires constellation.js - https://github.com/gmac/constellation.js
 */
Phaser.Plugin.PNCAdventure.NavMesh = function (game, pathPolys) {
	this.game = game;
	this.initConstellation();

	if (Phaser.Plugin.PNCAdventure.DebugNavmesh) {
		this.navmeshTool = new Phaser.Plugin.PNCAdventure.DebugNavmesh(game, this);
		if (pathPolys) {
			this.navmeshTool.loadJSONPolyData(pathPolys);
		}
	}
	console.debug('NavMesh initialised');
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype = {};
Phaser.Plugin.PNCAdventure.NavMesh.prototype.constructor = Phaser.Plugin.PNCAdventure.NavMesh;

Phaser.Plugin.PNCAdventure.NavMesh.prototype.initConstellation = function (navMeshData, debugGraphics) {
	this.grid = new Const.Grid();
	this.graphics = debugGraphics;
};

/**
 * Takes a Phaser.Polygon and returns a Const.Polygon
 * @param {[type]} polygon [description]
 */
Phaser.Plugin.PNCAdventure.NavMesh.prototype.createPolygon = function (points) {
	var ids = [];
	for (var i = 0; i < points.length; i++) {
		ids.push(points[i].id);
	}
	var poly = this.grid.addPolygon(ids);
	console.log(this.getPolygonCentroid(poly));
	console.log(poly);
	console.log(this.grid.getNumPolygons());
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype.getPolygonCentroid = function(poly) {
	var x = 0,
        y = 0,
        i,
        j,
        f,
        point1,
        point2;

    for (i = 0, j = poly.nodes.length - 1; i < poly.length; j = i, i += 1) {
        point1 = poly.nodes[i];
        point2 = poly.nodes[j];
        f = point1.x * point2.y - point2.x * point1.y;
        x += (point1.x + point2.x) * f;
        y += (point1.y + point2.y) * f;
    }

    f = poly.area * 6;

    return new Point(x / f, y / f);
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype.createPoint = function (phaserPoint, id) {
	var node = this.grid.addNode(phaserPoint.x, phaserPoint.y, {id: id});
	console.log(node);
	return node;
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype.drawFinishedPolys = function (graphics) {
	var points = [];
	for (var poly in this.grid.polys) {
		for (var i = 0; i < this.grid.polys[poly].nodes.length; i++) {
			points.push(this.grid.nodes[this.grid.polys[poly].nodes[i]]);
		}
		graphics.beginFill(0x0000FF);
		graphics.drawPolygon(points);
		graphics.endFill();
	}
	/*for (var i = 0; i < this.grid.getNumPolygons; i++) {
		graphics.beginFill(0x0000FF + (0x100000 * i) - (0x001000 * i));
		graphics.drawPolygon(this.grid.getPolygonById(i).points);
		graphics.endFill();

		for (var j = 0; j < this.grid.getPolygonById(i).points.length; j++) {
			this.drawPolyPoint(this.grid.getPolygonById(i).points[j]);
		} 
	}*/
	//this.elOutput.value = this.welcomeString + JSON.stringify(this.finishedPolys);
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype.drawDebug = function (graphics) {
	graphics.clear();
	this.drawFinishedPolys(graphics);
	this.drawCurrentPoints(graphics);
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype.drawCurrentPoints = function (graphics) {
	for (var node in this.grid.nodes) {
		graphics.beginFill(0xFF00FF);
		graphics.drawCircle(this.grid.nodes[node].x, this.grid.nodes[node].y, 10);
		graphics.endFill();
	}
};

Phaser.Plugin.PNCAdventure.NavMesh.prototype.drawPolyPoint = function (graphics, point) {
	console.debug('draw poly point');
	graphics.beginFill(0xFF00FF);
	graphics.drawCircle(point.x, point.y, 10);
	graphics.endFill();
};