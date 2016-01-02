//     Tetris.js - A Tetris clone for HTML5
//     Copyright (C) 2014  Chris Barrick <cbarrick1@gmail.com>
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.


define(function (require, exports, module) {
	'use strict';

	var Model = require('model');
	var Tetrimino = require('tetrimino');


	 // A factory of non-randomly generated Tetriminos.
	 //
	 // See the Tetris Wiki for the [algorithm][].
	 // [algorithm]: http://tetris.wikia.com/wiki/Random_Generator
	 //
	 // Attributes
	 // ----------
	 // - `queue` (Array): The current output queue of Tetriminos
	 // - `bounds` (Array -> Boolean): The bounds function for all Tetriminos
	 //   created by this factory. See `src/tetrimino.js` for details

	module.exports = Model.extend({

		attributes: {
			queue: [],
			bounds: function () { return true; }
		},


		initialize: function () {
			this.set({
				queue: this._makeQueue(),
			});
		},


		 // queue.pop()
		 // -----------
		 // Returns a tetrimino from the queue.

		pop: function () {
			var queue = this.get('queue');
			var ret = queue.pop();

			if (queue.length === 0) {
				queue = this._makeQueue();
				this.set('queue', queue);
			}
			return ret;
		},


		// Helper methods
		// --------------

		// Creates a permutation of the 7 Tetrimino types

		_makeQueue: function () {
			var bounds = this.get('bounds');
			var chooseFrom = [];
			var bag = [];
			var tetrimino;
			for (var TypeName in Tetrimino.types) {
				tetrimino = new Tetrimino({type: TypeName, bounds: bounds});
				chooseFrom.push(tetrimino);
			}

			bag = [chooseFrom[Math.floor(Math.random() * chooseFrom.length)]]
			return bag
		}
	});
});
