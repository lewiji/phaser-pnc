/**
 * The MIT License (MIT)
 * Copyright (c) 2014
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
 * @author       Lewis Pollard
 * @copyright    2016 Lewis Pollard 
 * @license      {@link http://opensource.org/licenses/MIT}
 */

(function(Phaser) {
	'use strict';

	/**
	 * @param {Object} game - The Phaser game instance
	 * @param {Object} parent - the plugin owner, eg Phaser.PluginManager
	 */
	Phaser.Plugin.PNCAdventure = function(game, parent) {
		Phaser.Plugin.call(this, game, parent);
		console.log('Point and click adventure plugin initialised');
	};

	Phaser.Plugin.PNCAdventure.prototype = Object.create(Phaser.Plugin.Prototype);
	Phaser.Plugin.PNCAdventure.prototype.constructor = Phaser.Plugin.PNCAdventure;

	Phaser.Plugin.PNCAdventure.prototype.configure = function(options) {
		if (options) {
			for (var property in options) {
				if (this.settings.hasOwnProperty(property)) {
					this.settings[property] = options[property];
				}
			}
		}
	};

	Phaser.Plugin.PNCAdventure.prototype.start = function() {

	};
}(Phaser));