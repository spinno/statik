text1 = "Vill man synas på nätet idag räcker det# inte bara med en hemsida.##Vi tror att det måste finnas en tanke| bakom den."
text2 = "Därför skapar vi hemsidor genom att#först lära känna er och era kunder.##Sedan designar vi hemsidan| så att vi kan#framföra ert budskap på ett smart och innovativt sätt."
text3 = "För vi nöjer oss inte med att endast göra en snygg sida.#Vi vill snickra ihop någonting unikt som man minns.##Vi vill helt enkelt skapa *| sida."

isNight = false

$(document).ready ->
  $.support.cors = true
  sWidth = $(window).width()
  sHeight = $(window).height()

  $('.main').onepage_scroll
    loop: false
    beforeMove: (i) -> moveHandler i, sWidth, sHeight