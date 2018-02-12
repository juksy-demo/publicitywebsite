var theater = theaterJS();

theater
.on('type:start, erase:start', function () {
    // add a class to actor's dom element when he starts typing/erasing
    var actor = theater.getCurrentActor()
    actor.$element.classList.add('is-typing')
})
.on('type:end, erase:end', function () {
    // and then remove it when he's done
    var actor = theater.getCurrentActor()
    actor.$element.classList.remove('is-typing')
});

theater
.addActor('luke');

theater
.addScene('luke:TARS ON TREND', 3600)
.addScene(theater.replay);


//Number Counter + wow
$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};

var wow = new WOW(
  {
    boxClass:     'wow',      
    animateClass: 'animated',
    offset:       0,
    callback:     function(box) {
      $('#number1').jQuerySimpleCounter({end: 4000,duration: 2500});
      $('#number2').jQuerySimpleCounter({end: 20,duration: 2500});
      $('#number3').jQuerySimpleCounter({end: 500,duration: 2500});
      $('#number4').jQuerySimpleCounter({end: 900,duration: 2500});
    }
  }
);
wow.init();


//Map
function initMap() {
  var uluru = {lat: 25.028860, lng: 121.521458};
  var map = new google.maps.Map(document.getElementById('grey-map'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
