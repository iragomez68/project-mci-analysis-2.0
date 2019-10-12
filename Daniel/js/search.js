(function ($) {

    var refinedQuery = function () {
            if (/\s/.test($.trim(document.s.query.value))) {
                return '"' + document.s.query.value + '"';
            } else {
                return $.trim(document.s.query.value) + "*";
            }
        },
        processTypeAheadData = function (typeAheadObject) {
            var jsonstr = JSON.stringify(typeAheadObject, null, 2);
            var js = JSON.parse(jsonstr);
            var suggestArray = getValues(js, 'term');

            suggestArray = suggestArray.join('|-|').toLowerCase().split('|-|');
            return suggestArray.sort();
        },
        getValues = function (obj, key) {      // return an array of values that match on a certain key
            var objects = [];

            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;

                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getValues(obj[i], key));
                } else if (i == key) {
                    objects.push(obj[i]);
                }
            }
            return objects;
        };

    //search suggest part
    $(document).ready(function () {
        //var chost = document.location.hostname;
        //var envPrefix = "";

        var envHost = $("#siteSearch").attr("action");

        $("#query").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: envHost,
                    dataType: "json",
                    data: {
                        token: request.term,
                        //query: document.s.query.value + "*",
                        query: refinedQuery(),
                        filter: "",
                        sort: "alpha",
                        sortdir: "desc",
                        cname: "suggest",
                        startdate: "0",
                        enddate: "0",
                        xsl: "json",
                        page: "1"
                    },
                    success: function (data) {
                        dataClean = processTypeAheadData(data);
                        if (dataClean.length > 1) {
                            response(dataClean);
                        } else {
                            response([]);
                        }
                    }
                });
            },
            select: function (event, ui) {
                $('#query').val(ui.item.value);
                $('#s').submit();
            },

            minLength: 1,

            open: function () {
                //$("ul.ui-menu").width($(this).innerWidth());
                $("#ui-id-1").width($(this).innerWidth());
            }
        });
    });

})(jQuery);