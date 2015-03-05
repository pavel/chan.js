function createChannel() {
  var queue = [];
  var wait = true;
  var panicking = false;
  var args = [];
  var recover;
  function next(fn) {
    if (panicking) return false;
    try {
      fn.apply(null, args);
    } catch (e) {
      panic(e);
    }
    return true;
  }
  function channel(fn) {
    if (typeof fn !== "function") throw "Only functions allowed";
    if (wait) {
      queue.push(fn);
    } else {
      next(fn);
    }
    return this;
  }
  function emit() {
    args = [].slice.call(arguments);
    wait = false;
    queue.every(next);
  }
  function panic(err) {
    panicking = true;
    if (typeof recover !== "function") return;
    if (recover(err)) panicking = false;
  }
  function catcher(fn) {
    recover = fn;
    return this;
  }
  channel.emit = emit;
  channel.catch = catcher;
  return channel;
}

module.exports = createChannel;
