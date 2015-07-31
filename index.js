function chan() {
	var listeners = [];
	function c(fn) {
		listeners.push(fn);
	}
	c.rm = function (fn) {
		var ind = listeners.indexOf(fn);
		if (ind === -1) return;
		listeners.splice(ind, 1);
	};
	function run(args, fn) {
		fn.apply(undefined, args);
	}
	c.pub = function () {
		var args = [].slice.call(arguments);
		listeners.forEach(run.bind(undefined, args));
	};
	return c;
}

module.exports = chan;
