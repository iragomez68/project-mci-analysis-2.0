// ------------------------ Fix for selector -----------------------------
(function() {
	
	if ($.fn.jquery == '3.3.1') {

		var oldInit = jQuery.fn.init;

		jQuery.fn.init = function(arg1) {
			var args = Array.prototype.slice.call(arguments);
			if (typeof arg1 === "string" && arg1 === "#") {
				args[0] = [];
			}

			var obj = oldInit.apply(this, args);
			obj.selector = arg1;
			return obj;
		};

		jQuery.fn.init.prototype = jQuery.fn;
	}

})();
// -----------------------------------------------------------------------------------------


// Fix Accordion Bug - remove after v1.2.7
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec( location.search );
  results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  return results;
};
var accordion = getUrlParameter( 'accordion' );
if ( accordion ) {
    var slug = 'accordion-' + accordion[1];
    var accid = document.getElementById( slug );
    if(accid == null ) {
	location.search = location.search.replace('accordion='+accordion[1], '');
    }
}