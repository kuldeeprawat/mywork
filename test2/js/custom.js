$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots:true,
  items:1
})
$(document).ready(function(){
  $(".list-box .list").click(function(){
    $(".list-box .list").removeClass("active");
    $(this).addClass("active");
  })
  $(".toggle-nav").on('click', function(){
    $("nav").toggleClass("active");
  })
})