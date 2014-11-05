var router = require('tiny-router'),
  tessel = require('tessel'),
  Neopixels = require('neopixels'),
  neopixels = new Neopixels(),
  animations = require('neopixel-animations'),
  numLEDs = 52,
  port = 8080;

router.get('/brightness/{intensity}', function(req, res) {
  var brightness = parseFloat(req.body.intensity);
  console.log('brightness', brightness);
  var val = 0xff * brightness;
  var buf = new Buffer(numLEDs * 3);
  buf.fill(val);
  neopixels.animate(numLEDs, buf);
  res.send("Brightness set to " + brightness);
});

router.get('/color/{colorName}', function(req, res) {
  var color = req.body.colorName;
  console.log("Changing to color", color, animations.setColor(numLEDs, color));
  neipixels.animate(numLEDs, animations.setColor(numLEDs, color));
  res.send("Color set to ", color);
});

router.listen(port);
console.log('listening on port', port)
