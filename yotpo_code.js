require(["jquery", "magiccart/slick", "mobileDetect"], function (
  $,
  slick,
  mobileDetect
) {
  $(document).ready(function () {
    let mobileTabsClass = "items-tabs";
    let desktopTabClass = "data-tabs-content";
    let mobileWidth = 768;

    initAccordion();

    function resizeAccordion() {
      const mobileAccordion = document.querySelector("#accordion-mobile");
      mobileAccordion.classList.remove(mobileTabsClass);
      mobileAccordion.classList.remove(desktopTabClass);
      mobileAccordion.classList.add(
        window.innerWidth < mobileWidth ? mobileTabsClass : desktopTabClass
      );
    }

    function initAccordion() {
      openAccordionItem(0);

      $(".item.title").on("click", function () {
        openAccordionItem($(this).data("index"));
      });

      resizeAccordion();

      window.addEventListener("resize", resizeAccordion);
    }

    function refreshRelatedProducts() {
      if (
        $("body.catalog-product-view .products-related .slick-initialized")
          .length
      ) {
        var related = $(
          "body.catalog-product-view .products-related .product-items"
        );
        related.slick("refresh");
      }
    }

    function openAccordionItem(index) {
      const titles = document.querySelectorAll(".data.item.title");
      let opened = false;

      titles.forEach(function (titleElement) {
        if (
          titleElement.dataset["index"] != index ||
          titleElement.classList.contains("active")
        ) {
          opened = titleElement.dataset["index"] == index || opened;
          titleElement.classList.remove("active");
        } else {
          titleElement.classList.add("active");
        }
      });

      document.querySelectorAll(".item.content").forEach(function (e) {
        const display =
          e.dataset["index"] != index || opened ? "none" : "block";
        e.style.display = display;
      });

      refreshRelatedProducts();
    }

    if (mobileDetect) {
      $(".yotpoBottomLine > .bottomLine").on("click", function () {
        $("#tab-label-yotpo_widget_div-mobile-title").trigger("click");
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $("#yotpo_widget_div-mobile").offset().top + 80,
          },
          500
        );
      });

      $(".yotpoBottomLine > .QABottomLine").on("click", function () {
        $("#tab-label-yotpo_widget_div-mobile-title").trigger("click");
        $(".write-question-button").trigger("click");
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $("#yotpo_widget_div-mobile").offset().top + 150,
          },
          500
        );
      });

      if (window.location.hash === "#yotpo_widget_div") {
        setTimeout(function () {
          $("#tab-label-yotpo_widget_div-mobile-title").trigger("click");
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $("#yotpo_widget_div-mobile").offset().top + 80,
            },
            500
          );
        }, 1500);
      }
    } else {
      $(".yotpoBottomLine > .bottomLine").on("click", function () {
        $("#tab-label-yotpo_widget_div").trigger("click");
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $("#yotpo_widget_div").offset().top - 20,
          },
          500
        );
      });

      $(".yotpoBottomLine > .QABottomLine").on("click", function () {
        $("#tab-label-yotpo_widget_div").trigger("click");
        $(".write-question-button").trigger("click");
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $("#yotpo_widget_div").offset().top - 20,
          },
          500
        );
      });

      if (window.location.hash === "#yotpo_widget_div") {
        window.location.hash = "";
        setTimeout(function () {
          $("#tab-label-yotpo_widget_div").trigger("click");
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $("#yotpo_widget_div").offset().top - 20,
            },
            500
          );
        }, 1500);
      }
    }

    // Update review url only for mobile
    /*if (mobileDetect) {
                $review_url = $('.product-reviews-summary .reviews-actions .action').attr('href');

                if ($('div').hasClass('yotpo_widget_div-class')) {
                    $review_url_mobile = $review_url.replace('#review-form', '#tab-label-yotpo_widget_div-mobile-title').replace('#reviews', '#reviews-mobile');
                } else {
                    $review_url_mobile = $review_url.replace('#review-form', '#tab-label-reviews-mobile-title').replace('#reviews', '#reviews-mobile');
                }

                $('.product-reviews-summary .reviews-actions .action').attr('href', $review_url_mobile);
            }*/
  });
  $(".product.data.items.mobile .item.title").on(
    "dimensionsChanged",
    function (e, data) {
      if (mobileDetect && data.opened === true) {
        var theTarget = $(this).find(".switch").attr("href");
        if (!theTarget || !$(theTarget).offset()) {
          return;
        }
        $("html,body").animate(
          { scrollTop: $(theTarget).offset().top - 50 },
          "fast"
        );
      }
    }
  );
});
