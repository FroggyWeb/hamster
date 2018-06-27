/* ==========================================================================
     menu
     ========================================================================== */
$(document).ready(function($) {
  $('.main_menu_wrap').attr('id', 'mainmenu');
  $('.l_wrap').append('<a href="#mainmenu" id="btn-mob-menu"></a>');


  $(".main_menu_wrap").mmenu({
    slidingSubmenus: false,
    //extensions  : [ "fullscreen", "effect-slide-panels-100", "border-full" ],
    extensions: ["fullscreen", "effect-slide-menu", "effect-slide-listitems"],
    offCanvas: {
      position: "top",
      zposition: "front"
    },
    navbars: [{
      position: "top",
      title: "Hamster",
      content: ["prev", "title", "close"]
    }]
  }, {
    clone: true,
  });


  $('.mob-filter').on('click', function() {
    $(this).siblings('.filter').toggleClass('show_filter');
  });

  /* ==========================================================================
     Слайдеры
     ========================================================================== */

  $(".carousel").slick({
    slidesToShow: 3,
    slide: 'li',
    centerMode: false,
    centerPadding: 0,
    infinite: false,
    //initialSlide: 1,
    variableWidth: false,
    dots: false,
    responsive: [{
      breakpoint: 750,
      settings: {
        slidesToShow: 2
      }
    },{
        breakpoint: 500,
        settings: {
        slidesToShow: 1
      }

    }]
  });

  $(".small_collection_list").slick({
    slidesToShow: 3,
    slide: 'li',
    centerMode: false,
    infinite: false,
    dots: false,
    responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]

  });

  $(".nav_promo_shop_slider").slick({
    dots: false,
    slide: 'li',
    slidesToShow: 1,
    infinite: false,
    lazyLoad: 'ondemand'
  });

  var e = $(".promo_action_slide img").length;
  if (e > 1) {
    $(".promo_action_slide").slick({
      fade: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    });
  };

  $('.product_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    asNavFor: '.product_slider_thumb_list'
  });

  $('.product_slider_thumb_list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product_slider',
    dots: false,
    vertical: true,
    infinite: false,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 450,
      settings: {
        vertical: false,
        slidesToShow: 3,

      }
    }]
  });

  $('.carousel_4').slick({
    slidesToShow: 4,
    slide: 'li',
    autoplay: true,
    arrows: false,
    responsive: [{
      breakpoint: 750,
      settings: {
        slidesToShow: 3
      }
    },{
        breakpoint: 500,
        settings: {
        slidesToShow: 2,
      }

    }]
  });

  var sliderCount = $('.slider-count');

  sliderCount.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    if (slick.slideCount > 1) {
      $(this).find('.slider-count__control-counter').html('<span class="current-slide">' + i + '</span>' + ' из ' + slick.slideCount);
    }
  });

  sliderCount.each(function() {
    $(this).slick({
      slide: '.slider-count__item',
      infinite: false,
      dots: false,
      appendArrows: $(this).find('.slider-count__control'),
      prevArrow: '<a href="" class="slick-count-prev">&lt;</a>',
      nextArrow: '<a href="" class="slick-count-prev">&gt;</a>',
    });
  });

  $("#product_img_zoom").ezPlus({
    gallery: "product_thumb",
    zoomType : "inner",
    cursor: "crosshair",
    galleryActiveClass: "active",
    imageCrossfade: false
  });

});


  



$(document).ready(function() {
  $("#up").on("click", function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow")
  })
});
$(document).ready(function() {
  $("select").styler();
  $(".input_check").styler();
  $(".radio").styler()
});
$(document).ready(function() {
  $(".fancybox-video").fancybox({
    openEffect: "none",
    closeEffect: "none",
    fitToView: false,
    width: "70%",
    height: "70%",
    padding: 0,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });
  $(".open_modal").fancybox({});
  $(".close_modal").on("click", function() {
    $.fancybox.close()
  })
});
$(document).ready(function(e) {
  e(".js-fold + .fold_content").css("display", "none");
  e(".fold_header").on("click", function() {
    var t = e(this).next(".fold_content");
    if (t.is(":hidden")) {
      e(this).removeClass("js-fold");
      t.slideDown()
    } else {
      e(this).addClass("js-fold");
      t.slideUp()
    }
  })
});
var ajaxUpdateTimeout2 = null;


var changeFilter = function() {
  var e = $("#filter").serialize();
  clearTimeout(ajaxUpdateTimeout2);
  //var t = $("input[name='gender[]']:checked");
  var n = window.location.pathname;
 // var r = encodeURIComponent($("#watch_name").val()).replace(/%20/g, "+");



  if (e) {
    var i = n + "?" + e + "&in_stock=" + +$("#in_stock_sort").is(":checked")
  } else {
    var i = n + "?in_stock=" + +$("#in_stock_sort").is(":checked");
  } if (i != window.location) {
    window.history.pushState({
      path: i
    }, document.title, i)
  }
  var e = $("#filter").serialize() + "&in_stock=" + +$("#in_stock_sort").is(":checked");
  ajaxUpdateTimeout2 = setTimeout(function() {
    $.fn.yiiListView.update("ajaxListView", {
      data: e,
      url: n
    })
  }, 300)
};


$(document).ready(function() {
  try {
    $("#price_slider").noUiSlider({
      start: [parseInt($("#price_slider_min").attr("data-value")), parseInt($("#price_slider_max").attr("data-value"))],
      connect: true,
      step: 100,
      range: {
        min: [parseInt($("#price_slider_min").val())],
        max: [parseInt($("#price_slider_max").val())]
      },
      format: wNumb({
        decimals: 1
      })
    });
    $("#price_slider").Link("lower").to($("#price_slider_min"), null, wNumb({
      prefix: "",
      decimals: 0
    }));
    $("#price_slider").Link("upper").to($("#price_slider_max"), null, wNumb({
      prefix: "",
      decimals: 0
    }));
    $("#size_slider").noUiSlider({
      start: [parseFloat($("#size_slider_min").attr("data-value")), parseFloat($("#size_slider_max").attr("data-value"))],
      connect: true,
      range: {
        min: [parseFloat($("#size_slider_min").val())],
        max: [parseFloat($("#size_slider_max").val())]
      },
      format: wNumb({
        decimals: 1
      })
    });
    $("#size_slider").Link("lower").to($("#size_slider_min"), null, wNumb({
      postfix: "",
      decimals: 1
    }));
    $("#size_slider").Link("upper").to($("#size_slider_max"), null, wNumb({
      postfix: "",
      decimals: 1
    }));
    $("#price_slider").on({
      set: function() {
        changeFilter()
      }
    });
    $("#size_slider").on({
      set: function() {
        changeFilter()
      }
    })
  } catch (e) {}
});

$(document).ready(function() {
  $(".cart_count_down").on("click", function() {
    var e = $(this).parent().find("input");
    var t = parseInt(e.val()) - 1;
    t = t < 1 ? 1 : t;
    e.val(t);
    e.change();
    return false
  });
  $(".cart_count_up").on("click", function() {
    var e = $(this).parent().find("input");
    e.val(parseInt(e.val()) + 1);
    e.change();
    return false
  });
  $("#step_form_link").on("click", function(e) {
    e.preventDefault();
    $(this).parents(".cart_next_step").fadeOut("slow");
    $("#cart_form").slideToggle("slow")
  })
});
$(document).ready(function() {
  $(".print_btn").click(function(e) {
    e.preventDefault();
    var t = document.getElementById("print_area");
    var n = document.getElementById("iframe_print").contentWindow;
    n.document.open();
    n.document.write(t.innerHTML);
    n.document.close();
    n.focus();
    n.print()
  })
});
$(document).ready(function() {
  var e = $("#preorder_form"),
    t = $("#tech_spec");
  $("#show_preorder_form").on("click", function(n) {
    n.preventDefault();
    t.slideUp("slow", function() {
      e.slideDown("slow")
    })
  });
  $("#hide_preorder").on("click", function(n) {
    n.preventDefault();
    e.slideUp(300, function() {
      t.slideDown("slow")
    })
  });
  $(".input_txt").each(function() {
    if ($(this).val() != "") $(this).prev().addClass("hide")
  });
  $(".input_txt").blur(function() {
    if ($(this).val() == "") $(this).prev().removeClass("hide")
  });
  $(".input_txt").focus(function() {
    $(this).prev().addClass("hide")
  });
  $(".input_txt").mouseover(function() {
    if ($(this).val() != "") $(this).prev().addClass("hide")
  })
});

$(document).ready(function() {
  var e = $(".collection_page"),
    t = $(".sec_menu");
  var n = function() {
    var e;
    e = ($(window).width() - $(".container").width()) / 2 + "px";
    t.css({
      left: e
    })
  };
  n();
  $(window).on("resize", function() {
    setTimeout(n(), 1e3)
  });
  e.waypoint({
    offset: 70,
    handler: function(e) {
      t.toggleClass("fixed")
    }
  });
  $(".footer_page").waypoint({
    offset: t.height() + 210,
    handler: function(e) {
      t.toggleClass("fixed");
      t.toggleClass("sticky-bottom")
    }
  });
  var r = $(".catalog_filter_count");
  r.waypoint({
    offset: r.height() + 130,
    handler: function(e) {
      r.toggleClass("fixed")
    }
  })
});
$(document).ready(function() {
  $(".jump_form input").on("input", function() {
    if ($(this).val().length == $(this).attr("maxlength")) {
      $(this).next("input").focus()
    }
  })
});

!function(e){"use strict";function t(t){var n=e("");try{n=e(t).clone()}catch(o){n=e("<span />").html(t)}return n}function n(e){return!!("object"==typeof Node?e instanceof Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName)}e.print=e.fn.print=function(){var o,r,i=this;i instanceof e&&(i=i.get(0)),n(i)?(r=e(i),arguments.length>0&&(o=arguments[0])):arguments.length>0?(r=e(arguments[0]),n(r[0])?arguments.length>1&&(o=arguments[1]):(o=arguments[0],r=e("html"))):r=e("html");var l={globalStyles:!0,mediaPrint:!1,stylesheet:null,noPrintSelector:".no-print",iframe:!0,append:null,prepend:null};o=e.extend({},l,o||{});var s=e("");o.globalStyles?s=e("style, link, meta, title"):o.mediaPrint&&(s=e("link[media=print]")),o.stylesheet&&(s=e.merge(s,e('<link rel="stylesheet" href="'+o.stylesheet+'">')));var a=r.clone();a=e("<span/>").append(a),a.find(o.noPrintSelector).remove(),a.append(s.clone()),a.append(t(o.append)),a.prepend(t(o.prepend));var c=a.html();a.remove();var m,p;if(o.iframe)try{var u=e(o.iframe+""),d=u.length;0===d&&(u=e('<iframe height="0" width="0" border="0" wmode="Opaque"/>').prependTo("body").css({position:"absolute",top:-999,left:-999})),m=u.get(0),m=m.contentWindow||m.contentDocument||m,p=m.document||m.contentDocument||m,p.open(),p.write(c),p.close(),setTimeout(function(){m.focus();try{m.document.execCommand("print",!1,null)||m.print()}catch(e){m.print()}setTimeout(function(){0===d&&u.remove()},100)},250)}catch(f){console.error("Failed to print from iframe",f.stack,f.message),m=window.open(),m.document.write(c),m.document.close(),m.focus(),m.print(),m.close()}else m=window.open(),m.document.write(c),m.document.close(),m.focus(),m.print(),m.close();return this}}(jQuery);