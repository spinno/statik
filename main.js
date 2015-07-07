// Generated by CoffeeScript 1.9.3
var glow, isNight, makeStatic, moveHandler, setupPart2, text1, text2, text3, write;

glow = function($model, $target) {
  var offset;
  offset = $target.offset();
  return $model.addClass('glow').css({
    top: offset.top,
    left: "calc(" + offset.left + "px - 20vh)"
  });
};

write = function($obj, text, glowFn, done) {
  var t;
  if (text.length > 0) {
    t = (function() {
      switch (text[0]) {
        case "#":
          return "<br/>";
        case "*":
          return t = "<strong>ER</Strong>";
        case '|':
          glowFn();
          return t = '';
        default:
          return text[0];
      }
    })();
    $obj.append(t);
    return setTimeout((function() {
      return write($obj, text.slice(1), glowFn, done);
    }), (Math.random() + 2) * 28);
  } else {
    $obj.addClass("writer-done");
    return setTimeout(done, 2000);
  }
};

makeStatic = function($obj) {
  return $obj.height($obj.height()).width($obj.width());
};

text1 = "Vill man synas på nätet idag räcker det# inte bara med en hemsida.##Vi tror att det måste finnas en tanke| bakom den.";

text2 = "Därför skapar vi hemsidor genom att#först lära känna er och era kunder.##Sedan designar vi hemsidan| så att vi kan#framföra ert budskap på ett smart och innovativt sätt.";

text3 = "För vi nöjer oss inte med att endast göra en snygg sida.#Vi vill snickra ihop någonting unikt som man minns.##Vi vill helt enkelt skapa *| sida.";

isNight = false;

$(document).ready(function() {
  var sHeight, sWidth;
  $.support.cors = true;
  sWidth = $(window).width();
  sHeight = $(window).height();
  return $('.main').onepage_scroll({
    loop: false,
    beforeMove: function(i) {
      return moveHandler(i, sWidth, sHeight);
    }
  });
});

moveHandler = function(index, sWidth, sHeight) {
  var $filter, $words;
  $filter = $('.background-filter');
  if (index === 2) {
    $words = $('#no-press h1 span').css("color", "white");
    $("#no-press h1").css({
      "border-bottom": "4px solid #F7C6BD",
      "border-left": "4px solid #F7C6BD",
      "border-top": "4px solid #F7C6BD",
      "border-right": "4px solid #F7C6BD",
      "background-color": "rgba(0,0,0,0.8)"
    }).unbind('click').click(function() {
      return setupPart2(sWidth, sHeight);
    }).delay(1500).queue(function() {
      return $(this).addClass("highligth").dequeue();
    });
    $filter.addClass('dark').removeClass('light');
    if (isNight) {
      return $filter.addClass('night');
    } else {
      return $filter.addClass('dark');
    }
  } else if (index === 1) {
    return $filter.removeClass('dark').addClass('light').removeClass('night');
  } else if (index === 3) {
    $filter.addClass('light').removeClass('dark');
    $('.depth').addClass('roll-down');
    return $('.thumb-up').addClass('thumb-down');
  }
};

setupPart2 = function(sWidth, sHeight) {
  var done1, done2, glowFn1, glowFn2, glowFn3;
  glowFn1 = function() {
    return glow($('#lightbulb'), $('#writer-1'));
  };
  glowFn2 = function() {
    return glow($('#screen'), $('#writer-2'));
  };
  glowFn3 = function() {
    return glow($('#smiley'), $('#writer-3'));
  };
  $('.background-filter').addClass('night');
  isNight = true;
  $("#no-press h1 span").css("color", "transparent");
  $("#no-press h1").delay(600).queue(function() {
    return makeStatic($(this)).html("").dequeue();
  }).animate({
    padding: 0,
    width: 0
  }, 600).queue(function() {
    return $(this).remove();
  });
  $(".text").css("height", sHeight * .6);
  done2 = function() {
    return write($("#writer-3"), text3, glowFn3, function() {
      return $(".writer").css("color", "#94FFFC");
    });
  };
  done1 = function() {
    return write($("#writer-2"), text2, glowFn2, done2);
  };
  return setTimeout((function() {
    return write($("#writer-1"), text1, glowFn1, done1);
  }), 3000);
};

$(function() {
  var group, paper;
  paper = Snap('#screen-paper');
  group = paper.group();
  Snap.load('imgs/hammer.svg', function(f) {
    var bbox, hammer, smash;
    hammer = f.select("path");
    group.append(hammer);
    bbox = hammer.getBBox();
    smash = function() {
      return hammer.animate({
        transform: "rotate(90, " + bbox.cx + ", " + bbox.y2 + ")"
      }, 250, function() {
        return hammer.animate({
          transform: "rotate(0, " + bbox.cx + ", " + bbox.y2 + ")"
        }, 1000, smash);
      });
    };
    return smash();
  });
  return Snap.load('imgs/screen.svg', function(f) {
    var m, screen;
    screen = f.select('g');
    group.append(screen);
    m = screen.transform().localMatrix;
    m.translate(40, 105);
    return screen.transform(m);
  });
});
