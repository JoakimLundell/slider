$(document).ready(function(){

  var mousedown;

  $("input[type='range'].test").on('input', function() {
    var me = $(this);
    var value = me.val();
    var width = me.width();
    var rangeContent = me.prev("div.range-content");
    var fixed = rangeContent.children("span");
    var flexible = rangeContent.find("div");
    var flexibleWidth = flexible.width();

    if(mousedown) {
      showValue(flexible,value);
      var position = (me.val() - me.attr("min")) / (me.attr("max") - me.attr("min"));
      var newPosition = 0;

      if(position < 0) {
        newPosition = 0;
      } else if(position > 1) {
        newPosition = width;
      } else {
        newPosition = Math.round(width * position);
      }

      if(newPosition < flexibleWidth /2) {
        flexiblePosition = 0;
      } else if(newPosition > (flexibleWidth/2)) {
        if (newPosition > (width - flexibleWidth/2 -30 )) {
          flexiblePosition = width - flexibleWidth- 30;
        } else {
          flexiblePosition = newPosition -(flexibleWidth / 2);
        }
      }
      flexible.css({"margin-left": flexiblePosition + "px"});
    } else {
      showValue(fixed, value);
    }

  }).trigger("change");


  $("input[type='range']").on("mouseup", function() {
    hide($(this));
  });

  $("input[type='range']").on("mousedown", function() {
    show($(this));
  });

  $("input[type='range']").on("touchend", function() {
    hide($(this));
  });

  $("input[type='range']").on("touchstart", function() {
    show($(this));
  });

  function show(element) {
    mousedown = 1;
    $(element).prev("div.range-content").children("span").css("display", "none");
    $(element).prev("div.range-content").find("div").css("display", "inline");
  }

  function hide(element) {
    mousedown = 0;
    $(element).prev("div.range-content").children("span").css("display", "inline");
    $(element).prev("div.range-content").find("div").css("display", "none");
  }

  function showValue(element, value) {
    $(element).find(".value").text(value);
  }

});