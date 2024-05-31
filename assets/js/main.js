!(function (e) {
  e(window).on("load", function () {
    e(".preloader").fadeOut();
  }),
    e(".preloader").length > 0 &&
      e(".preloaderCls").each(function () {
        e(this).on("click", function (t) {
          t.preventDefault(), e(".preloader").css("display", "none");
        });
      }),
    (e.fn.vsmobilemenu = function (t) {
      var s = e.extend(
        {
          menuToggleBtn: ".vs-menu-toggle",
          bodyToggleClass: "vs-body-visible",
          subMenuClass: "vs-submenu",
          subMenuParent: "vs-item-has-children",
          subMenuParentToggle: "vs-active",
          meanExpandClass: "vs-mean-expand",
          appendElement: '<span class="vs-mean-expand"></span>',
          subMenuToggleClass: "vs-open",
          toggleSpeed: 400,
        },
        t
      );
      return this.each(function () {
        var t = e(this);
        function a() {
          t.toggleClass(s.bodyToggleClass);
          var a = "." + s.subMenuClass;
          e(a).each(function () {
            e(this).hasClass(s.subMenuToggleClass) &&
              (e(this).removeClass(s.subMenuToggleClass),
              e(this).css("display", "none"),
              e(this).parent().removeClass(s.subMenuParentToggle));
          });
        }
        t.find("li").each(function () {
          var t = e(this).find("ul");
          t.addClass(s.subMenuClass),
            t.css("display", "none"),
            t.parent().addClass(s.subMenuParent),
            t.prev("a").append(s.appendElement),
            t.next("a").append(s.appendElement);
        });
        var n = "." + s.meanExpandClass;
        e(n).each(function () {
          e(this).on("click", function (t) {
            var a;
            t.preventDefault(),
              (a = e(this).parent()),
              e(a).next("ul").length > 0
                ? (e(a).parent().toggleClass(s.subMenuParentToggle),
                  e(a).next("ul").slideToggle(s.toggleSpeed),
                  e(a).next("ul").toggleClass(s.subMenuToggleClass))
                : e(a).prev("ul").length > 0 &&
                  (e(a).parent().toggleClass(s.subMenuParentToggle),
                  e(a).prev("ul").slideToggle(s.toggleSpeed),
                  e(a).prev("ul").toggleClass(s.subMenuToggleClass));
          });
        }),
          e(s.menuToggleBtn).each(function () {
            e(this).on("click", function () {
              a();
            });
          }),
          t.on("click", function (e) {
            e.stopPropagation(), a();
          }),
          t.find("div").on("click", function (e) {
            e.stopPropagation();
          });
      });
    }),
    e(".vs-menu-wrapper").vsmobilemenu();
  var t = "",
    s = ".scrollToTop";
  e(window).on("scroll", function () {
    var a, n, o, i, r;
    (a = e(".sticky-active")),
      (n = "active"),
      (o = "will-sticky"),
      (i = e(window).scrollTop()),
      (r = a.css("height")),
      a.parent().css("min-height", r),
      e(window).scrollTop() > 800
        ? (a.parent().addClass(o), i > t ? a.removeClass(n) : a.addClass(n))
        : (a.parent().css("min-height", "").removeClass(o), a.removeClass(n)),
      (t = i),
      e(this).scrollTop() > 500
        ? e(s).addClass("show")
        : e(s).removeClass("show");
  }),
    e(s).each(function () {
      e(this).on("click", function (s) {
        return (
          s.preventDefault(),
          e("html, body").animate({ scrollTop: 0 }, t / 3),
          !1
        );
      });
    }),
    (e.fn.vsBgSetup = function () {
      e(this).each(function () {
        var t = e(this).attr("data-bg-src");
        e(this).css("background-image", "url(" + t + ")"),
          e(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }),
    (e.fn.vsMaskSetup = function () {
      e(this).each(function () {
        var t = e(this).attr("data-mask-src");
        e(this).css({
          "mask-image": "url(" + t + ")",
          "-webkit-mask-image": "url(" + t + ")",
        }),
          e(this).removeAttr("data-mask-src");
      });
    }),
    e("[data-bg-src]").vsBgSetup(),
    e("[data-mask-src]").vsMaskSetup(),
    e(".vs-carousel").each(function () {
      var t = e(this);
      function s(e) {
        return t.data(e);
      }
      var a =
          '<button type="button" class="slick-prev"><i class="' +
          s("prev-arrow") +
          '"></i></button>',
        n =
          '<button type="button" class="slick-next"><i class="' +
          s("next-arrow") +
          '"></i></button>';
      1 == s("arrows") &&
        (t.closest(".arrow-wrap").length ||
          t.closest(".container").parent().addClass("arrow-wrap")),
        t.slick({
          dots: !!s("dots"),
          fade: !!s("fade"),
          arrows: !!s("arrows"),
          speed: s("speed") ? s("speed") : 1e3,
          asNavFor: !!s("asnavfor") && s("asnavfor"),
          autoplay: 0 != s("autoplay"),
          infinite: 0 != s("infinite"),
          slidesToShow: s("slide-show") ? s("slide-show") : 1,
          adaptiveHeight: !!s("adaptive-height"),
          centerMode: !!s("center-mode"),
          autoplaySpeed: s("autoplay-speed") ? s("autoplay-speed") : 8e3,
          centerPadding: s("center-padding") ? s("center-padding") : "0",
          focusOnSelect: 0 != s("focuson-select"),
          pauseOnFocus: !!s("pauseon-focus"),
          pauseOnHover: !!s("pauseon-hover"),
          variableWidth: !!s("variable-width"),
          vertical: !!s("vertical"),
          verticalSwiping: !!s("vertical"),
          prevArrow: s("prev-arrow")
            ? a
            : '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
          nextArrow: s("next-arrow")
            ? n
            : '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
          rtl: "rtl" == e("html").attr("dir"),
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                arrows: !!s("xl-arrows"),
                dots: !!s("xl-dots"),
                slidesToShow: s("xl-slide-show")
                  ? s("xl-slide-show")
                  : s("slide-show"),
                centerMode: !!s("xl-center-mode"),
                centerPadding: s("xl-center-padding")
                  ? s("xl-center-padding")
                  : "0",
              },
            },
            {
              breakpoint: 1400,
              settings: {
                arrows: !!s("ml-arrows"),
                dots: !!s("ml-dots"),
                slidesToShow: s("ml-slide-show")
                  ? s("ml-slide-show")
                  : s("slide-show"),
                centerMode: !!s("ml-center-mode"),
                centerPadding: s("ml-center-padding")
                  ? s("ml-center-padding")
                  : "0",
              },
            },
            {
              breakpoint: 1200,
              settings: {
                arrows: !!s("lg-arrows"),
                dots: !!s("lg-dots"),
                slidesToShow: s("lg-slide-show")
                  ? s("lg-slide-show")
                  : s("slide-show"),
                centerMode: !!s("lg-center-mode"),
                centerPadding: s("lg-center-padding")
                  ? s("lg-center-padding")
                  : "0",
              },
            },
            {
              breakpoint: 992,
              settings: {
                arrows: !!s("md-arrows"),
                dots: !!s("md-dots"),
                slidesToShow: s("md-slide-show") ? s("md-slide-show") : 1,
                centerMode: !!s("md-center-mode"),
                centerPadding: s("md-center-padding")
                  ? s("md-center-padding")
                  : "0",
              },
            },
            {
              breakpoint: 767,
              settings: {
                arrows: !!s("sm-arrows"),
                dots: !!s("sm-dots"),
                slidesToShow: s("sm-slide-show") ? s("sm-slide-show") : 1,
                centerMode: !!s("sm-center-mode"),
                centerPadding: s("sm-center-padding")
                  ? s("sm-center-padding")
                  : "0",
              },
            },
            {
              breakpoint: 576,
              settings: {
                arrows: !!s("xs-arrows"),
                dots: !!s("xs-dots"),
                slidesToShow: s("xs-slide-show") ? s("xs-slide-show") : 1,
                centerMode: !!s("xs-center-mode"),
                centerPadding: s("xs-center-padding")
                  ? s("xs-center-padding")
                  : "0",
              },
            },
          ],
        });
    }),
    (e.fn.slickGoNext = function () {
      e(this).each(function () {
        e(this).on("click", function (t) {
          t.preventDefault(), e(e(this).data("slick-next")).slick("slickNext");
        });
      });
    }),
    (e.fn.slickGoPrev = function () {
      e(this).each(function () {
        e(this).on("click", function (t) {
          t.preventDefault(), e(e(this).data("slick-prev")).slick("slickPrev");
        });
      });
    }),
    e("[data-slick-next]").slickGoNext(),
    e("[data-slick-prev]").slickGoPrev();
  var a,
    n,
    o,
    i = ".ajax-contact",
    r = "is-invalid",
    l = '[name="email"]',
    c = '[name="name"],[name="email"],[name="subject"],[name="message"]',
    d = e(i).find(".form-messages");
  function p() {
    var t,
      s = e(i).serialize();
    (t = (function () {
      var t,
        s = !0;
      function a(a) {
        a = a.split(",");
        for (var n = 0; n < a.length; n++)
          (t = i + " " + a[n]),
            e(t).val()
              ? (e(t).removeClass(r), (s = !0))
              : (e(t).addClass(r), (s = !1));
      }
      a(c),
        e(l).val() &&
        e(l)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
          ? (e(l).removeClass(r), (s = !0))
          : (e(l).addClass(r), (s = !1));
      return s;
    })()),
      t &&
        jQuery
          .ajax({ url: e(i).attr("action"), data: s, type: "POST" })
          .done(function (t) {
            d.removeClass("error"),
              d.addClass("success"),
              d.text(t),
              e(i + ' input:not([type="submit"]),' + i + " textarea").val("");
          })
          .fail(function (e) {
            d.removeClass("success"),
              d.addClass("error"),
              "" !== e.responseText
                ? d.html(e.responseText)
                : d.html(
                    "Oops! An error occured and your message could not be sent."
                  );
          });
  }
  e(i).on("submit", function (e) {
    e.preventDefault(), p();
  }),
    e(".popup-image").magnificPopup({
      type: "image",
      gallery: { enabled: !0 },
    }),
    e(".popup-video").magnificPopup({ type: "iframe" }),
    e(".filter-active").imagesLoaded(function () {
      var t = ".filter-active",
        s = ".filter-menu-active";
      if (e(t).length > 0) {
        var a = e(t).isotope({
          itemSelector: ".filter-item",
          filter: "*",
          masonry: { columnWidth: 1 },
        });
        e(s).on("click", "button", function () {
          var t = e(this).attr("data-filter");
          a.isotope({ filter: t });
        }),
          e(s).on("click", "button", function (t) {
            t.preventDefault(),
              e(this).addClass("active"),
              e(this).siblings(".active").removeClass("active");
          });
      }
    }),
    (a = ".sidemenu-wrapper"),
    (n = ".sideMenuCls"),
    (o = "show"),
    e(".sideMenuToggler").on("click", function (t) {
      t.preventDefault(), e(a).addClass(o);
    }),
    e(a).on("click", function (t) {
      t.stopPropagation(), e(a).removeClass(o);
    }),
    e(a + " > div").on("click", function (t) {
      t.stopPropagation(), e(a).addClass(o);
    }),
    e(n).on("click", function (t) {
      t.preventDefault(), t.stopPropagation(), e(a).removeClass(o);
    }),
    (function (t, s, a, n) {
      e(s).on("click", function (s) {
        s.preventDefault(), e(t).addClass(n);
      }),
        e(t).on("click", function (s) {
          s.stopPropagation(), e(t).removeClass(n);
        }),
        e(t)
          .find("form")
          .on("click", function (s) {
            s.stopPropagation(), e(t).addClass(n);
          }),
        e(a).on("click", function (s) {
          s.preventDefault(), s.stopPropagation(), e(t).removeClass(n);
        });
    })(".popup-search-box", ".searchBoxTggler", ".searchClose", "show"),
    e("#ship-to-different-address-checkbox").on("change", function () {
      e(this).is(":checked")
        ? e("#ship-to-different-address").next(".shipping_address").slideDown()
        : e("#ship-to-different-address").next(".shipping_address").slideUp();
    }),
    e(".woocommerce-form-login-toggle a").on("click", function (t) {
      t.preventDefault(), e(".woocommerce-form-login").slideToggle();
    }),
    e(".woocommerce-form-coupon-toggle a").on("click", function (t) {
      t.preventDefault(), e(".woocommerce-form-coupon").slideToggle();
    }),
    e(".shipping-calculator-button").on("click", function (t) {
      t.preventDefault(),
        e(this).next(".shipping-calculator-form").slideToggle();
    }),
    e('.wc_payment_methods input[type="radio"]:checked')
      .siblings(".payment_box")
      .show(),
    e('.wc_payment_methods input[type="radio"]').each(function () {
      e(this).on("change", function () {
        e(".payment_box").slideUp(),
          e(this).siblings(".payment_box").slideDown();
      });
    }),
    e(".rating-select .stars a").each(function () {
      e(this).on("click", function (t) {
        t.preventDefault(),
          e(this).siblings().removeClass("active"),
          e(this).parent().parent().addClass("selected"),
          e(this).addClass("active");
      });
    }),
    e(".quantity-plus").each(function () {
      e(this).on("click", function (t) {
        t.preventDefault();
        var s = e(this).siblings(".qty-input"),
          a = parseInt(s.val());
        isNaN(a) || s.val(a + 1);
      });
    }),
    e(".quantity-minus").each(function () {
      e(this).on("click", function (t) {
        t.preventDefault();
        var s = e(this).siblings(".qty-input"),
          a = parseInt(s.val());
        !isNaN(a) && a > 1 && s.val(a - 1);
      });
    }),
    (e.fn.shapeMockup = function () {
      e(this).each(function () {
        var t = e(this),
          s = t.data("top"),
          a = t.data("right"),
          n = t.data("bottom"),
          o = t.data("left");
        t.css({ top: s, right: a, bottom: n, left: o })
          .removeAttr("data-top")
          .removeAttr("data-right")
          .removeAttr("data-bottom")
          .removeAttr("data-left")
          .parent()
          .addClass("shape-mockup-wrap");
      });
    }),
    e(".shape-mockup") && e(".shape-mockup").shapeMockup(),
    e("#slider-range").slider({
      range: !0,
      min: 40,
      max: 300,
      values: [60, 570],
      slide: function (t, s) {
        e("#minAmount").text("$" + s.values[0]),
          e("#maxAmount").text("$" + s.values[1]);
      },
    }),
    e("#minAmount").text("$" + e("#slider-range").slider("values", 0)),
    e("#maxAmount").text("$" + e("#slider-range").slider("values", 1)),
    new WOW({
      boxClass: "wow",
      animateClass: "wow-animated",
      offset: 0,
      mobile: !1,
      live: !0,
      scrollContainer: null,
      resetAnimation: !1,
    }).init(),
    e(".vs-hero-carousel").each(function () {
      var t = e(this);
      function s(e) {
        return t.data(e);
      }
      var a = ".thumb",
        n = "data-slide-go";
      t
        .on("sliderDidLoad", function (s, o) {
          var i = o.slides.current.index,
            r = 1;
          t.find(a).each(function () {
            e(this).attr(n, r),
              r++,
              e(this).on("click", function (s) {
                s.preventDefault();
                var a = e(this).attr(n);
                t.layerSlider(parseInt(a));
              });
          }),
            e(a + "[" + n + '="' + i + '"').addClass("active");
        })
        .on("slideChangeDidComplete", function (t, s) {
          var o = s.slides.current.index,
            i = a + "[" + n + '="' + o + '"';
          e(i).addClass("active"), e(i).siblings().removeClass("active");
        }),
        t.on("sliderWillLoad", function (e, t) {
          var s = jQuery(this).find(".ls-responsive"),
            a = jQuery(window).width();
          s.each(function () {
            var e = jQuery(this);
            function t(t) {
              return "" === e.data(t) ? e.data(null) : e.data(t);
            }
            var s = t(
                a < 767
                  ? "ls-mobile"
                  : a < 992
                  ? "ls-tablet"
                  : a < 1025
                  ? "ls-laptop"
                  : "ls-desktop"
              ),
              n = void 0 !== e.attr("style") ? e.attr("style") : " ";
            e.attr("style", n + s);
          });
        }),
        t.layerSlider({
          allowRestartOnResize: !0,
          maxRatio: s("maxratio") ? s("maxratio") : 1,
          type: s("slidertype") ? s("slidertype") : "responsive",
          pauseOnHover: !!s("pauseonhover"),
          navPrevNext: !!s("navprevnext"),
          hoverPrevNext: !!s("hoverprevnext"),
          hoverBottomNav: !!s("hoverbottomnav"),
          navStartStop: !!s("navstartstop"),
          navButtons: !!s("navbuttons"),
          loop: !1 !== s("loop"),
          autostart: !!s("autostart"),
          height: s("height") ? s("height") : 1080,
          responsiveUnder: s("responsiveunder") ? s("responsiveunder") : 1220,
          layersContainer: s("container") ? s("container") : 1220,
          showCircleTimer: !!s("showcircletimer"),
          skinsPath: "layerslider/skins/",
          thumbnailNavigation: !1 !== s("thumbnailnavigation"),
          startInViewport: !1,
          allowFullscreen: !1,
        });
    }),
    e("#testis_4_1").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      autoplay: !0,
      autoplaySpeed: 6e3,
      fade: !1,
      speed: 1e3,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: !0,
      asNavFor: "#testis_4_2, #testis_4_3",
      responsive: [{ breakpoint: 1500, settings: { arrows: !1 } }],
    }),
    e("#testis_4_2").slick({
      dots: !1,
      infinite: !0,
      arrows: !1,
      autoplay: !0,
      autoplaySpeed: 6e3,
      fade: !1,
      speed: 1e3,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: !0,
      centerPadding: "0",
      focusOnSelect: !0,
      asNavFor: "#testis_4_1, #testis_4_3",
    }),
    e("#testis_4_3").slick({
      dots: !1,
      infinite: !0,
      arrows: !1,
      autoplay: !0,
      autoplaySpeed: 6e3,
      fade: !1,
      speed: 1e3,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: !0,
      asNavFor: "#testis_4_2, #testis_4_1",
    }),
    e(".dateTime-pick").datetimepicker({
      timepicker: !0,
      datepicker: !0,
      format: "y-m-d H:i",
      hours12: !1,
      step: 30,
    }),
    e(".date-pick").datetimepicker({
      timepicker: !1,
      datepicker: !0,
      format: "m-d-y",
      step: 10,
    }),
    e(".time-pick").datetimepicker({
      datepicker: !1,
      timepicker: !0,
      format: "H:i",
      hours12: !1,
      step: 10,
    }),
    e(".accordion-button").on("click", function () {
      e(this)
        .closest(".accordion-item")
        .toggleClass("active")
        .siblings()
        .removeClass("active");
    }),
    new universalParallax().init();
})(jQuery);
