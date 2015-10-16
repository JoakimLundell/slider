$(document).ready(function(){

  var mousedown;

  $("input[type='range'].test").each(function(index){
    var me = $(this);
    var value = me.val();
    var position = (me.val() - me.attr("min")) / (me.attr("max") - me.attr("min"));
    drawSlider(me, position*me.width());
  });

  $("input[type='range'].test").on("input", function() {
    var me = $(this);
    var value = me.val();
    var width = me.width();
    var rangeContent = me.prev().prev("div.slider-textbox");
    var fixed = rangeContent.children(".fixed-content");
    var flexible = rangeContent.find("div");
    var flexibleWidth = flexible.width();

    if(mousedown) {
      showValue(flexible,value);
      var position = (me.val() - me.attr("min")) / (me.attr("max") - me.attr("min"));
      var newPosition = 0;


      if(position <= 0) {
        newPosition = 0;
      } else if(position > 1) {
        newPosition = width;
      } else {
        newPosition = Math.round(width * position);
      }

      if(newPosition <= flexibleWidth /2) {
        flexiblePosition = 0;
      } else if(newPosition > (flexibleWidth/2)) {
        if (newPosition > (width - flexibleWidth/2 -30 )) {
          flexiblePosition = width - flexibleWidth- 30;
        } else {
          flexiblePosition = newPosition -(flexibleWidth / 2);
        }
      }
      drawSlider(me, position*width);
      flexible.css({"margin-left": flexiblePosition + "px"});
    } else {
      showValue(fixed, value);
    }
  }).trigger("input");

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

  $(window).bind('resize', function(e) {
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function() {
      this.location.reload(false); /* false to get page from cache */
    }, 100);
  });

  function show(element) {
    mousedown = 1;
    $(element).prev().prev("div.slider-textbox").children("span").css("display", "none");
    $(element).prev().prev("div.slider-textbox").find("div").css("display", "inline");
  }

  function hide(element) {
    mousedown = 0;
    $(element).prev().prev("div.slider-textbox").children("span").css("display", "inline");
    $(element).prev().prev("div.slider-textbox").find("div").css("display", "none");
  }

  function showValue(element, value) {
    $(element).find(".value").text(value);
  }

  function drawSlider( element, to ) {
    var to = to;
    var canvas = element.prev().get(0);
    $(canvas).attr("width", element.width());
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#4c4c4c';
    context.beginPath();
    context.arc(7, 7, 7, 0, Math.PI*2, false);
    context.closePath();
    context.fill();

    context.fillStyle = "#4c4c4c";
    context.beginPath();
    context.fillRect(7,0,to-7,14);
    context.closePath();
    context.fill();

    context.fillStyle = '#c7c7c7';
    context.beginPath();
    context.arc(canvas.width-7, 7, 7, 0, Math.PI*2, false);
    context.closePath();
    context.fill();

    context.fillStyle = "#c7c7c7";
    context.beginPath();
    context.fillRect(to,0,canvas.width-to-7,14);
    context.closePath();
    context.fill();

    context.stroke();
    return true;
  }

});