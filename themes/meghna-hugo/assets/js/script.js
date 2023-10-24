/* ========================================================================= */
/*	Page Preloader
 /* ========================================================================= */

jQuery(function($) {
  'use strict';

  /* ========================================================================= */
  /*	lazy load initialize
   /* ========================================================================= */

  const observer = lozad(); // lazy loads elements with default selector as ".lozad"
  observer.observe();

  /* ========================================================================= */
  /*	Magnific popup
   /* =========================================================================  */
  $('.image-popup').magnificPopup({
    type: 'image',
    removalDelay: 160, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure',
          'mfp-figure mfp-with-anim');
        this.st.mainClass = this.st.el.attr('data-effect');
      },
    },
    closeOnContentClick: true,
    midClick: true,
    fixedContentPos: false,
    fixedBgPos: true,
  });

  /* ========================================================================= */
  /*	Portfolio Filtering Hook
   /* =========================================================================  */

  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1,
    });

    jQuery('input[name="shuffle-filter"]').on('change', function(evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }

  /* ========================================================================= */

  /*	Testimonial Carousel
   /* =========================================================================  */
  function setSlidesInfo(slidesDefault) {

    $('#testimonials').slick({
      accessibility: true,
      infinite: true,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 2000,
      slidesToShow: slidesDefault,
      slidesToScroll: slidesDefault,
    });
  }

  setSlidesInfo(3);

  $('.btn-pre').click(function() {
    $('#testimonials').slick('slickPrev');
  });

  $('.btn-next').click(function() {
    $('#testimonials').slick('slickNext');
  });

  /* ========================================================================= */

  /*	animation scroll js
   /* ========================================================================= */

  function myFunction(x) {
    if (x.matches) {
      var topOf = 50;
    } else {
      var topOf = 350;
    }
  }

  var html_body = $('html, body');
  $('nav a, .page-scroll').on('click', function() { //use page-scroll class in any HTML tag for scrolling
    if (location.pathname.replace(/^\//, '') ===
      this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        html_body.animate({
          scrollTop: target.offset().top - 50,
        }, 1500, 'easeInOutExpo');
        return false;
      }
    }
  });

  // easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function(x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  });

  /* ========================================================================= */

  /* ========================================================================= hack屏幕 强制修改最小高度*/

  /*	counter up
   /* ========================================================================= */
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function() {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text(),
        }).animate({
          countNum: countTo,
        }, {
          duration: 1000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          },
        });
      });
    }
  }

  $(window).on('scroll', function() {
    counter();
  });

  function isMobile() {
    var flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent);
    return flag;
  }


  $(window).on('load', function() {
    $('.preloader').fadeOut(100);
  });

  $(window).on('resize', function() {
    $('#testimonials').slick('unslick');
    // 变化后需要做的事
    if (isMobile()) {
      setSlidesInfo(1);
    } else {
      var body = document.getElementsByTagName('body');
      if (body[0].clientWidth <= 960) {
        setSlidesInfo(1);
      } else {
        setSlidesInfo(3);
      }
    }
  });
});


