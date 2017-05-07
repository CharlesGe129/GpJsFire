$(document).ready(function() {
  var father = $('.bbb');
  var son = "<div class='aaa'></div>";
  for(var i=0; i<800; i++) {
    father.after(son);
  }
  for (var i=0; i<3; i++) {
    animate();
    //disappear();
  }
});

function animate() {
    var height = $(window).height();
    var width = $(window).width();
    $('.aaa').each(function(id){
    $(this).css({
      position: 'absolute',
      bottom: '0px',
      left: width / 2 + 'px',
      opacity: 0
    });
    var wait = Math.floor((Math.random()*10000)+1);
    var postion = getRandomPosition();
    $(this).delay(wait).animate({
      bottom: postion[0] + 'px',
      left: (width/2 + postion[1]) + 'px',
      opacity: 1
    },1000);
    $(this).animate({
      bottom: '-20px',
      opacity: 1
    },1000);
  });
}

function disappear() {
    var height = $(window).height();
    var width = $(window).width();
    $('.aaa').each(function(id){
    $(this).css({
      position: 'absolute',
      bottom: $(this).css('bottom'),
      left: $(this).css('left'),
      opacity: 0
    });
    var wait = Math.floor((Math.random()*500)+1);
    var postion = getRandomPosition();
    $(this).delay(wait).animate({
      bottom: '0px',
      left: width / 2 + 'px',
      opacity: 1
    },1000);
  });
}

function getRandomPosition() {
  var bottom = parseInt(Math.random()*100);
  var left = parseInt(Math.random()*(110-bottom))/2;
  if (parseInt(Math.random()*2) == 0) {
    left = -left;
  }
  return [bottom, left];
}