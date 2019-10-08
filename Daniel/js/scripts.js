!function ($) {

    "use strict";


    //MAKE SURE TABS HAVE PROPER ARIA-SELECTED ATTRIBUTE WHEN SHOWN/HIDDEN
    $('.nav.nav-tabs>li>a').attr("aria-selected", false);
    $('.nav.nav-tabs>li.active>a').attr("aria-selected", true);
    $('.nav.nav-tabs>li>a').on('shown.bs.tab', function (e) {
        $(this).attr("aria-selected", true)
    }).on('hidden.bs.tab', function (e) {
        $(this).attr("aria-selected", false)
    });


    // TABCOLLAPSE CLASS DEFINITION
    // ======================

    var TabCollapse = function (el, options) {
        this.options = options;
        this.$tabs = $(el);

        this._accordionVisible = false; //content is attached to tabs at first
        this._initAccordion();
        this._checkStateOnResize();


        // checkState() has gone to setTimeout for making it possible to attach listeners to
        // shown-accordion.bs.tabcollapse event on page load.
        // See https://github.com/flatlogic/bootstrap-tabcollapse/issues/23
        var that = this;
        setTimeout(function () {
            that.checkState();
        }, 0);
    };

    TabCollapse.DEFAULTS = {
        accordionClass: 'visible-xs',
        tabsClass: 'hidden-xs',
        accordionTemplate: function (heading, groupId, parentId, active) {
            return '<div class="panel panel-default">' +
                '   <div class="panel-heading">' +
                '      <h4 class="panel-title">' +
                '      </h4>' +
                '   </div>' +
                '   <div id="' + groupId + '" class="panel-collapse collapse">' +
                '       <div class="panel-body js-tabcollapse-panel-body">' +
                '       </div>' +
                '   </div>' +
                '</div>'

        }
    };

    TabCollapse.prototype.checkState = function () {
        if (this.$tabs.is(':visible') && this._accordionVisible) {
            this.showTabs();
            this._accordionVisible = false;
        } else if (this.$accordion.is(':visible') && !this._accordionVisible) {
            this.showAccordion();
            this._accordionVisible = true;
        }
    };

    TabCollapse.prototype.showTabs = function () {
        var view = this;
        this.$tabs.trigger($.Event('show-tabs.bs.tabcollapse'));

        var $panelHeadings = this.$accordion.find('.js-tabcollapse-panel-heading').detach();

        $panelHeadings.each(function () {
            var $panelHeading = $(this),
                $parentLi = $panelHeading.data('bs.tabcollapse.parentLi');

            var $oldHeading = view._panelHeadingToTabHeading($panelHeading);

            $parentLi.removeClass('active');
            if ($parentLi.parent().hasClass('dropdown-menu') && !$parentLi.siblings('li').hasClass('active')) {
                $parentLi.parent().parent().removeClass('active');
            }

            if (!$oldHeading.hasClass('collapsed')) {
                $parentLi.addClass('active');
                if ($parentLi.parent().hasClass('dropdown-menu')) {
                    $parentLi.parent().parent().addClass('active');
                }
            } else {
                $oldHeading.removeClass('collapsed');
            }

            $parentLi.append($panelHeading);
        });

        if (!$('li').hasClass('active')) {
            $('li').first().addClass('active')
        }

        var $panelBodies = this.$accordion.find('.js-tabcollapse-panel-body');
        $panelBodies.each(function () {
            var $panelBody = $(this),
                $tabPane = $panelBody.data('bs.tabcollapse.tabpane');
            $tabPane.append($panelBody.contents().detach());
        });
        this.$accordion.html('');

        if (this.options.updateLinks) {
            var $tabContents = this.getTabContentElement();
            $tabContents.find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function () {
                var $el = $(this);
                var href = $el.attr('href').replace(/-collapse$/g, '');
                $el.attr({
                    'data-toggle': $el.attr('data-toggle-was'),
                    'data-toggle-was': '',
                    'data-parent': '',
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-tabs.bs.tabcollapse'));
    };

    TabCollapse.prototype.getTabContentElement = function () {
        var $tabContents = $(this.options.tabContentSelector);
        if ($tabContents.length === 0) {
            $tabContents = this.$tabs.siblings('.tab-content');
        }
        return $tabContents;
    };

    TabCollapse.prototype.showAccordion = function () {
        this.$tabs.trigger($.Event('show-accordion.bs.tabcollapse'));

        var $headings = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'),
            view = this;
        $headings.each(function () {
            var $heading = $(this),
                $parentLi = $heading.parent();
            $heading.data('bs.tabcollapse.parentLi', $parentLi);
            view.$accordion.append(view._createAccordionGroup(view.$accordion.attr('id'), $heading.detach()));
        });

        if (this.options.updateLinks) {
            var parentId = this.$accordion.attr('id');
            var $selector = this.$accordion.find('.js-tabcollapse-panel-body');
            $selector.find('[data-toggle="tab"], [data-toggle="pill"]').each(function () {
                var $el = $(this);
                var href = $el.attr('href') + '-collapse';
                $el.attr({
                    'data-toggle-was': $el.attr('data-toggle'),
                    'data-toggle': 'collapse',
                    'data-parent': '#' + parentId,
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-accordion.bs.tabcollapse'));
    };

    TabCollapse.prototype._panelHeadingToTabHeading = function ($heading) {
        var href = $heading.attr('href').replace(/-collapse$/g, '');
        $heading.attr({
            'data-toggle': 'tab',
            'href': href,
            'data-parent': ''
        });
        return $heading;
    };

    TabCollapse.prototype._tabHeadingToPanelHeading = function ($heading, groupId, parentId, active) {
        $heading.addClass('js-tabcollapse-panel-heading ');
        $heading.attr({
            'data-toggle': 'collapse',
            'data-parent': '#' + parentId,
            'href': '#' + groupId
        });
        return $heading;
    };

    TabCollapse.prototype._checkStateOnResize = function () {
        var view = this;
        $(window).resize(function () {
            clearTimeout(view._resizeTimeout);
            view._resizeTimeout = setTimeout(function () {
                view.checkState();
            }, 100);
        });
    };


    TabCollapse.prototype._initAccordion = function () {
        var randomString = function () {
            var result = "",
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
                result += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return result;
        };

        var srcId = this.$tabs.attr('id'),
            accordionId = (srcId ? srcId : randomString()) + '-accordion';

        this.$accordion = $('<div class="panel-group ' + this.options.accordionClass + '" id="' + accordionId + '"></div>');
        this.$tabs.after(this.$accordion);
        this.$tabs.addClass(this.options.tabsClass);
        this.getTabContentElement().addClass(this.options.tabsClass);
    };

    TabCollapse.prototype._createAccordionGroup = function (parentId, $heading) {
        var tabSelector = $heading.attr('data-target'),
            active = $heading.data('bs.tabcollapse.parentLi').is('.active');

        if (!tabSelector) {
            tabSelector = $heading.attr('href');
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $tabPane = $(tabSelector),
            groupId = $tabPane.attr('id') + '-collapse',
            $panel = $(this.options.accordionTemplate($heading, groupId, parentId, active));
        $panel.find('.panel-heading > .panel-title').append(this._tabHeadingToPanelHeading($heading, groupId, parentId, active));
        $panel.find('.panel-body').append($tabPane.contents().detach())
            .data('bs.tabcollapse.tabpane', $tabPane);

        return $panel;
    };


    // TABCOLLAPSE PLUGIN DEFINITION
    // =======================

    $.fn.tabCollapse = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.tabcollapse');
            var options = $.extend({}, TabCollapse.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('bs.tabcollapse', new TabCollapse(this, options));
        });
    };

    $.fn.tabCollapse.Constructor = TabCollapse;
    $('#quick-links').find('.nav-tabs').tabCollapse();

}(window.jQuery);


// share button
(function (window, document) {
    var imageCaption = document.getElementById('shareit');
    var captionButton;
    var imageCredit;

    if (imageCaption !== null) {
        captionButton = imageCaption;
        imageCredit = imageCaption.parentElement.getElementsByClassName('sharebox')[0];

        captionButton.addEventListener('click', function (evt) {

            var creditDisplayStyle = window.getComputedStyle(imageCredit, null).getPropertyValue("display");
            var pressed = captionButton.getAttribute('aria-expanded');

            if (pressed === 'false') {
                captionButton.setAttribute('aria-expanded', 'true');
            } else {
                captionButton.setAttribute('aria-expanded', 'false');
            }

            if (creditDisplayStyle == "none") {
                imageCredit.style.display = "block";
            } else {
                imageCredit.style.display = "none";
            }

            imageCredit.focus();
            evt.stopPropagation();
        });

        imageCredit.addEventListener('keydown', function (evt) {
            if ((evt.keyCode || evt.which) === 27) { // escape pressed.
                var pressed = captionButton.getAttribute('aria-expanded');
                if (pressed === 'false') {
                    //console.log( pressed );
                    captionButton.setAttribute('aria-expanded', 'true');
                } else {
                    //console.log( pressed );
                    captionButton.setAttribute('aria-expanded', 'false');
                }
                captionButton.focus();
                imageCredit.style.display = "none";
            }
            evt.stopPropagation();
        });

    } else {
        return;
    }

    window.addEventListener("resize", function () {
        // assume for example purpses that 'myHeader' references a collapsible header...
        if (window.getComputedStyle(imageCaption, null).getPropertyValue("visibility") === "hidden") {
            // remove the role, aria, and tabindex attributes from the heading and div
            imageCaption.removeAttribute('aria-haspopup');
            imageCaption.removeAttribute('aria-expanded');
            imageCaption.removeAttribute('aria-controls');
        } else {
            // add the role, aria, and tabindex attributes from the heading and div
            imageCaption.setAttribute('aria-haspopup', 'true');
            imageCaption.setAttribute('aria-expanded', 'false');
            imageCaption.setAttribute('aria-controls', 'sharebox');
            imageCredit.style.display = "none";
        }
    });

})(window, document);
// end share button

/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    var e = -1, o = -1, i = function (t) {
        return parseFloat(t) || 0
    }, a = function (e) {
        var o = 1, a = t(e), n = null, r = [];
        return a.each(function () {
            var e = t(this), a = e.offset().top - i(e.css("margin-top")), s = r.length > 0 ? r[r.length - 1] : null;
            null === s ? r.push(e) : Math.floor(Math.abs(n - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), n = a
        }), r
    }, n = function (e) {
        var o = {
            byRow: !0, property: "height", target: null, remove: !1
        };
        return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
    }, r = t.fn.matchHeight = function (e) {
        var o = n(e);
        if (o.remove) {
            var i = this;
            return this.css(o.property, ""), t.each(r._groups, function (t, e) {
                e.elements = e.elements.not(i)
            }), this
        }
        return this.length <= 1 && !o.target ? this : (r._groups.push({
            elements: this,
            options: o
        }), r._apply(this, o), this)
    };
    r.version = "0.7.0", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
        r._afterUpdate = null, r._rows = a, r._parse = i, r._parseOptions = n, r._apply = function (e, o) {
        var s = n(o), h = t(e), l = [h], c = t(window).scrollTop(), p = t("html").outerHeight(!0),
            d = h.parents().filter(":hidden");
        return d.each(function () {
            var e = t(this);
            e.data("style-cache", e.attr("style"))
        }), d.css("display", "block"), s.byRow && !s.target && (h.each(function () {
            var e = t(this), o = e.css("display");
            "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), l = a(h), h.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
        })), t.each(l, function (e, o) {
            var a = t(o), n = 0;
            if (s.target) n = s.target.outerHeight(!1); else {
                if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                a.each(function () {
                    var e = t(this), o = e.attr("style"), i = e.css("display");
                    "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                    var a = {
                        display: i
                    };
                    a[s.property] = "", e.css(a), e.outerHeight(!1) > n && (n = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
                })
            }
            a.each(function () {
                var e = t(this), o = 0;
                s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += i(e.css("border-top-width")) + i(e.css("border-bottom-width")), o += i(e.css("padding-top")) + i(e.css("padding-bottom"))), e.css(s.property, n - o + "px"))
            })
        }), d.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null)
        }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
            this
    }, r._applyDataApi = function () {
        var e = {};
        t("[data-match-height], [data-mh]").each(function () {
            var o = t(this), i = o.attr("data-mh") || o.attr("data-match-height");
            i in e ? e[i] = e[i].add(o) : e[i] = o
        }), t.each(e, function () {
            this.matchHeight(!0)
        })
    };
    var s = function (e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
            r._apply(this.elements, this.options)
        }), r._afterUpdate && r._afterUpdate(e, r._groups)
    };
    r._update = function (i, a) {
        if (a && "resize" === a.type) {
            var n = t(window).width();
            if (n === e) return;
            e = n;
        }
        i ? -1 === o && (o = setTimeout(function () {
            s(a), o = -1
        }, r._throttle)) : s(a)
    }, t(r._applyDataApi), t(window).bind("load", function (t) {
        r._update(!1, t)
    }), t(window).bind("resize orientationchange", function (t) {
        r._update(!0, t)
    })
});


// var mobileNavPopulated = false; // Used in navDropdowns() which is being removed & this should be too

$(function () {
    $('body').addClass('loaded');


    /////pg added trappy constrains tab in menu while in mobile view
    function trappy(evt) {
        var element = evt.currentTarget;
        var focusableEls = element.querySelectorAll('button');
        var firstFocusableEl = focusableEls[0];
        var lastButton = focusableEls[focusableEls.length - 1];
        var lastLink = element.getElementsByClassName('lastMenuLink')[0];
        var lastFocusableEl;
        var KEYCODE_TAB = 9;

        var isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
            return;
        }
        if (lastLink.offsetWidth > 0) {
            lastFocusableEl = lastLink;
        } else {
            lastFocusableEl = lastButton;
        }

        if (evt.shiftKey) { /* shift + tab */
            if (document.activeElement === firstFocusableEl || document.activeElement === element) {
                lastFocusableEl.focus();
                evt.preventDefault();
            }
        } else { /* tab */
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                evt.preventDefault();
            }
        }

    }

    $('#nav-trigger').cotKeydownEvents();
    $('#main-nav').cotKeydownEvents();
    // Open/Close main nav on mobile
    $('#nav-trigger').click(function () { // modified by pg
        var mainNav = document.getElementById('main-nav');
        if ($(this).hasClass('open')) {
            // mobile menu is open clean up the sub menus & close
            $('#main-nav').find('button').attr('aria-expanded', 'false');
            $('#main-nav').find('div.dropdown').removeClass('force-open');
            $('#main-nav').removeAttr("tabindex");
            $('#main-nav').removeClass('show');

            mainNav.removeEventListener('keydown', trappy, true);
            $(this).attr('aria-expanded', 'false');
            $(this).focus();

        } else { // opening the mobile menu
            $('#main-nav').addClass('show').attr("tabindex", "-1");

            setTimeout(function () {
                $('#main-nav button').first().focus();
            }, 10);

            mainNav.addEventListener('keydown', trappy, true);
            $(this).attr('aria-expanded', 'true');

        }
        $(this).toggleClass('open');

        $('body').toggleClass('no-scroll');

    }).on('downArrowKeyDown', function (evt) {
        evt.preventDefault();
        $(this).trigger('click'); // send click to #nav-trigger button

    });

    $('#main-nav').on('escapeKeyDown', function (evt) {
        $('#nav-trigger.mobile').trigger('click'); // send click to #nav-trigger button
    });


    // Text resizer
    var fontSizeInitial = parseInt($('body').css('font-size')),
        fontSize = fontSizeInitial;
    $('#header').find('#text-decrease').click(function () {
        if (fontSize > 8) {
            fontSize--;
            resizeText(fontSize, 'decrease');
        }
    });
    $('#header').find('#text-increase').click(function () {
        if (fontSize < 24) {
            fontSize++;
            resizeText(fontSize, 'increase');
        }
    });

    // Cycle tabbing for modals
    $('.modal').on('shown.bs.modal', function () {
        var firstChild = $(this).find('.close'),
            lastChild = $(this).find('a:last');
        firstChild.focus().on('keydown', function (event) {
            if (event.which === 9 && event.shiftKey) { // shift-TAB pressed
                event.preventDefault();
                lastChild.focus();
            }
        });
        lastChild.on('keydown', function (event) {
            if (event.which === 9 && !(event.shiftKey | event.ctrlKey | event.metaKey | event.altKey)) { // TAB pressed
                event.preventDefault();
                firstChild.focus();
            }
        });
    });

    $('.carousel').carousel();

    // Collapse styles for interior sub-nav
    if ($('#sub-nav').length > 0) {
        $('#sub-nav').find('li').each(function () {
            // Add button to toggle child content
            if ($(this).find('ul').length > 0) {
                $(this).addClass('parent').find('> a').after('<button aria-haspopup="true" aria-expanded="false">Expand ' + $(this).find('> a').text() + ' menu</button>');
            }
            $(this).find('button').click(function () {
                $(this).attr('aria-expanded', !$(this).hasClass('open'));
                if ($(this).hasClass('open')) {
                    $(this).text($(this).text().replace("Collapse", "Expand"));
                } else {
                    $(this).text($(this).text().replace("Expand", "Collapse"));
                }
                $(this).toggleClass('open').find('~ ul').slideToggle();
            });
        });
        $('.page_item_has_children.current_page_item.parent').find('>button').each(function (x, button) {
            var $button = $(button);
            $button.attr('aria-expanded', 'true').addClass('open').text("Collapse " + $button.prev('a').text() + " menu");
        });
    }

    // Homepage specific
    if ($('body').hasClass('homepage')) {
        $('#home-carousel').find('.carousel-indicators li').click(function () {
            $('#home-carousel').carousel('pause');
        });

        if ($(window).width() + getScrollBarWidth() > 767) {
            resizeFunctions();
        } else {
            quickLinksMobile();
        }
    }
});

resizeFunctions();


$(window).on('resize', function () {
    clearTimeout(resizeTimer);
    var resizeTimer = setTimeout(function () {
        resizeFunctions();
    }, 200); // Only fire resize event after set time to prevent lag
});

function quickLinksMobile() {
    // Change tabs to accordion - see tabCollapse.js
    //debugger;
    $('#quick-links').find('.nav-tabs').tabCollapse();
}

function quickLinksPos() {
    // Position quicklinks at bottom of slider
    if ($(window).width() + getScrollBarWidth() > 767) {
        var quickLinksHeight = $('#quick-links').find('.nav-tabs').height();
        $('#main').css('margin-top', -quickLinksHeight);
        $('.carousel-indicators, .carousel-caption').css('bottom', quickLinksHeight);
    } else {
        $('#main').css('margin-top', 0);
        $('.carousel-indicators').css('bottom', 0);
        $('.carousel-caption').css('bottom', 10);
    }
}


;(function (window, document, $, undefined) {
    //
    var checkButton;

    // define debounce 
    var cotDebounce = function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }; // end cotDebounce

    var checkMobileView = function mobileView() {
        if (checkButton.offsetWidth > 0 && checkButton.offsetHeight > 0) {
            if (checkButton.classList.contains('mobile')) {
                //console.log( 'button is visible & already has mobile assigned do nothing' );
                return;
            } else {
                // console.log( 'button is visible but needs mobile to be assigned');
                checkButton.classList.add('mobile');
            }
        } else {
            if (checkButton.classList.contains('mobile')) {
                // console.log( 'button is not visible but needs mobile to be removed');
                checkButton.classList.remove('mobile');
            } else {
                // console.log( 'button is not visible but mobile is not present do nothing');
                return;
            }
        }
    }; // end checkMobileView

    var initialLoad = function DOMLoaded() {
        // console.info("DOM loaded");
        var mobileView = false;
        checkButton = document.getElementById('nav-trigger');
        if (checkButton.offsetWidth > 0 && checkButton.offsetHeight > 0) {
            //console.log( 'button takes up space - start mobile' );
            checkButton.classList.add('mobile');
            $('#header-left').append($('#main-nav')); // starting in mobile move nav into position
            mobileView = true;
        } else { // we're starting desktop
            // console.log('start desktop');
            $('#main-nav').find('> ul > li > span').on('mouseover', function () {
                //if ($(window).width() > 991) { // Fixes desktop to mobile resize
                $(this).addClass('focus');
                $(this).next('.dropdown').show();
                //}
            });

            $('#main-nav').find('> ul > li > span').on('mouseout', function () {
                //if ($(window).width() > 991) { // Fixes desktop to mobile resize
                $(this).removeClass('focus');
                //}
            });
        } // end else

        // Select the nodes that will be observed for mutations
        var mobileDiv = document.getElementById('header-left');

        // Options for the observer (which mutations to observe)
        var mobileObserverConfig = {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true
        };

        // Callback function to execute when mutations are observed
        var mobileObserverCallback = function mobileObserverCallback(mutationsList) {
            //console.log( 'in the mobileOberserverCallback' );
            var openRE = RegExp('open');
            var mobileRE = RegExp('mobile');
            mutationsList.forEach(function (mutation) {
                if (mutation.type == 'attributes') {
                    if (mobileRE.test(mutation.oldValue) && mobileRE.test(mutation.target.getAttribute(mutation.attributeName))) {
                        //console.info( "nothing to do mobile mobile" );
                        //console.log( mutation.target );
                        return;
                    }
                    if (!mobileRE.test(mutation.oldValue) && mobileRE.test(mutation.target.getAttribute(mutation.attributeName))) {
                        //console.log(' we went from desktop to mobile');
                        //console.log( mutation.target );

                        $('#main-nav').find('> ul > li > span').off('mouseover');
                        $('#main-nav').find('> ul > li > span').off('mouseout');
                        $('#header-left').append($('#main-nav')); // going to mobile move nav into position
                        return;
                    }
                    if (mobileRE.test(mutation.oldValue) && !mobileRE.test(mutation.target.getAttribute(mutation.attributeName))) {
                        //console.log(' we went from mobile to desktop');
                        //console.log( mutation.target );
                        $('#header-right').append($('#main-nav')); // going to desktop from mobile move nav into position

                        $('#main-nav').find('> ul > li > span').on('mouseover', function () {
                            //if ($(window).width() > 991) { // Fixes desktop to mobile resize
                            $(this).addClass('focus');
                            $(this).next('.dropdown').show();
                            //}
                        });

                        $('#main-nav').find('> ul > li > span').on('mouseout', function () {
                            //if ($(window).width() > 991) { // Fixes desktop to mobile resize
                            $(this).removeClass('focus');
                            //}
                        });
                        return;
                    }

                }
            }); // end foreach

        }; // end definition of mobileObserverCallback

        // Create an observer instance linked to the callback function
        var mobileObserver = new MutationObserver(mobileObserverCallback);
        // Start observing the target node for configured mutations
        mobileObserver.observe(mobileDiv, mobileObserverConfig);

        var navResize = cotDebounce(checkMobileView, 150);
        window.addEventListener('resize', navResize);
    }; // end DOMLoaded handling


    // `DOMContentLoaded` may fire before your script has a chance to run, so check before adding a listener
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialLoad);
    } else {  // `DOMContentLoaded` already fired
        initialLoad();
    }

})(window, document, jQuery); // end iife


function resizeFunctions() {
    // Recalculate on window resize
    // pg removed navDropdowns();

    if ($(window).width() > 991) {
        $('body').removeClass('no-scroll');
    }
    if ($('body').hasClass('homepage')) {
        if ($(window).width() <= 767) {
            quickLinksMobile();
        }
        quickLinksPos();
        resizeQuickLinks();
        resizeThumbnails();
    }
}

function getScrollBarWidth() {
    var $outer = $('<div>').css({
            visibility: 'hidden',
            width: 100,
            overflow: 'scroll'
        }).appendTo('body'),
        widthWithScroll = $('<div>').css('width', '100%').appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}


function resizeQuickLinks() {
    if ($(window).width() + getScrollBarWidth() > 767) {
        $('#quick-links').find('.nav-tabs a').matchHeight({property: 'min-height'})
    } else {
        $('#quick-links').find('.nav-tabs a').css('min-height', 0);
    }
}

function resizeText(fontSize, headings) {
    $('body').css('font-size', fontSize);
    $('h1, h2, h3, h4, h5, h6').each(function () {
        // Bootstrap headings are not in em and resizing via variables opens up a ton of sizing issues for components
        var currentSize = parseInt($(this).css('font-size')), newSize = currentSize;
        if (headings == 'increase') {
            newSize = currentSize + 1;
        } else if (headings == 'decrease') {
            newSize = currentSize - 1;
        }
        $(this).css('font-size', newSize + 'px');
    });
    resizeFunctions();
    //  console.log( "resizeFunctions called in resizeText" );
}

function resizeThumbnails() {
    // Even height thumbnails
    $.fn.matchHeight._apply($('[data-mh="thumbnails"]'));
    $.fn.matchHeight._apply($('[data-mh="content"]'));
}

var glf_setConsistentHeight = function (strParentSelector, strChildSelector, intPadding) {
    intPadding = (intPadding || "") ? intPadding : 10;
    var itemsParent = $(strParentSelector);
    var heights = [];
    var tallest;
    itemsParent.each(
        function () {
            var items = $(this).find(strChildSelector);
            if (items.length) {
                items.each(function () {
                    $(this).css('height', 'auto');
                });
                items.each(function () {
                    heights.push($(this).height());
                });
                tallest = Math.max.apply(null, heights) + intPadding;
                items.each(function () {
                    $(this).css('height', tallest + 'px');
                });
            }
        })
};
// Disabled by Alex as it calculated wrong height in Safari
//glf_setConsistentHeight("#categories",".list-group>a");
if ($("#categories").length == 0) {
    $("#sub-nav").css("display", "block");
}
if ($("#categories2").length == 0) {
    $("#sub-nav").css("display", "block");
}

// AODA Compliance in Main Nav Menu
"use strict";

var AODACotMenu = new function () {
    var LEFT_ARROW_KEY = 37;
    var UP_ARROW_KEY = 38;
    var RIGHT_ARROW_KEY = 39;
    var DOWN_ARROW_KEY = 40;
    var ENTER_KEY = 13;
    var SPACEBAR_KEY = 32;
    var ESCAPE_KEY = 27;
    var TAB_KEY = 9;

    function addAriaAttributes(nav) { // pg removed , isMenuMobile)

        nav.attr('aria-label', 'City of Toronto Main Menu'); // pg move label to nav element

        nav.find('>ul').find('>li.menu-list-item').each(function (mainMenuIndex, listItem) {
            var $listItem = $(listItem);

            $listItem.find('>span').attr({
                "id": "cot_main_menu_" + mainMenuIndex,
                "data-menuitem-index": mainMenuIndex
            });

            $listItem.find('>span button').attr({  //pg added block on load buttons are not expanded
                "aria-expanded": "false"
            });

            $listItem.find('>div.dropdown').attr({
                "tabindex": -1, // used when we move focus from button to main menu on mobile
            }).find('ul').each(function (subMenuListIndex, list) {
                $(list).find('li').each(function (subMenuItemIndex, listItem) {
                    $(listItem).find('a').attr({
                        "data-menu-coordinates": mainMenuIndex + '_' + subMenuListIndex + '_' + subMenuItemIndex
                    });
                });
            });
        });
    } // pg end function addAriaAttributes(nav, isMenuMobile) {

    function killEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function addKeyboardSupport(nav) {

        var settingFocus = false;

        function showSubmenu(index, setFocusTo) {
            //console.log( "in showSubMenu" );
            var $span = $('#cot_main_menu_' + index);
            var $menu = $span.parent().find('div.dropdown');
            $menu.addClass('force-open'); // added to the div when keyboard activates main menu item
            $span.children('button').attr('aria-expanded', true);
            // $menu.attr('aria-hidden', false);
            $menu.find('a').first().focus();
            //pg removed setFocus(setFocusTo || $menu.find('a').first());
        }

        function hideSubMenu(setFocusToMainMenuItem) {
            //console.log( "in hideSubMenu: " +  setFocusToMainMenuItem );
            var $menu = nav.find('div.dropdown.force-open');
            if ($menu.length) {
                $menu.removeClass('force-open');
                var $span = $menu.closest('li').find('>span');
                $span.children('button').attr('aria-expanded', false);


            }
        }

        // pg added function
        function menuFocusOutHandler(evt) {
            //  console.log( "in menuFocusOutHandler ");
            if ($(window).width() < 992) { // dont do anything on mobile view
                return false;
            }
            var $currentTarget = $(evt.currentTarget); // this should be the div

            var $relatedTarget = $(evt.relatedTarget);

            if ($relatedTarget.data('menu-coordinates')) {
                return false;  // pg comment we are navigating link to link in menu
            } else {
                // pg comment we have left the menues
                $currentTarget.prev().children('button').attr('aria-expanded', false);
                $currentTarget.removeClass('force-open');
            }

        }

        nav.on('mouseover mouseout', function () {
            if ($(window).width() < 992) { // added by pg
                //  console.log( "in nav on mouseover mouseout" );
                return false;
            }
            if (nav.find('div.dropdown.force-open').length > 0) {
                hideSubMenu(false);
            }
        });

        nav.find('>ul>li.menu-list-item').each(function (i, listItem) {
            var $listItem = $(listItem);
            $listItem.find('>span').on('click', function (evt) { // pg modified
                var mobileView = $('#nav-trigger').hasClass('open');
                var $currentTarget = $(evt.currentTarget);

                var expanded = $currentTarget.children('button').attr('aria-expanded');
                if (mobileView) {
                    if (expanded == 'false') { // pg menu is closed
                        showSubmenu($currentTarget.data('menuitem-index'));
                        return false;
                    } else { //// pg menu is open
                        $currentTarget.children('button').attr('aria-expanded', false);
                        $currentTarget.next('div.force-open').removeClass('force-open');
                        return false;
                    }

                } //end mobileView check 

                showSubmenu($(evt.currentTarget).data('menuitem-index'));
                killEvent(evt);

            });
        }); // end nav.find('>ul>li.menu-list-item').each(function (i, listItem) {

        nav.find('div.dropdown').focusout(menuFocusOutHandler);

    } // end of add keyboard support


    this.init = function () {
        var nav = $('#main-nav');
        // console.log(nav);
        //
        // try {
        //     console.log(nav.html().length);
        // } catch(e) {
        //     console.log('nav.html().length - N/A');
        // }
        // var isMenuMobile=false; // pg this should be removed

        addAriaAttributes(nav); // this fires on init once pg removed , isMenuMobile)

        addKeyboardSupport(nav);   // pg added
    };
}();

$(document).ready(function () {
    AODACotMenu.init();
})