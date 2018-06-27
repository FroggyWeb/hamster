$(window).load(function() {
    $(".carousel").bxSlider({
        slideWidth: 326,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        infiniteLoop: false,
        hideControlOnEnd: true,
        pager: false,
        touchEnabled: false,
        onSliderLoad: function() {
            $(".carousel").each(function() {
                $(this).find("li:not(.bx-clone)").eq(1).addClass("active_slide")
            })
        },
        onSlideAfter: function(e) {
            $(e).parents(".carousel").find(".active_slide").removeClass("active_slide");
            $(e).next().addClass("active_slide")
        }
    });
    $(".nav_promo_shop_slider").bxSlider({
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        touchEnabled: false
    });
    var e = $(".promo_action_slide img").length;
    if (e > 1) {
        $(".promo_action_slide").bxSlider({
            mode: "fade",
            pager: false,
            controls: false,
            auto: true,
            pause: 6e3,
            autoHover: true
        })
    }
    $(".small_collection_list").bxSlider({
        slideWidth: 480,
        minSlides: 1,
        maxSlides: 2,
        moveSlides: 1,
        infiniteLoop: false,
        hideControlOnEnd: true,
        slideMargin: 20,
        pager: false,
        touchEnabled: false
    });
    var t = $("#fabric_history_nav").bxSlider({
        slideWidth: 171,
        pager: false,
        controls: false,
        minSlides: 5,
        maxSlides: 5,
        infiniteLoop: false,
        moveSlides: 1,
        touchEnabled: false
    });
    var n = $(".fabric_history_slider").bxSlider({
        pagerCustom: "#fabric_history_nav",
        nextSelector: "#fabric_prev",
        prevSelector: "#fabric_next",
        infiniteLoop: false,
        hideControlOnEnd: true,
        touchEnabled: false,
        onSlideBefore: function() {
            var e = n.getCurrentSlide();
            if (e > 2 && e < n.getSlideCount() - 2) {
                t.goToSlide(e - 2)
            }
        }
    });
    $(".slider_pager").fadeIn(2e3);
    var r = $(".slider_pager").bxSlider({
        pagerType: "short",
        pagerShortSeparator: " из ",
        prevText: "<",
        nextText: ">",
        touchEnabled: false
    });
    $(".shop_list_tab").easytabs();
    $(".shop_list_tab").bind("easytabs:after", function() {
        $(".slider_pager").reloadSlider()
    });
    $("#product_thumb").bxSlider({
        pager: false,
        minSlides: 4,
        maxSlides: 4,
        moveSlides: 1,
        infiniteLoop: false,
        hideControlOnEnd: true,
        slideMargin: 20,
        infiniteLoop: false,
        mode: "vertical",
        touchEnabled: false
    });
    $("#product_img_zoom").elevateZoom({
        gallery: "product_thumb",
        cursor: "crosshair",
        galleryActiveClass: "active",
        imageCrossfade: false
    });
    $(".media_slide").bxSlider({
        pagerType: "short",
        pagerShortSeparator: " из ",
        prevText: "<",
        nextText: ">"
    });
    $(".article_slider_list").bxSlider({
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        slideMargin: 20,
        slideWidth: 326,
        hideControlOnEnd: true,
        infiniteLoop: false,
        touchEnabled: false
    });
    collectSlider = $(".collection_slide").bxSlider({
        pagerType: "short",
        pagerShortSeparator: " из ",
        prevText: "<",
        nextText: ">",
        infiniteLoop: false,
        touchEnabled: false,
        onSlideBefore: function(e) {
            $(e).find(".lazy").css("visibility", "visible")
        }
    });
    $(".full_article_slider").fadeIn(2e3);
    $(".full_article_slider").bxSlider({
        pager: false,
        hideControlOnEnd: true,
        infiniteLoop: false,
        touchEnabled: false
    })
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
    var t = $("input[name='gender[]']:checked");
    var n = window.location.pathname;
    var r = encodeURIComponent($("#watch_name").val()).replace(/%20/g, "+");
    if (n != "/catalog/sale" && n != "/catalog/watch/" + r) {
        if (t.length == 1) {
            if ((n == "/catalog/men" || n == "/catalog") && t.val() == "women") {
                n = "/catalog/women";
                e = $("#filter :input[name!='gender[]']").serialize()
            }
            if ((n == "/catalog/women" || n == "/catalog") && t.val() == "men") {
                n = "/catalog/men";
                e = $("#filter :input[name!='gender[]']").serialize()
            }
        } else {
            n = "/catalog"
        }
    } else {} if (e) {
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
