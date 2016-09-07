var MARGIN = 16;

exports.create = function() {
  return new tabris.Page({
    title: "Position",
    topLevel: true
  }).once("appear", createExample);
};

function createExample(page) {

  var controls = new tabris.Composite({
    left: 0, right: 0, bottom: 0,
    background: "white",
    elevation: 6
  }).appendTo(page);

  var map = new esmaps.Map({
    left: 0, right: 0, top: 0, bottom: controls
  }).on("ready", function() {
    this.set("position", [24.725398,46.2620111]);
    updatePositionTextView();
  }).appendTo(page);

  var paris = new tabris.Button({
    left: MARGIN, right: ["50%", 8], top: MARGIN,
    text: "الرياض"
  }).on("select", function() {
    map.set("position", [24.725398,46.2620111]);
  }).appendTo(controls);

  new tabris.Button({
    left: ["50%", 8], right: MARGIN, top: MARGIN,
    text: "داربوعزة"
  }).on("select", function() {
    map.set("position", [33.5236235,-7.8313316]);
  }).appendTo(controls);

  var updatePositionButton = new tabris.Button({
    text: "Get position",
    left: MARGIN, top: [paris, MARGIN], bottom: MARGIN
  }).on("select", updatePositionTextView)
    .appendTo(controls);

  var positionTextView = new tabris.TextView({
    left: [updatePositionButton, MARGIN], right: MARGIN, top: [paris, MARGIN], bottom: MARGIN,
    markupEnabled: true
  }).appendTo(controls);

  function updatePositionTextView() {
    var position = map.get("position");
    positionTextView.set("text", "Latitude: <b>" + truncate(position[0]) + "</b><br/>"
      + "Longitude: <b>" + truncate(position[1]) + "</b>");
  }

  function truncate(number) {
    var multiplier = Math.pow(10, 6),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
  }

}
