$(document).ready(function(){
  var father = $('.bbb');
  //var son = $('<div></div>').class('aaa').text(111);
  var son = "<div class='aaa'></div>";
  for(var i=0; i<800; i++) {
    father.after(son);
  }
  animate();
});
function animate(){
    $('.aaa').each(function(id){
    $(this).css({
      position: 'absolute',
      top: '0px',
      left: '0px',
      opacity: 0
    });
    var wait = Math.floor((Math.random()*500)+1);
    $(this).delay(wait).animate({
      top: parseInt(Math.random()*100) + 'px',
      left: parseInt(Math.random()*100) + 'px',
      opacity: 1
    },1000);
  });
}
