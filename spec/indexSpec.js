var chan = require("../index");

describe("basic test", function () {
	var c = chan();

	it("should receive messages", function (done) {
		c(function (greet, who) {
			expect(greet).toBe("hello");
			expect(who).toBe("world");
			done();
		});
		setTimeout(function () {
			c.pub("hello", "world");
		}, 100);
	});

	it("should support listener removal", function (done) {
		function greeter(greet, who) {
			done.fail("Greeter was called");
		}
		c(greeter);
		c.rm(greeter);
		setTimeout(function () {
			c.pub("hello", "world");
			done();
		}, 100);
	});

});
