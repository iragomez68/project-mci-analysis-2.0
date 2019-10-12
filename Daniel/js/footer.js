// THIS CODE CAME FROM SCRIPT OVERRIDE
//*******************************************************
//THIS CODE IS JUST A WORK AROUND.  THE BAKED IN CODE SHOULD BE REWORKED SO THIS IS NOT NEEDED.
//THE CODE JUST ENSURES THAT MORE THAN 1 TAB CANNOT BE ACTIVE AT A TIME
$(window).on('resize', function() {
    setTimeout(function () {
        if ($("#quick-links li.active").length > 1) {
            $("#quick-links li").removeClass("active");
            $("#quick-links li:nth-child(1)").addClass("active");
        }
    }, 500);
});
//**************************************************
//THIS CODE IS JUST A WORK AROUND.  THE BAKED IN CODE SHOULD BE REWORKED SO THIS IS NOT NEEDED.
//THE CODE MAKES THE WHATS NEW BOXES A CONSISTENT HEIGHT WHEN USERS USE THE TEXT ENLARGER BUTTONS
$("#text-increase, #text-decrease").on('click',function() {
    setTimeout(function () {
        glf_setConsistentHeight("#main", "a.thumbnail-featured", 10)
    }, 300);
});
//*********************************************************************

//THIS CODE JUST SHOWS THE QUICKLINKS AFTER THE PAGES IS LOADED
$("#quick-links .nav-tabs").addClass("hidden-xs");
$("#quick-links .nav-tabs").css("display", "table");

if (window.location.hostname === 'enterprisetoronto.desk.com') {
    $("input[name='cname']").val("torontoent");
}
// -----------------------------------------------------------------------------------------------------------------------


/* W3Data ver 1.31 by W3Schools.com */
var w3DataObject = {};

function w3DisplayData(id, data) {
    var htmlObj, htmlTemplate, html, arr = [], a, l, rowClone, x, j, i, ii, cc, repeat, repeatObj, repeatX = "";
    htmlObj = document.getElementById(id);
    htmlTemplate = w3InitTemplate(id, htmlObj);
    html = htmlTemplate.cloneNode(true);
    arr = w3GetElementsByAttribute(html, "w3-repeat");
    l = arr.length;
    for (j = (l - 1); j >= 0; j -= 1) {
        cc = arr[j].getAttribute("w3-repeat").split(" ");
        if (cc.length == 1) {
            repeat = cc[0];
        } else {
            repeatX = cc[0];
            repeat = cc[2];
        }
        arr[j].removeAttribute("w3-repeat");
        repeatObj = data[repeat];
        if (repeatObj && typeof repeatObj == "object" && repeatObj.length != "undefined") {
            i = 0;
            for (x in repeatObj) {
                i += 1;
                rowClone = arr[j];
                rowClone = w3NeedleInHaystack(rowClone, "element", repeatX, repeatObj[x]);
                a = rowClone.attributes;
                for (ii = 0; ii < a.length; ii += 1) {
                    a[ii].value = w3NeedleInHaystack(a[ii], "attribute", repeatX, repeatObj[x]).value;
                }
                (i === repeatObj.length) ? arr[j].parentNode.replaceChild(rowClone, arr[j]) : arr[j].parentNode.insertBefore(rowClone, arr[j]);
            }
        } else {
            console.log("w3-repeat must be an array. " + repeat + " is not an array.");
            continue;
        }
    }
    html = w3NeedleInHaystack(html, "element");
    htmlObj.parentNode.replaceChild(html, htmlObj);

    function w3InitTemplate(id, obj) {
        var template;
        template = obj.cloneNode(true);
        if (w3DataObject.hasOwnProperty(id)) {
            return w3DataObject[id];
        }
        w3DataObject[id] = template;
        return template;
    }

    function w3GetElementsByAttribute(x, att) {
        var arr = [], arrCount = -1, i, l, y = x.getElementsByTagName("*"), z = att.toUpperCase();
        l = y.length;
        for (i = -1; i < l; i += 1) {
            if (i == -1) {
                y[i] = x;
            }
            if (y[i].getAttribute(z) !== null) {
                arrCount += 1;
                arr[arrCount] = y[i];
            }
        }
        return arr;
    }

    function w3NeedleInHaystack(elmnt, typ, repeatX, x) {
        var value, rowClone, pos1, haystack, pos2, needle = [], needleToReplace, i, cc, r;
        rowClone = elmnt.cloneNode(true);
        pos1 = 0;
        while (pos1 > -1) {
            haystack = (typ == "attribute") ? rowClone.value : rowClone.innerHTML;
            pos1 = haystack.indexOf("{{", pos1);
            if (pos1 === -1) {
                break;
            }
            pos2 = haystack.indexOf("}}", pos1 + 1);
            needleToReplace = haystack.substring(pos1 + 2, pos2);
            needle = needleToReplace.split("||");
            value = undefined;
            for (i = 0; i < needle.length; i += 1) {
                needle[i] = needle[i].replace(/^\s+|\s+$/gm, ''); //trim
                //value = ((x && x[needle[i]]) || (data && data[needle[i]]));
                if (x) {
                    value = x[needle[i]];
                }
                if (value == undefined && data) {
                    value = data[needle[i]];
                }
                if (value == undefined) {
                    cc = needle[i].split(".");
                    if (cc[0] == repeatX) {
                        value = x[cc[1]];
                    }
                }
                if (value == undefined) {
                    if (needle[i] == repeatX) {
                        value = x;
                    }
                }
                if (value == undefined) {
                    if (needle[i].substr(0, 1) == '"') {
                        value = needle[i].replace(/"/g, "");
                    } else if (needle[i].substr(0, 1) == "'") {
                        value = needle[i].replace(/'/g, "");
                    }
                }
                if (value != undefined) {
                    break;
                }
            }
            if (value != undefined) {
                r = "{{" + needleToReplace + "}}";
                if (typ == "attribute") {
                    rowClone.value = rowClone.value.replace(r, value);
                } else {
                    w3ReplaceHTML(rowClone, r, value);
                }
            }
            pos1 = pos1 + 1;
        }
        return rowClone;
    }

    function w3ReplaceHTML(a, r, result) {
        var b, l, i, a, x, j;
        if (a.hasAttributes()) {
            b = a.attributes;
            l = b.length;
            for (i = 0; i < l; i += 1) {
                if (b[i].value.indexOf(r) > -1) {
                    b[i].value = b[i].value.replace(r, result);
                }
            }
        }
        x = a.getElementsByTagName("*");
        l = x.length;
        a.innerHTML = a.innerHTML.replace(r, result);
    }
}

function w3IncludeHTML(callback) {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    elmnt.innerHTML = this.responseText;
                    elmnt.removeAttribute("w3-include-html");
                    w3IncludeHTML(callback);
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    (callback || function () {
    })();
}

function w3Http(target, readyfunc, xml, method) {
    var httpObj;
    if (!method) {
        method = "GET";
    }
    if (window.XMLHttpRequest) {
        httpObj = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (httpObj) {
        if (readyfunc) {
            httpObj.onreadystatechange = readyfunc;
        }
        httpObj.open(method, target, true);
        httpObj.send(xml);
    }
}

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {end: transEndEventNames[name]}
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () {
            called = true
        })
        var callback = function () {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function () {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function (element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused = null
        this.sliding = null
        this.interval = null
        this.$active = null
        this.$items = null

        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }

    Carousel.VERSION = '3.3.7'

    Carousel.TRANSITION_DURATION = 600

    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    Carousel.prototype.keydown = function (e) {
        if (/input|textarea/i.test(e.target.tagName)) return
        switch (e.which) {
            case 37:
                this.prev();
                break
            case 39:
                this.next();
                break
            default:
                return
        }

        e.preventDefault()
    }

    Carousel.prototype.cycle = function (e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    Carousel.prototype.getItemIndex = function (item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }

    Carousel.prototype.getItemForDirection = function (direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0)
            || (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap) return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }

    Carousel.prototype.to = function (pos) {
        var that = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

        if (pos > (this.$items.length - 1) || pos < 0) return

        if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
            that.to(pos)
        }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }

    Carousel.prototype.pause = function (e) {
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    Carousel.prototype.next = function () {
        if (this.sliding) return
        return this.slide('next')
    }

    Carousel.prototype.prev = function () {
        if (this.sliding) return
        return this.slide('prev')
    }

    Carousel.prototype.slide = function (type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', {relatedTarget: relatedTarget, direction: direction}) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function () {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }


    // CAROUSEL PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.carousel

    $.fn.carousel = Plugin
    $.fn.carousel.Constructor = Carousel


    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function () {
        $.fn.carousel = old
        return this
    }


    // CAROUSEL DATA-API
    // =================

    var clickHandler = function (e) {
        var href
        var $this = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
        if (!$target.hasClass('carousel')) return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false

        Plugin.call($target, options)

        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }

        e.preventDefault()
    }

    $(document)
        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

    $(window).on('load', function () {
        $('[data-ride="carousel"]').each(function () {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
            '[data-toggle="collapse"][data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    Collapse.VERSION = '3.3.7'

    Collapse.TRANSITION_DURATION = 350

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function () {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass('in')) return

        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

        this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

        this.transitioning = 1

        var complete = function () {
            this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element
                .trigger('shown.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

        this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

        this.transitioning = 1

        var complete = function () {
            this.transitioning = 0
            this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element
            [dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }

    Collapse.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Collapse.prototype.getParent = function () {
        return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function (i, element) {
                var $element = $(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
    }

    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return $(target)
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse

    $.fn.collapse = Plugin
    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data = $target.data('bs.collapse')
        var option = data ? 'toggle' : $this.data()

        Plugin.call($target, option)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        // jscs:disable requireDollarBeforejQueryAssignment
        this.element = $(element)
        // jscs:enable requireDollarBeforejQueryAssignment
    }

    Tab.VERSION = '3.3.7'

    Tab.TRANSITION_DURATION = 150

    Tab.prototype.show = function () {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        var $previous = $ul.find('.active:last a')
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        })
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        })

        $previous.trigger(hideEvent)
        $this.trigger(showEvent)

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            })
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    }

    Tab.prototype.activate = function (element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback
            && $.support.transition
            && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false)

            element
                .addClass('active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true)

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu').length) {
                element
                    .closest('li.dropdown')
                    .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);


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
//glf_setConsistentHeight("#categories",".list-group>a");
if ($("#categories").length == 0) {
    $("#sub-nav").css("display", "block");
}

// Open Accordion
function getUrlParameter(name) {

  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

  var results = regex.exec( location.search );

  results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));

  return results;

};


var accordion = getUrlParameter( 'accordion' );

if ( accordion ) {

  $( 'cotui-accordion' )[0].addEventListener( 'ready', function() {

    var slug = 'accordion-' + accordion[1];
    $( 'cotui-accordion' )[0].expandSection( slug ).then( function() {
      $( 'html, body' ).animate({
        scrollTop: $( 'cotui-accordion .accordion__button[aria-expanded=true]' ).parent().offset().top
      });
    });

  });

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

$(function () {
    // running this to fix race condition where it runs too early and text is cut off in the tile
    glf_setConsistentHeight("#categories", ".tile-list-group>a");
    glf_setConsistentHeight("#categories", ".cot-card");
    glf_setConsistentHeight("#categories2", ".cot-card");
});

glf_setConsistentHeight("#categories", ".tile-list-group>a");
glf_setConsistentHeight("#categories", ".bullet-list-group");
if ($("#categories").length == 0) {
    $("#sub-nav").css("display", "block");
}

// ===== Scroll to Top ====
$(window).scroll(function () {
    if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
    $('#header').focus();
});

var probablyPhone = ((/iphone|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) && 'ontouchstart' in document.documentElement);

$(function () {
    $(document).ready(function () {
        var sTimer = setInterval(function () {
            if (!probablyPhone) {
                $('a[class="phonelink"]').contents().unwrap();
            }
        });
    });
});

// AODA updates
window.addEventListener("hashchange", function (event) {

    var element = document.getElementById(location.hash.substring(1));

    if (element) {

        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
            element.tabIndex = -1;
        }

        element.focus();
    }

}, false);


// Added by Pankil - 2018-04-04

"use strict";

var _typeof =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function (obj) {
            return typeof obj;
        }
        : function (obj) {
            return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/

(function () {
    // Selectors for elements that should have listeners
    var tabListCSSselector = '#quick-links .nav.nav-tabs[role="tablist"]';
    var tabsCSSselector = '#quick-links .nav [data-toggle="tab"]';
    var tabPanelsCSSselector = '#quick-links .tab-content [role="tabpanel"]';

    var tablist = document.querySelectorAll(tabListCSSselector)[0];
    var tabs;
    var panels;

    generateArrays();

    function generateArrays() {
        tabs = document.querySelectorAll(tabsCSSselector);
        panels = document.querySelectorAll(tabPanelsCSSselector);
    }

    // For easy reference
    var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46,
        enter: 13,
        space: 32
    };

    // Add or substract depenign on key pressed
    var direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
    };

    // Bind listeners
    for (var i = 0; i < tabs.length; ++i) {
        addListeners(i);
    }

    function addListeners(index) {
        tabs[index].addEventListener("click", clickEventListener);
        tabs[index].addEventListener("keydown", keydownEventListener);
        tabs[index].addEventListener("keyup", keyupEventListener);

        // Build an array with all tabs (<button>s) in it
        tabs[index].index = index;
    }

    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener(event) {
        var tab = event.target;
        activateTab(tab, true);
    }

    // Handle keydown on tabs
    function keydownEventListener(event) {
        var key = event.keyCode;

        switch (key) {
            case keys.end:
                event.preventDefault();
                // Activate last tab
                focusLastTab();
                break;
            case keys.home:
                event.preventDefault();
                // Activate first tab
                focusFirstTab();
                break;

            // Up and down are in keydown
            // because we need to prevent page scroll >:)
            case keys.up:
            case keys.down:
                determineOrientation(event);
                break;
        }
    }

    // Handle keyup on tabs
    function keyupEventListener(event) {
        var key = event.keyCode;

        switch (key) {
            case keys.left:
            case keys.right:
                determineOrientation(event);
                break;
            case keys.delete:
                // do nothing
                break;
            case keys.enter:
            case keys.space:
                // Logic in this case has been commented out this is because.
                // The click event is being called when the user presses enter or space hence there is no need to run this again.
                // If you were to uncomment this there is a bug with the even being trigerred twice hence the value of aria-expanded is unchanged.
                //activateTab(event.target);
                break;
        }
    }

    // When a tablist aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    function determineOrientation(event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute("aria-orientation") == "vertical";
        var proceed = false;

        if (vertical) {
            if (key === keys.up || key === keys.down) {
                event.preventDefault();
                proceed = true;
            }
        } else {
            if (key === keys.left || key === keys.right) {
                proceed = true;
            }
        }

        if (proceed) {
            switchTabOnArrowPress(event);
        }
    }

    // Either focus the next, previous, first, or last tab
    // depening on key pressed
    function switchTabOnArrowPress(event) {
        var pressed = event.keyCode;

        if (direction[pressed]) {
            var target = event.target;
            if (target.index !== undefined) {
                if (tabs[target.index + direction[pressed]]) {
                    tabs[target.index + direction[pressed]].focus();
                } else if (pressed === keys.left || pressed === keys.up) {
                    focusLastTab();
                } else if (pressed === keys.right || pressed == keys.down) {
                    focusFirstTab();
                }
            }
        }
    }

    // Activates any given tab panel
    function activateTab(tab, setFocus) {
        var panelExpandedBeforeClick = tab.getAttribute("aria-expanded");

        // Deactivate all other tabs
        deactivateTabs();

        // Remove tabindex attribute
        tab.removeAttribute("tabindex");

        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute("aria-controls");

        // Remove hidden attribute from tab panel to make it visible
        //document.getElementById(controls).removeAttribute('hidden');
        document.getElementById(controls).classList.add("active");
        tab.parentElement.classList.add("active");

        var vertical = tablist.getAttribute("aria-orientation") == "vertical";

        // by default focus the button that is activated
        var elementToFocus = "#" + tab.id;

        if (vertical) {
            // Vertical (accordion mode)

            if (panelExpandedBeforeClick == "true") {
                $("#" + controls).collapse("hide");

                // aria-expanded is not needed for the panel it self only on the button
                // removing aria-expanded because Collapse is adding it
                $("#" + controls).removeAttr("aria-expanded");

                tab.setAttribute("aria-expanded", "false");
            } else {
                $("#" + controls).collapse("show");

                // aria-expanded is not needed for the panel it self only on the button
                // removing aria-expanded because Collapse is adding it
                $("#" + controls).removeAttr("aria-expanded");

                tab.setAttribute("aria-expanded", "true");
            }
        } else {
            // Horizontal (normal tabpanel mode)

            // in this special case we want to focus the panel that is controled by the button
            elementToFocus = "#" + controls;
            // Set the tab as selected
            // User can't unselect a tab they can only select another tab to deselect the current selected one
            tab.setAttribute("aria-selected", "true");
        }

        // Set focus when required
        if (setFocus) {
            $(elementToFocus).focus();
        }
    }

    // Deactivate all tabs and tab panels
    function deactivateTabs() {
        for (var t = 0; t < tabs.length; t++) {
            var vertical = tablist.getAttribute("aria-orientation") == "vertical";
            if (vertical) {
                $("#" + tabs[t].getAttribute("aria-controls")).collapse("hide");
                // collapse all of the tabs
                tabs[t].setAttribute("aria-expanded", "false");
            } else {
                tabs[t].setAttribute("aria-selected", "false");
                tabs[t].setAttribute("tabindex", "-1");
            }
            tabs[t].parentElement.classList.remove("active");
        }

        for (var p = 0; p < panels.length; p++) {
            //panels[p].setAttribute('hidden', 'hidden');
            panels[p].classList.remove("active");
        }
    }

    // Make a guess
    function focusFirstTab() {
        tabs[0].focus();
    }

    // Make a guess
    function focusLastTab() {
        tabs[tabs.length - 1].focus();
    }
})();

// Tabcollapse
// Main change is insted of using href we are now using aira-controlls to perform the expand collapse logic
!(function ($) {
    "use strict";

    /*
      // According to the new requirements the logic below is no longer correct or required
      // aria-selected is not appliciable in both views and the same goes for aria-expanded
       //MAKE SURE TABS HAVE PROPER ARIA-SELECTED ATTRIBUTE WHEN SHOWN/HIDDEN

      $('.nav.nav-tabs>li>button').attr("aria-selected", false);
      $('.nav.nav-tabs>li.active>button').attr("aria-selected", true);
      $('.nav.nav-tabs>li>button').on('shown.bs.tab', function (e) { $(this).attr("aria-selected", true)}).on('hidden.bs.tab', function (e) { $(this).attr("aria-selected", false)});
      */

    // TABCOLLAPSE CLASS DEFINITION
    // ======================

    var TabCollapse = function TabCollapse(el, options) {
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
        accordionClass: "visible-xs",
        tabsClass: "hidden-xs",
        accordionTemplate: function accordionTemplate(
            heading,
            groupId,
            parentId,
            active
        ) {
            return (
                '<div class="panel panel-default">' +
                '   <div class="panel-heading">' +
                '      <h4 class="panel-title">' +
                "      </h4>" +
                "   </div>" +
                '   <div id="' +
                groupId +
                '" class="panel-collapse collapse" tabindex="-1">' +
                '       <div class="panel-body js-tabcollapse-panel-body">' +
                "       </div>" +
                "   </div>" +
                "</div>"
            );
        },
        updateLinks: true
    };

    TabCollapse.prototype.checkState = function () {
        if (this.$tabs.is(":visible") && this._accordionVisible) {
            this.showTabs();
            this._accordionVisible = false;
        } else if (this.$accordion.is(":visible") && !this._accordionVisible) {
            this.showAccordion();
            this._accordionVisible = true;
        }
    };

    TabCollapse.prototype.showTabs = function () {
        var view = this;
        this.$tabs.trigger($.Event("show-tabs.bs.tabcollapse"));

        var $panelHeadings = this.$accordion
            .find(".js-tabcollapse-panel-heading")
            .detach();

        $panelHeadings.each(function () {
            var $panelHeading = $(this),
                $parentLi = $panelHeading.data("bs.tabcollapse.parentLi");

            var $oldHeading = view._panelHeadingToTabHeading($panelHeading);

            $parentLi.removeClass("active");
            if (
                $parentLi.parent().hasClass("dropdown-menu") &&
                !$parentLi.siblings("li").hasClass("active")
            ) {
                $parentLi
                    .parent()
                    .parent()
                    .removeClass("active");
            }

            if (!$oldHeading.hasClass("collapsed")) {
                $parentLi.addClass("active");
                if ($parentLi.parent().hasClass("dropdown-menu")) {
                    $parentLi
                        .parent()
                        .parent()
                        .addClass("active");
                }
            } else {
                $oldHeading.removeClass("collapsed");
            }

            $parentLi.append($panelHeading);
        });

        if (!$("li").hasClass("active")) {
            $("li")
                .first()
                .addClass("active");
        }

        var $panelBodies = this.$accordion.find(".js-tabcollapse-panel-body");
        $panelBodies.each(function () {
            var $panelBody = $(this),
                $tabPane = $panelBody.data("bs.tabcollapse.tabpane");
            $tabPane.append($panelBody.contents().detach());
        });
        this.$accordion.html("");

        if (this.options.updateLinks) {
            var $tabContents = this.getTabContentElement();
            $tabContents
                .find('[data-toggle-was="tab"], [data-toggle-was="pill"]')
                .each(function () {
                    var $el = $(this);
                    var ariaControls = $el
                        .attr("aria-controls")
                        .replace(/-collapse$/g, "");
                    $el.attr({
                        "data-toggle": $el.attr("data-toggle-was"),
                        "data-toggle-was": "",
                        "data-parent": "",
                        "aria-controls": ariaControls
                    });
                });
        }

        this.$tabs.trigger($.Event("shown-tabs.bs.tabcollapse"));
    };

    TabCollapse.prototype.getTabContentElement = function () {
        var $tabContents = $(this.options.tabContentSelector);
        if ($tabContents.length === 0) {
            $tabContents = this.$tabs.siblings(".tab-content");
        }
        return $tabContents;
    };

    TabCollapse.prototype.showAccordion = function () {
        this.$tabs.trigger($.Event("show-accordion.bs.tabcollapse"));

        var $headings = this.$tabs.find(
            'li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'
            ),
            view = this;
        $headings.each(function () {
            var $heading = $(this),
                $parentLi = $heading.parent();
            $heading.data("bs.tabcollapse.parentLi", $parentLi);
            view.$accordion.append(
                view._createAccordionGroup(
                    view.$accordion.attr("id"),
                    $heading.detach()
                )
            );
        });

        if (this.options.updateLinks) {
            var parentId = this.$accordion.attr("id");
            var $selector = this.$accordion.find(".js-tabcollapse-panel-body");
            $selector
                .find('[data-toggle="tab"], [data-toggle="pill"]')
                .each(function () {
                    var $el = $(this);
                    var newAriaControls = $el.attr("aria-controls") + "-collapse";
                    $el.attr({
                        "data-toggle-was": $el.attr("data-toggle"),
                        "data-toggle": "collapse",
                        "data-parent": "#" + parentId,
                        "aria-controls": newAriaControls,
                        "data-target": "#" + newAriaControls
                    });
                });
        }

        this.$tabs.trigger($.Event("shown-accordion.bs.tabcollapse"));
    };

    TabCollapse.prototype._panelHeadingToTabHeading = function ($heading) {
        var ariaControls = $heading
            .attr("aria-controls")
            .replace(/-collapse$/g, "");
        $heading.attr({
            "data-toggle": "tab",
            "aria-controls": ariaControls,
            "data-parent": ""
        });
        return $heading;
    };

    TabCollapse.prototype._tabHeadingToPanelHeading = function (
        $heading,
        groupId,
        parentId,
        active
    ) {
        $heading.addClass("js-tabcollapse-panel-heading ");
        $heading.attr({
            "data-toggle": "collapse",
            "data-parent": "#" + parentId,
            "aria-controls": groupId
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

    /*
      TabCollapse Creates and HTML element for the accordion
      */
    TabCollapse.prototype._initAccordion = function () {
        var randomString = function randomString() {
            var result = "",
                possible =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
                result += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return result;
        };

        var srcId = this.$tabs.attr("id"),
            accordionId = (srcId ? srcId : randomString()) + "-accordion";

        this.$accordion = $(
            '<div class="panel-group ' +
            this.options.accordionClass +
            '" id="' +
            accordionId +
            '"></div>'
        );
        this.$tabs.after(this.$accordion);
        this.$tabs.addClass(this.options.tabsClass);
        this.getTabContentElement().addClass(this.options.tabsClass);
    };

    TabCollapse.prototype._createAccordionGroup = function (parentId, $heading) {
        var tabSelector = $heading.attr("data-target"),
            active = $heading.data("bs.tabcollapse.parentLi").is(".active");

        if (!tabSelector) {
            tabSelector = "#" + $heading.attr("aria-controls");
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ""); //strip for ie7
        }
        var $tabPane = $(tabSelector);
        var groupId = $tabPane.attr("id") + "-collapse";
        var $panel = $(
            this.options.accordionTemplate($heading, groupId, parentId, active)
        );
        $panel
            .find(".panel-heading > .panel-title")
            .append(
                this._tabHeadingToPanelHeading($heading, groupId, parentId, active)
            );
        $panel
            .find(".panel-body")
            .append($tabPane.contents().detach())
            .data("bs.tabcollapse.tabpane", $tabPane);

        return $panel;
    };

    // TABCOLLAPSE PLUGIN DEFINITION
    // =======================

    $.fn.tabCollapse = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data("bs.tabcollapse");
            var options = $.extend(
                {},
                TabCollapse.DEFAULTS,
                $this.data(),
                (typeof option === "undefined" ? "undefined" : _typeof(option)) ===
                "object" && option
            );

            if (!data) $this.data("bs.tabcollapse", new TabCollapse(this, options));
        });
    };

    $.fn.tabCollapse.Constructor = TabCollapse;
    $("#quick-links")
        .find(".nav-tabs")
        .tabCollapse();
})(window.jQuery);

// Going from tab panel to accordion view
// When a tab is selected
// Panel uses aria-selected
// Accordion uses aria-expanded
$("#quick-links .nav-tabs").on("show-accordion.bs.tabcollapse", function () {
    $("#quick-links .btn-block").removeAttr("role");

    // De-select the currently selected tab
    var selectedTab = $('#quick-links .btn-block[aria-selected="true"]');
    // remove the active (selected arrow)
    $('#quick-links .btn-block[aria-selected="true"]')
        .parent()
        .removeClass("active");
    // Get the value of aria-controls (which is an ID)
    var controls = selectedTab.attr("aria-controls");
    $("#" + controls).removeClass("active");

    var tabs = $("#quick-links .btn-block");

    for (var t = 0; t < tabs.length; t++) {
        tabs[t].removeAttribute("tabindex");
        tabs[t].removeAttribute("aria-selected");

        // In accordion view everything is collapsed by default
        tabs[t].setAttribute("aria-expanded", "false");

        // re-enable tabbing for buttons
        tabs[t].removeAttribute("tabindex");
    }

    // set the orientation this is used to dected panel vs accordion view. Accordion = vertical.
    $('.nav.nav-tabs[role="tablist"]').attr("aria-orientation", "vertical");
});

// changed from accordion view to tab panel
// When a tab is selected
// Panel uses aria-selected
// Accordion uses aria-expanded
$("#quick-links .nav-tabs").on("shown-tabs.bs.tabcollapse", function () {
    // Determine the current expanded tab, this is the tab that needs to be selected in panel view
    var selectedTab = $('#quick-links .btn-block[aria-expanded="true"]');

    // if no tab is selected default to the first tab
    if (selectedTab.length === 0) {
        selectedTab = $("#quick-links .btn-block").first();
    }

    // Get the value of aria-controls (which is an ID)
    var controls = selectedTab.attr("aria-controls");

    var tabs = $("#quick-links .btn-block");
    for (var t = 0; t < tabs.length; t++) {
        // disable tabbing for all buttons
        tabs[t].setAttribute("tabindex", "-1");
        // none of the panels are selected by default
        tabs[t].setAttribute("aria-selected", "false");
        // none of the panels are active
        tabs[t].parentElement.classList.remove("active");
        var tabControls = tabs[t].getAttribute("aria-controls");
        $("#" + tabControls).removeClass("active");
        // aria-expanded isn't used in panel mode
        tabs[t].removeAttribute("aria-expanded");
    }

    selectedTab.removeAttr("tabindex");
    selectedTab.attr("aria-selected", "true");
    //selectedTab.addClass('active');
    selectedTab.parent().addClass("active");
    $("#" + controls).addClass("active");
    //$('#'+controls).removeAttr('hidden');

    $("#quick-links .btn-block").attr("role", "tab");
    $('.nav.nav-tabs[role="tablist"]').attr("aria-orientation", "horizontal");


});


$(window).on('shown.bs.collapse', function () {
    //console.log('The collapsible content is now fully shown.');
    $(".panel-collapse.collapse").removeAttr('aria-expanded');
});

$(window).on('hidden.bs.collapse', function () {
    //console.log('The collapsible content is now hidden.');
    $(".panel-collapse.collapse").removeAttr('aria-expanded');
});


function scrollToTop(callback) {
    var hTag = $('#header');
    $('html,body').animate({
        scrollTop: hTag.offset().top
    }, 'slow', callback ? callback() : null);
}


/* ========================================================================
 * cotKeydownEvents
 * ========================================================================
 *
 * ========================================================================
 */


;(function ($, window, document, undefined) {

    var pluginName = 'cotKeydownEvents',
        defaults = {
            TRANSITION_DURATION: 150
        };

    function Plugin(element, options) {
        this.element = element; //
        this.$element = $(element); // jQ element
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults; // save our defaults
        this._name = pluginName; // save our name

        this.init();

    } // end Plugin constructor


    Plugin.prototype = {
        init: function () { // start any initialization logic, we have access to the element and the options
            var $container = this.$element; // jQ object of the containing element
            $container.on('keydown', this.onKeyDown); // when we get a keydown determine if we want to trigger our own event
        },

        onKeyDown: function (evt) {
            var keyCodesList = keyCodes(); //this.keyCodes();
            var $container = $(this); // work with the original selected containing element
            switch (evt.which) {
                case keyCodesList.ESCAPE:
                    $container.trigger(cotKeyEvent('escapeKeyDown', evt));
                    break;
                case keyCodesList.LEFTARROW:
                    $container.trigger(cotKeyEvent('leftArrowKeyDown', evt));
                    break;
                case keyCodesList.RIGHTARROW:
                    $container.trigger(cotKeyEvent('rightArrowKeyDown', evt));
                    break;
                case keyCodesList.UPARROW:
                    $container.trigger(cotKeyEvent('upArrowKeyDown', evt));
                    break;
                case keyCodesList.DOWNARROW:
                    $container.trigger(cotKeyEvent('downArrowKeyDown', evt));
                    break;
                case keyCodesList.HOME:
                    $container.trigger(cotKeyEvent('homeKeyDown', evt));
                    break;
                case keyCodesList.END:
                    $container.trigger(cotKeyEvent('endKeyDown', evt));
                    break;
                default:
                    break;
            }  // end switch
        },

    }; // end Plugin.prototype

    var keyCodes = function keyCodes() {
        var codes = {
            ENTER: 13,
            ESCAPE: 27,
            SPACE: 32,
            PAGEUP: 33,
            PAGEDOWN: 34,
            END: 35,
            HOME: 36,
            LEFTARROW: 37,
            UPARROW: 38,
            RIGHTARROW: 39,
            DOWNARROW: 40
        };
        return codes;
    };

    var cotKeyEvent = function cotKeyEvent(type, evt) {
        return $.Event(type, {originalEvent: evt, target: evt.target});
    };

    // wrap around the constructor prevent against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }; // end wrap

    //console.log( $.fn[pluginName]);

})(jQuery, window, document);


/* ========================================================================
 * cotRovingTabIndex
 * ========================================================================
 *
 * ========================================================================
 */

;(function ($, window, document, undefined) {
    var pluginName = 'cotRovingTabIndex',
        defaults = {
            autoWrap: false,
            axis: 'horizontal',
            useHomeAndEndKeys: true,
            selector: ''

        }; // end defaults
    var _collection = ''; // setup for the collection of elements we're interested in
    var numItems = 0;
    var currentItemIndex = 0;

    function Plugin(element, options) {
        this.element = element; //
        this.$element = $(element); // jQ element
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults; // save our defaults
        this._name = pluginName; // save our name

        this.init();

        if (this.options.useHomeAndEndKeys === true) {
            this.$element.on('endKeyDown', this.options.selector, {goto: -1}, this.onEndKey);
            this.$element.on('homeKeyDown', this.options.selector, {goto: 0}, this.onHomeKey);
        }

        if (this.options.axis === 'horizontal') {
            this.$element.on('leftArrowKeyDown', this.options.selector, {
                step: -1,
                wrap: this.options.autoWrap
            }, this.onPreviousKey);
            this.$element.on('rightArrowKeyDown', this.options.selector, {
                step: 1,
                wrap: this.options.autoWrap
            }, this.onNextKey);
        }

    } // end Plugin constructor

    Plugin.prototype = {
        init: function () { // start any initialization logic, we have access to the element and the options

            var $container = this.$element;
            $container.cotKeydownEvents();
            this._collection = $container.find(this.options.selector);
            _collection = $container.find(this.options.selector);
            numItems = _collection.length;

        },

        onEndKey: function (evt) {
            var value = evt.data.goto;
            _collection.get(value).focus();
            currentItemIndex = (numItems - 1);

            return false;
        },

        onHomeKey: function (evt) {
            var value = evt.data.goto;
            _collection.get(value).focus();
            currentItemIndex = 0;
            return false;
        },

        onNextKey: function (evt) {
            var goToIndex = (currentItemIndex + evt.data.step);
            // are we on the last element
            if (currentItemIndex === (numItems - 1)) { // we are on the last element of the collection
                if (evt.data.wrap === true) { // wrap to the beginning
                    _collection.get(0).focus();
                    currentItemIndex = 0;
                    return false;
                } else {
                    return false;
                }
            } // end if on last element
            _collection.get(goToIndex).focus();
            currentItemIndex = goToIndex;
            return false;
        },

        onPreviousKey: function (evt) {
            var goToIndex = (currentItemIndex + evt.data.step);
            // are we on the first element
            if (currentItemIndex === 0) { // we are on the first element of the collection
                if (evt.data.wrap === true) { // wrap to the end
                    _collection.get(-1).focus();
                    currentItemIndex = (numItems - 1);
                    return false;
                } else {
                    return false;
                }
            } // end if on first element
            _collection.get(goToIndex).focus();
            currentItemIndex = goToIndex;
            return false;
        }

    }; // end Plugin.prototype

    // wrap around the constructor prevent against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }; // end wrap

    //console.log( $.fn[pluginName]);

})(jQuery, window, document); // end cotRovingTabIndex


// Added by PG - 20180921
;(function () {

    var pdfChange = function pdfChange() {
        var pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
        var i, title;

        if (pdfLinks.length > 0) {
            for (i = 0; i < pdfLinks.length; i++) {
                if (pdfLinks[i].hasAttribute('title')) {
                    title = pdfLinks[i].getAttribute('title') + " PDF Document";
                    pdfLinks[i].setAttribute("title", title);
                } else {
                    pdfLinks[i].setAttribute("title", "PDF Document");
                }
            }
        }
    };


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", pdfChange);
    } else {  // `DOMContentLoaded` already fired
        pdfChange();
    }
})();


;(function () {
    var cards;
    var i, theCard;

    try {
        cards = document.getElementsByClassName('cot-card');
    } catch (err) {
        //console.error( err );
        return false;
    }

    var cardClick = function cardClick(evt) {
        if (evt.target.nodeName == 'A') {
            return false;
        } else {
            evt.currentTarget.querySelector('h2 a').click();
            return false;
        }
    };

    if (cards.length > 0) {
        for (i = 0; i < cards.length; i++) {
            theCard = cards[i];
            theCard.addEventListener("click", cardClick, false);
        }
    }

})();
