$( document ).ready(function() {
  doNothing();
});

function doNothing() {
  console.log("hi LOLZ");
}

$( document ).ready(function() {
  smoothScroll(500);
  workBelt();
  workLoad();
  clientStuff();
});

function smoothScroll (duration) {
  $('a[href^="#"]').on('click', function(e) { //all anchor tags that contain '#'
    e.preventDefault();
    var link = $(this);
    var target = $(link.attr('href'));
    if(target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 500);
    }
  });
}

function workBelt() {

  $('.thumb-unit').on('click', function(e) {
    e.preventDefault();
    $('.work-belt').css('left', '-100%');
    $('.work-container').show();
  });

  $('.work-return').on('click', function() {
    $('.work-belt').css('left', '0');
    $('.work-container').hide(800);
  });
}

function workLoad() {
  //$.ajaxSetup({ cache: true });
  $('.thumb-unit').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var newTitle = $this.find('strong').text();
    var newFolder = $this.data('folder');
    var spinner = '<div class="loader">Loading...</div>"';
    var newHTML = '/work/' + newFolder + '.html';

    //$('.project-load').html(spinner).load(newHTML);
    $('.project-load').load(newHTML);
    $('.project-title').text(newTitle);
  });
}

function clientStuff() {
  $('.client-unit').first().addClass('active-client');
  $('.client-logo').first().addClass('active-client');
  $('.clients-mobile-nav span').first().addClass('active-client');

  $('.client-logo, .clients-mobile-nav span').click(function() {
    var $this = $(this);
    var $siblings = $this.parent().children();
    var position = $siblings.index($this);

    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    $siblings.removeClass('active-client');
    $this.addClass('active-client');
  });

  $('.client-control-next, .client-control-prev').click(function() {
    var $this = $(this);
    var currClient = $('.clients-belt').find('.active-client');
    var position = $('.clients-belt').children().index(currClient);
    var clientNum = $('.client-unit').length;

    if($this.hasClass('client-control-next')) {
      if(position < clientNum - 1) {
        $('.active-client').removeClass('active-client').next().addClass('active-client');
      }
      else {
        $('.client-unit').removeClass('active-client').first().addClass('active-client');
        $('.client-logo').removeClass('active-client').first().addClass('active-client');
      }
    }
    else {
      if(position != 0) {
        $('.active-client').removeClass('active-client').prev().addClass('active-client');
      }
      else {
        $('.client-unit').removeClass('active-client').last().addClass('active-client');
        $('.client-logo').removeClass('active-client').last().addClass('active-client');
      }
    }



    console.log(clientNum);
  });
}
