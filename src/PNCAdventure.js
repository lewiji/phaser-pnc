/**
 * The MIT License (MIT)
 * Copyright (c) 2016
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * 
 *
 */

/**
 * @author       TBC
 * @copyright    2016
 * @license      {@link http://opensource.org/licenses/MIT}
 */

/**
 * constructor
 * @param {Object} game - The Phaser game instance
 * @param {Object} parent - the plugin owner, eg Phaser.PluginManager
 */
Phaser.Plugin.PNCAdventure = function(game, parent) {
	Phaser.Plugin.call(this, game, parent);
	console.debug('Point and click adventure plugin initialised');
	this.scenes = {};
	this.initSignals();
	this.navGraph;
};

Phaser.Plugin.PNCAdventure.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PNCAdventure.prototype.constructor = Phaser.Plugin.PNCAdventure;

/**
 * initialises phaser signals used in the plugin
 */
Phaser.Plugin.PNCAdventure.prototype.initSignals = function () {
	this.signals = {
		sceneTappedSignal: new Phaser.Signal(),
		playerMovementSignal: new Phaser.Signal(),
		navGraphUpdated: new Phaser.Signal()
	};

	this.signals.navGraphUpdated.add(function (graph) {
		this.navGraph = graph;
	}, this);
};

/**
 * addScene - adds a new scene to the game
 * @param {String} key - the name to refer to this scene
 * @param {Object} sceneDefinition - JSON object with scene data
 * @param {boolean} switchTo - whether to switch to this scene immediately or not
 * @return {Phaser.Plugin.PNCAdventure.Scene} the resulting scene state object
 */
Phaser.Plugin.PNCAdventure.prototype.addScene = function (key, sceneDefinition, switchTo) {
	if (this.scenes[key] !== undefined) {
		console.error('Scene ' + key + ' already exists');
		return false;
	}
	this.scenes[key] = new Phaser.Plugin.PNCAdventure.Scene(key, sceneDefinition);
	this.game.state.add('PNC.' + key, this.scenes[key], switchTo);
	return this.scenes[key];
};

/**
 * adds an actor to the scene
 * @param {Phaser.Plugin.PNCAdventure.Scene} scene - the scene to add the actor to
 * @param {Object} actorDefinition - json data for this actor
 */
Phaser.Plugin.PNCAdventure.prototype.addActor = function (scene, actorDefinition) {
	return scene.initActor(actorDefinition);
};