/**
 * FindItGuideCars.com App JS
 */

var FIG = FIG || {};

/* prevent annoying "Uncaught TypeError ... is not a function" BD errors: */
jQuery.fn.extend({
    progressbar:function(foo){return foo;}
});

/* make textarea elements automagically grow to fit content as user types */
/*jQuery autoResize (textarea auto-resizer); @copyright James Padolsey http://james.padolsey.com; @version 1.04
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/autoresize.jquery.js
 */
!function(e){e.fn.autoResize=function(t){var i=e.extend({onResize:function(){},animate:!0,animateDuration:150,animateCallback:function(){},extraSpace:20,limit:1e3},t);return this.filter("textarea").each(function(){var t,n=e(this).css({resize:"none","overflow-y":"hidden"}),a=n.height(),o=(t={},e.each(["height","width","lineHeight","textDecoration","letterSpacing"],function(e,i){t[i]=n.css(i)}),n.clone().removeAttr("id").removeAttr("name").css({position:"absolute",top:0,left:-9999}).css(t).attr("tabIndex","-1").insertBefore(n)),s=null,c=function(){o.height(0).val(e(this).val()).scrollTop(1e4);var t=Math.max(o.scrollTop(),a)+i.extraSpace,c=e(this).add(o);s!==t&&(s=t,t>=i.limit?e(this).css("overflow-y",""):(i.onResize.call(this),i.animate&&"block"===n.css("display")?c.stop().animate({height:t},i.animateDuration,i.animateCallback):c.height(t)))};n.unbind(".dynSiz").bind("keyup.dynSiz",c).bind("keydown.dynSiz",c).bind("change.dynSiz",c)}),this}}(jQuery);

/* jQuery Mobile config */
$(document).bind('mobileinit', function(){
	/* block ajax page transitions */
	$.mobile.ajaxEnabled = false;
	/* do not wait on iOS */
    $.mobile.useFastClick = true;
});

/* Determine if is loading within app */
FIG.is_app = ( window.navigator.userAgent.match('gonative') ? true : false );

/**
 * Cookie interactions
 */
function ap_set_cookie( ap_name, ap_value, ap_days, ap_path ) {
	var ap_date = new Date(),
	  ap_expires;
	ap_date.setTime(ap_date.getTime() + (ap_days * 24 * 60 * 60 * 1000));
	ap_expires = ap_date.toUTCString();
	document.cookie = ap_name + '=' + ap_value + '; expires='+ ap_expires + '; path=' + ap_path;
} // ap_set_cookie
function ap_get_cookie( ap_name ) {
	var name = ap_name + '=',
	    ca   = document.cookie.split(';'),
	    i    = 0,
	    len  = ca.length,
	    c;
	for(; i < len; i++) {
	  c = ca[i];
	  while (c.charAt(0) == ' ') {
	    c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
	    return c.substring(name.length, c.length);
	  }
	}
	return '';
} // ap_get_cookie
function ap_delete_cookie( ap_name, ap_path ) {
	ap_set_cookie(ap_name, '', -1, ap_path);
} // ap_delete_cookie

/**
 * Saved interactions
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
	search page,
	detail page:
		grab all .favorites
		check if key (url) is in localStorage
			if so, mark as 'ap_saved'
	saved page:
		get localStorage
		write all values to page
	click:
		if 'ap_saved',
			remove from localStorage
		else
			add to localStorage
 */
function ap_add_saved_listing( ap_key, ap_value ) {
	// make sure we got the variables we need
	if ( !ap_key || !ap_value ) { return; }
	// if the value is an object, convert it to a string
    if ( typeof ap_value === 'object' ) {
      ap_value = JSON.stringify( ap_value );
    }
    // store the item
    localStorage.setItem( 'ap_saved_'+ap_key, ap_value );
    $('#app-bottom-nav').find('.ap-saved a').addClass('ap-swell-up');
    setTimeout(function(){
    	$('#app-bottom-nav').find('.ap-saved a').removeClass('ap-swell-up');
    }, 1000);
}
function ap_remove_saved_listing( ap_key ) {
	// make sure we got the variables we need
	if ( !ap_key ) { return; }
	// kill the item
	localStorage.removeItem( 'ap_saved_'+ap_key );
}
function ap_get_saved_listings() {
	// setup
	var ap_i = 0, 
		ap_len = localStorage.length,
		ap_key, ap_value,
		ap_html = '';
	// loop thru all storage items
	for ( ; ap_i < ap_len; ++ap_i ) {
		ap_key = localStorage.key( ap_i );
		ap_value = localStorage.getItem( ap_key );
		// make sure if is an 'ap_saved' item
		if ( ap_key.match('ap_saved_') ) {
			// add each one into the markup
			ap_html += '<li><a href="/'+ap_key.replace('ap_saved_','')+'">'+ap_value+'</a><i class="fa fa-trash"></i></li>';
		}
	}
	// write markup into the page
	$('#ap_saved').append(ap_html).removeClass('loading');
	// add "delete" listener
	$('#ap_saved').on('click', '.fa-trash', ap_delete_saved_listing);
}
function ap_delete_saved_listing( ap_event ) {
	// make sure we got the variables we need
	if ( !ap_event ) { return; }
	// setup
	var ap_elem = $(ap_event.currentTarget),
		ap_parent = ap_elem.parent(),
		ap_key = ap_parent.find('a').attr('href').replace('/', '');
	// remove saved listing from localStorage
    ap_remove_saved_listing( ap_key );
    // remove saved listing from the page
    ap_parent.remove();
}
function ap_is_listing_saved( ap_key ) {
	// make sure we got the variables we need
	if ( !ap_key ) { return; }
	// return true or false
    return ( localStorage.getItem( 'ap_saved_'+ap_key ) ? true : false );
}
function ap_mark_saved_listings( ap_elem ) {
	// make sure we got the variables we need
	if ( !ap_elem ) { return; }
	// setup
	var ap_key = ap_elem.data('saveurl');
	// if saved, add indicator class
	if ( ap_is_listing_saved( ap_key ) ) {
		ap_elem.addClass('ap-saved');
	}
}
function ap_toggle_saved_listings( ap_elem ) {
	// make sure we got the variables we need
	if ( !ap_elem ) { return; }
	// setup
	var ap_key = ap_elem.data('saveurl'),
		ap_value = ap_elem.data('savetitle');
	// if saved, remove from storage and remove indicator class
	if ( ap_is_listing_saved( ap_key ) ) {
		ap_remove_saved_listing( ap_key );
		ap_elem.removeClass('ap-saved');
	// if NOT saved, add to storage and add indicator class
	} else {
		ap_add_saved_listing( ap_key, ap_value );
		ap_elem.addClass('ap-saved');
	}
}

function ap_after_page_content_loaded() {

    // force all external URLs to open in new window/tab
    // (not this domain name...                         not target-links, not relative URLs, not mail links...   not tel links)...    and not js links
    $('main').find('a:not([href*="finditguide.com/app"]):not([href^="#"]):not([href^="/"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="javascript:"])').attr('target','_blank');

	/* add page loading icon during page transitions */
	// 					   internal links, 					  nav "Back",      		 form submit buttons
	$('main').on('click', 'a[href*="app-find-it-guide-cars"], a[href^="javascript"], .fig-search-submit input', function(){
		$('.ui-loader').addClass('show');
	});
	// search results "Sort" drop-down
	$('#sortbox').on('change', function(){
		$('.ui-loader').addClass('show');
	});

	// "Save" icon
	$('.favorite')
		// add listener
		.on('click', function( e ){
			 ap_toggle_saved_listings( $(e.currentTarget) );
		})
		// indicate if listing is already Saved
		.each(function( ap_key, ap_elem ){
			 ap_mark_saved_listings( $(ap_elem) );
		});

	// Home page
	if ( $('.module--home').length > 0 ) {

	    /* Make/Model */
	    var figMakeSelect = $('.fig-search-make select'),
	        figModelSelect = $('.fig-search-model select'),
	        figBuildMakeOptions = function() {
	            figMakeSelect.on('change', figBuildModelOptions);
	        },
	        /* prepare to fill Make/Model selects */
	        figBuildModelOptions = function() {
	            var selected = figModelSelect.data('selected') || false,
	                html = '',
	                makes = figMakeSelect.val(),
	                i, make, j, model;
	            /* make sure we got a list of values to build */
	            if (makes && makes.length > 0) {
	                html = '<option>Model</option>';
	                $.each(makes, function(i, make){
	                    if (makes.length > 1) {
	                        html += '<optgroup label="'+make+'">';
	                    }
	                    $.each(figMakesModels[make], function(j, model){
	                        html += '<option value="'+model+'"'+(selected && selected.indexOf(model) > -1 ? ' selected' : '')+'>'+model+'</option>';
	                    });
	                    if (makes.length > 1) {
	                        html += '</optgroup>';
	                    }
	                });
	                figModelSelect.html(html).selectmenu('refresh', true).selectmenu('enable');
	            } else {
	                html = '<option>Model (Choose Make)</option>';
	                figModelSelect.html(html).selectmenu('refresh', true).selectmenu('disable');
	            }
	        };
	    /* activate Make */
	    figBuildMakeOptions();
	    /* build Model */
	    figBuildModelOptions();

	    /* geolocation */
	    if (navigator.geolocation) {
	        FIG.geolocationError = function(error) {
	            switch(error.code) {
	                case error.PERMISSION_DENIED:
	                    alert("You denied permission earlier. Please reset GeoLocation permission for this app and try again.");
	                    break;
	                case error.POSITION_UNAVAILABLE:
	                    alert("Location information is currently unavailable.");
	                    break;
	                case error.TIMEOUT:
	                    alert("The request to get your location timed out.");
	                    break;
	                default:
	                    alert("An unknown error occurred.");
	            }
	            console.log(error.message);
	        }
	        /* current is provided if trying use the user's current location */
	        FIG.populateSearchFields = function(vlat,vlon){
	            /* use vlat and vlon to reverse geocode */
	            if ( vlat !== '' && vlon !== '' ) {
	                var formfields = $('.googleLocation');
	                var visitorLatLng = new google.maps.LatLng(parseFloat(vlat),parseFloat(vlon));
	                var visitorGeocoder = new google.maps.Geocoder();
	                var formattedAddress = [];
	                var preFormattedStructure = {
	                    "locality" : "long_name",
	                    "administrative_area_level_1" : "long_name",
	                    "country" : "long_name"
	                };
	                visitorGeocoder.geocode( {'latLng': visitorLatLng}, function(results, status) {
	                    /* if status is OK, use info to build the location for the search */
	                    if (status == google.maps.GeocoderStatus.OK) {
	                        /* loop thru each preFormattedStructure to get the readable value: Kaiserslautern, Rheinland-Pfalz, Germany */
	                        $.each(preFormattedStructure, function( findex, fvalue ) {
	                            $.each(results[0].address_components, function( rindex, rvalue ) {
	                                if (rvalue.types[0] == findex) {
	                                    /* store formatted address */
	                                    formattedAddress.push(rvalue.long_name);
	                                };
	                            });
	                        });
	                        /* now push those formatted address values into the form field(s) */
	                        formfields.each(function(){
	                            if ($(this).val()=='') {
	                                if (formattedAddress.length > 0) {
	                                    $(this).val(formattedAddress.join(', '));
	                                };
	                            }
	                        });
	                    /* if status was NOT OK, clear the form field */
	                    } else {
	                        formfields.each(function(){
	                            $(this).val('');
	                            alert("Location information is currently unavailable.");
	                        });
	                    }
	                });
	            }
	        }
	        FIG.getGeoLocation = function() {
	            var fig_location = $('.fig-search-location');
	                fig_location.find('input').val('');
	            menu_location.removeClass('show');
	            /* get the user's position */
	            navigator.geolocation.getCurrentPosition(function(position) {
	                console.log('position: ',position);
	                /* if we got it... */
	                if (position && position.coords && position.coords.latitude && position.coords.longitude) {
	                    /* cache the coords */
	                    var vlat = position.coords.latitude,
	                        vlon = position.coords.longitude;
	                    /* send them to fill the form field */
	                    FIG.populateSearchFields(vlat,vlon);
	                    $('.ui-loader').removeClass('show');
	                    /* store for later use */
	                    $.get( '/api/data/html/get/data_widgets/widget_name',{ 
	                        'vlat': vlat, 
	                        'vlon': vlon, 
	                        'name': 'Website - Save Coordinates Session'
	                    }).done(function(data) {
	                        console.log('done: ',data);
	                    });
	                } else {
	                    alert('Location information is currently unavailable.');
	                }
	            }, FIG.geolocationError);
	        }
	        var menu_location = $('#menu_location');
	            menu_location.on('click', 'a', function(e){
	                e.preventDefault();
	                $('.ui-loader').addClass('show');
	                FIG.getGeoLocation();
	            });
	        $('#location_value')
	            .on('focus', function(){
	                menu_location.addClass('show');
	            })
	            .on('blur', function(){
	                menu_location.removeClass('show');
	            });
	    } else {
	        alert('Geolocation is not supported for this Browser/OS version yet.');
	    }

	    /* Google autosuggest location */
        //function to get url GET parameters
        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');

            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
        
                if (sParameterName[0] == sParam) {
                    return decodeURIComponent(sParameterName[1]);
                }
            }
        }    

        //stating variables for the first initialize of the sidebar map
        var geocoder;
        var cachedSelectedOption = [];

        //function that initializes the creation of the google map
        function initialize() {
            //This piece of code will create an autosuggest for every input with the class "googleSuggest"
            var counter = 1;
            var inputsArray = [];
            $(".googleSuggest").each(function(){
                //get the id from the input to be the unique identifier for each autocomplete
                var inputId = $(this).attr("id");
                    $(this).attr("id", inputId+'_'+counter);
                    inputId = $(this).attr("id");
                var inputElement = $(this);
                inputsArray[counter] = document.getElementById(''+inputId);
                var localizedMainCoutry = '';
       
                if (localizedMainCoutry == "") {
                    var inputOptions = {
                        types: ['(regions)']
                    }
        
                } else {
                    var inputOptions = {
                        types: ['(regions)'],
                        componentRestrictions: {country: localizedMainCoutry}
                    };
                }
                var autocomplete = new google.maps.places.Autocomplete(inputsArray[counter], inputOptions);
                google.maps.event.addListener(autocomplete, 'place_changed', function(){
                    cachedSelectedOption = [];
                    cachedSelectedOption.push(autocomplete.getPlace());
                    cachedSelectedOption[0]['typed_location'] = inputElement.val();

                    if (cachedSelectedOption[0]['place_id'] == undefined) {
                        cachedSelectedOption = [];
                        var emptyObj = {
                            'typed_location' : ''
                        };
                        cachedSelectedOption.push(emptyObj);
                    }
                });
                //the code that prevents the submition when hit enter on a google location autocomplete item
                google.maps.event.addDomListener(inputsArray[counter], 'keydown', function(e) { 
            
                    if (e.keyCode == 13) { 
                        var pacCounter = 0;
                        //need to run a loop to check each pac container 
                        $('.pac-container').each(function(){
                    
                            if ($(this).css("display") != "none") {
                                pacCounter++;
                            };
                        });
                        if (pacCounter > 0) {
                            e.preventDefault();
                        }
                    }
                }); 
                counter++;
            });
        }
        initialize();
        //triggers every time a form with the id website-search is trigered
        $('.website-search').submit(function(e){
            var currentForm = $(this);
            var locationInput = currentForm.find(".googleLocation");
            
            //checks if the location input is filled when submitting the search form
            if (locationInput.val() != "") {
                e.preventDefault();
                //this variable has the main country of the site
                var countryRegion = "DE";
                var localizedSearchSetting = "0";
                var form = currentForm;
                var urlGET = form.serialize();
                var formActionUrl = form.attr("action");
                var locationValue = locationInput.val();

                //if the setting localized search is equal to 1 then the region parameter will be sent with the main country of the site
                if (localizedSearchSetting != 1) {
                    countryRegion = "";
                }
                if (cachedSelectedOption[0] == undefined) {
                    var emptyForm = {
                        'typed_location' : ''
                    }
                    cachedSelectedOption.push(emptyForm);
                }
                if (locationValue != cachedSelectedOption[0]['typed_location']) {
                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode( { 
                        'address': locationValue , 
                        'region' : countryRegion
                    }, function(results, status) {

                        //if the google response of the geocoding was successful it will use that info to build the url for the new search
                        if (status == google.maps.GeocoderStatus.OK) {
                            parseInfoToSearch(results,urlGET,formActionUrl);

                        } else {
                            var urlPath = formActionUrl;
                            var redirect = urlPath+"?"+urlGET;
                            //will redirect the page using the new url that has been constructed
                            window.location.href = redirect;
                        }
                    });

                } else {
                    parseInfoToSearch(cachedSelectedOption,urlGET,formActionUrl);
                }            
            }
        });
        function parseInfoToSearch(results,urlGET,formActionUrl) {
            var parameters = {};
            var adComLength = results[0].address_components.length;
            var addressComponentsArray = [];

            //loop that will build the array with the address components and will get the short name of country and administrative area level 1
            for (var i = 0; i < adComLength; i++) {

                if (results[0].address_components[i]['types'][0] == "country") {
                    parameters.country_sn = results[0].address_components[i]['short_name'];
                };
                if (results[0].address_components[i]['types'][0] == "administrative_area_level_1") {
                    parameters.adm_lvl_1_sn = results[0].address_components[i]['short_name'];
                };
                if (results[0].address_components[i]['types'][0] == "administrative_area_level_2") {
                    parameters.county_sn = results[0].address_components[i]['short_name'];
                };
                if (results[0].address_components[i]['types'][0] == "locality") {
                    parameters.city = results[0].address_components[i]['long_name'];
                };
                if (results[0].address_components[i]['types'][0] == "postal_code") {
                    parameters.postal_code = results[0].address_components[i]['long_name'];
                };
            };
            parameters.location_type = results[0].types[0];
            if (parameters.adm_lvl_1_sn != '') {
                parameters.stateSearch = parameters.adm_lvl_1_sn;
            }

            if (parameters.country_sn == "GB") {
                delete parameters.adm_lvl_1_sn;
            };
            //will check if the response had the bounds parameters
            //if it had it will add the south west and north east parameters to the new url
            if(results[0].geometry.hasOwnProperty('bounds') || results[0].geometry.hasOwnProperty('viewport')) {
    
                if (results[0].geometry.hasOwnProperty('bounds')) {
                    var boundsResponse = results[0].geometry.bounds;        

                } else {
                    var boundsResponse = results[0].geometry.viewport;        
                }
                parameters.swlat = boundsResponse.getSouthWest().lat();
                parameters.nelat = boundsResponse.getNorthEast().lat();
                parameters.swlng = boundsResponse.getSouthWest().lng();
                parameters.nelng = boundsResponse.getNorthEast().lng();
                
                //if there were not bounds parameters in the response it will send the parameter fsearch as radius so a radius search will be performed because of lack of info for this location
            } else {
                parameters.fsearch = "radius";
            }
            var locationCenterResponse = results[0].geometry.location;
            parameters.lat = locationCenterResponse.lat();
            parameters.lng = locationCenterResponse.lng();
            parameters.faddress = results[0].formatted_address;
            parameters.place_id = results[0].place_id;
            var formatParameters = $.param(parameters);
            urlGET = urlGET+"&"+formatParameters;
            var urlPath = formActionUrl;
            var redirect = urlPath+"?"+urlGET;
            //will redirect the page using the new url that has been constructed
            window.location.href = redirect;
        }

        var vlon = '';
        var vlat = '';
        var geocodeVisitorsSetting = '1';
        var geocodingMethod = 'HTML5';

        // check for Geolocation support
        if ((vlon.length < 8 || vlat.length < 8) && geocodeVisitorsSetting == 1 && geocodingMethod == "HTML5") {
            
            function showError(error) {

                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Unable to get your location because you denied permission earlier.\n\nPlease reset your GeoLocation permission for this website and refresh the page.");
                    break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                    break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                    break;
                    case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                    break;
                }
                console.log(error.message);
            }
            if (navigator.geolocation) {
                window.getGeoLocation = function() {
                    var geolocation = $('div.form-group.geo-location');
                        geolocation
                            .addClass('loading')
                            .find('input').val('');
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log('position: ',position);
                        vlat = position.coords.latitude;
                        vlon = position.coords.longitude;
                        populateSearchFields('current');
                        geolocation.removeClass('loading');
                        $.get( "/api/data/html/get/data_widgets/widget_name",{ 
                            "vlat": vlat, 
                            "vlon": vlon, 
                            "name": "Website - Save Coordinates Session"
                        }).done(function(data) {
                            console.log('done: ',data);
                        }); 
                    },showError);
                };
            } else {
                alert('Geolocation is not supported for this Browser/OS version yet.');
            }
        }
        if (geocodeVisitorsSetting == 1 && geocodingMethod == "IP") {
            populateSearchFields();
        };
        //check the advanced setting "geocode_visitor_default" if set to 1 will override the "location_value" values to the formatted desire address from the google reverse geocoding response
        function populateSearchFields(current) { // current is provided if trying use the user's current location

            var location_value = '';
            if (!current && getUrlParameter('location_value')) {
                location_value = decodeURIComponent(getUrlParameter('location_value')).replace(/\+/g, ' ');
            }

            var prePopulateLocationSetting = '1';
            var geolocationMethod = 'HTML5';

            var formfields = $('.googleSuggest');
 
            // if set to 1 will get the lat and lng to do reverse geocoding
            if (location_value == '' && prePopulateLocationSetting == 1 && (geolocationMethod == "HTML5" || geolocationMethod == "IP")) {
                if ( vlat !== '' && vlon !== '' ) {
                    var visitorLatLng = new google.maps.LatLng(parseFloat(vlat),parseFloat(vlon));
                    var visitorGeocoder = new google.maps.Geocoder();
                    var formattedAddress = [];
                    var preFormattedStructure = {
                        "locality" : "long_name",
                        "administrative_area_level_1" : "long_name",
                        "country" : "long_name"
                    };
                    visitorGeocoder.geocode( {'latLng': visitorLatLng}, function(results, status) {
                        //if the google response of the geocoding was successful it will use that info to build the url for the new search
                        if (status == google.maps.GeocoderStatus.OK) {
                            $.each(preFormattedStructure, function( findex, fvalue ) {
                                $.each(results[0].address_components, function( rindex, rvalue ) {
                                    if (rvalue.types[0] == findex) {
                                        formattedAddress.push(rvalue.long_name);
                                    };
                                });
                            });
                            formfields.each(function(){
                                if ($(this).val()=='') {
                                    if (formattedAddress.length > 0) {
                                        $(this).val(formattedAddress.join(', '));
                                    };
                                }
                            });
                        } else {
                            formfields.each(function(){
                                $(this).val('');
                            });
                        }
                    }); // visitorGeocoder.geocode
                } // if vlat && vlon...
            }; // if location_value...
            formfields.each(function(){
                if ($(this).val() == '') {
                    $(this).val(location_value);
                }
            });
        }; // populateSearchFields
        populateSearchFields();

		/* refresh dropdowns for page refresh */
		setTimeout(function(){
		    $(['group_category','Make','Model']).each(function(i, v){
		        $('#'+v+'-button').attr('href','#'+v+'-listbox').data('rel','popup');
		    });
		}, 500);

	} // module--home

	// Search results page
	if ( $('.module--search').length > 0 ) {

	    // register Search View stats
	    var listings = {
	        "listings" : []
	    };
	    $('.postItem').each(function(i, elem){
	    	// <span class="postItem" data-userid="5442" data-datatype="4" data-dataid="67" data-postid="51877"></span>
	    	var elem = $(elem).data();
	        listings["listings"].push({
	            "user_id" : elem.userid,
	            "data_id" : elem.dataid,
	            "feature_id" : elem.postid,
	            "click_type" : 'Car App',
	            "click_name" : 'Search',
	            "click_from" : window.location.href
	        });
	    });
	    if ( listings["listings"].length > 0 ) {
	        $.ajax({
	            url: '/api/widget/json/get/Bootstrap%20Theme%20-%20FiG%20-%20Track%20Listing%20Views',
	            type: 'POST',
	            dataType: 'json',
	            data: listings,
	            success: function (data) {
	                console.log(data);
	            }
	        });
	    }
	} // module--search

	// Detail page
	if ( $('.module--detail').length > 0 ) {
        // init gallery
        $('#gallery-1').royalSlider({
            arrowsNav: true,
            arrowsNavAutoHide: false,
            arrowsNavHideOnTouch: false,
            autoHeight: true,
            autoScaleSlider: false,
            autoScaleSliderHeight: 475,
            autoScaleSliderWidth: 960,     
            controlNavigation: 'none',
            fadeinLoadedSlide: true,
            fullscreen: {
                enabled: true,
                nativeFS: true
            },
            globalCaption: false,
            globalCaptionInside: false,
            imageAlignCenter: true,
            imageScaleMode: 'none',
            keyboardNavEnabled: false,
            loop: false,
            navigateByClick: true,
            numImagesToPreload: 2
        });
        // remove tabs, and move content
        // collect page elements
        var fig_parent = $('main > div[role="tabpanel"]'),
            fig_tabs = fig_parent.find('.nav-tabs'),
            fig_titles = fig_tabs.find('a'),
            fig_title, fig_target;
	        // loop through tabs
	        fig_titles.each(function(i,v){
	            // grab titles & their targets
	            fig_title = $(v).text();
	            fig_target = $(v).attr('href');
	            // insert titles at the top of each target
	            $(fig_target).prepend('<h2>'+fig_title+'</h2>');
	        });
	        // remove the tabs
	        fig_tabs.remove();
	        // show all panes, stacked
	        fig_parent.find('.tab-pane').addClass('active tmargin');
	    //  convert Send Message "Subject to textarea & add autoresize to textareas
        var fig_input = $('input[name="item_name"]'),
			fig_placeholder = fig_input.attr('placeholder'),
			fig_parent = fig_input.parent(),
			fig_textarea = $('<textarea name="item_name" placeholder="'+fig_placeholder+'" required="required" class="form-control"/>');
		fig_input.remove();
		fig_parent.append(fig_textarea);

        // add listing info to Contact form
        $('[name="item_name"]').val('RE: Your FindItGuide.com Listing: '+$('h1[itemprop="name"]').text());
        $('[name="lead_message"]').val('Is this still available?\n\nSubmitted from: '+$('div[data-canonical]').data('canonical'));
		// plant canonical URL in form
		$('[name="url_from"]').val($('.module--detail').data('canonical'));
		// delete dupe Contact form
		$('#main-contact-placeholder').find('.modal').remove();
		// remove fade class from remaining modal (causes conflict with Bootstrap)
		$('.modal').removeClass('fade');

		// setup autoresize for textareas in this form
		$('.modal').find('textarea').autoResize();
		$('[data-target="#contactModal"]').on('click', function (e) {
			setTimeout(function(){
				$('.modal').find('textarea').trigger('change');
			}, 250);
		});
	} // module--detail

	// Saved page
	if ( $('.module--saved').length > 0 ) {
		// fetch any Saved pages from localStorage
		ap_get_saved_listings();
	} // module--saved

	// Settings page
	if ( $('.module--settings').length > 0 ) {

		/* Push Notifications */

		// toggle individual push notifications
		function ap_toggle_push_notification_options() {
			// declare a few variables
			var ap_settings = {},
				ap_checkbox,
				ap_checked,
				ap_cookie,
				ap_name,
				ap_href = 0;
			// loop through push options
			$('#ap_push_notification_options').find('input[type="checkbox"]').each(function(i, elem) {
				ap_checkbox = $(elem),
				ap_checked  = (ap_checkbox.is(':checked') ? 'true' : 'false');
				ap_cookie   = ap_checkbox.attr('id');    // ap_push_notifications_fig_cars
				ap_name     = ap_checkbox.attr('value'); // FIG_Cars_app
				//console.log(ap_name, ap_checked);
				if ( ap_checked === 'true' ) {
					// store setting
					ap_set_cookie(ap_cookie, ap_checked, 9999, '/');
					ap_href = 'unregister';
				} else {
					// store setting
					ap_delete_cookie(ap_cookie, '/');
					ap_href = 'register';
				}
				// notify OneSignal
				ap_settings[ap_name] = ap_checked;
			});
			// then update settings
			setTimeout(function(){
				$('#ap_push_notifications_button').attr('href', 'gonative://onesignal/'+ap_href);
				window.location.href = 'gonative://onesignal/tags/set?tags=' + JSON.stringify(ap_settings);
			}, 500);
		} // ap_toggle_push_notification_options

		// add listener to toggle
        $('#ap_push_notifications_button').on('click', function(e){
        	// trigger checkbox change
        	$('#ap_push_notifications_fig_cars').trigger('click');
            // update rest of UI
            ap_toggle_push_notification_options();
        });

        /* Native Share */
        // https://gonative.io/docs#native-js-share
        $('.ap_native_share_buttons').on('click', 'a', function(){
    		window.location.href = $(this).attr('href');
    	});
	} // module--settings

	/**
	 * Google Analytics
	**/
	// configure
	var gadwpDnt = false;
	var gadwpProperty = 'UA-67480346-2';
	var gadwpDntFollow = true;
	var gadwpOptout = true;
	var disableStr = 'ga-disable-' + gadwpProperty;
	if(gadwpDntFollow && (window.doNotTrack === "1" || navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1")) {
	    gadwpDnt = true;
	}
	if (gadwpDnt || (document.cookie.indexOf(disableStr + '=true') > -1 && gadwpOptout)) {
	    window[disableStr] = true;
	}
	function gaOptout() {
	    var expDate = new Date;
	    expDate.setFullYear(expDate.getFullYear( ) + 10);
	    document.cookie = disableStr + '=true; expires=' + expDate.toGMTString( ) + '; path=/';
	    window[disableStr] = true;
	}
	ga('create', 'UA-41861727-15', 'auto');
	ga('require', 'displayfeatures');
	ga('require', 'linkid');
	ga('set', 'forceSSL', true);
	ga('set', 'anonymizeIp', true);
	ga('set', 'dimension1', 'online');
	ga('send', 'pageview');

	// setup custom events
	// toggling Favorite button
	$('.favorite-wrapper').on('click', 'button', function(e){
        var ap_target      = $(e.target),
            ap_eventAction = ap_target.hasClass('ap-saved') ? 'Remove' : 'Add',
            ap_eventLabel  = 'https://www.finditguide.com/'+ap_target.data('saveurl');
	    ga('send', 'event', {
	        eventCategory : 'Favorite',
	        eventAction   : ap_eventAction,
	        eventLabel    : ap_eventLabel
	    });
	});
	// Sell > Join button
	$('.module--sell').on('click', 'a.btn', function(e){
	    ga('send', 'event', {
	        eventCategory : 'Sell > Join',
	        eventAction   : 'Click',
	        eventLabel    : e.target.innerText
	    });
	});
	// Saved > View button
	$('#ap_saved').on('click', 'a', function(e){
        var ap_target      = $(e.target),
            ap_eventLabel  = 'https://www.finditguide.com'+ap_target.attr('href');
	    ga('send', 'event', {
	        eventCategory : 'Saved > View',
	        eventAction   : 'Click',
	        eventLabel    : ap_eventLabel
	    });
	});
	// Saved > Trash button
	$('#ap_saved').on('click', '.fa-trash', function(e){
        var ap_target      = $(e.target),
            ap_eventAction = 'Remove',
            ap_eventLabel  = 'https://www.finditguide.com'+ap_target.parent().find('a').attr('href');
	    ga('send', 'event', {
	        eventCategory : 'Favorite',
	        eventAction   : ap_eventAction,
	        eventLabel    : ap_eventLabel
	    });
	});
    // toggling Push Notifications
    $('#ap_push_notification_options').on('change', 'input[type="checkbox"]', function(e){
        var ap_target      = $(e.target),
            ap_eventAction = ap_target.is(':checked') ? 'Opt-In' : 'Opt-Out',
            ap_eventLabel  = ap_target.val();
        ga('send', 'event', {
            eventCategory : 'Push Notification',
            eventAction   : ap_eventAction,
            eventLabel    : ap_eventLabel
        });
    });
	// footer nav Back button
	$('#app-bottom-nav').on('click', 'a', function(e){
	    ga('send', 'event', {
	        eventCategory : 'Footer Nav',
	        eventAction   : 'Click',
	        eventLabel    : e.target.innerText
	    });
	});

	/**
	 * JS Welcome Tour
	 */
	/*if ( !localStorage.getItem( 'figcars_welcome_tour_end' ) ) {
		$('body').append('<script src="/app/wp-content/themes/app/js/tour-welcome.js"></script>)');
	}*/

} // ap_after_page_content_loaded

/** Dynamic content fetch **/
function ap_fetch_page_content() {
	var placeholder = $('.ap_placeholder'),
		widgetname = placeholder.data('widgetname'),
		query = location.search,
		url = 'https://www.finditguide.com/api/widget/json/get/'+widgetname+query;
	//placeholder.find('p.alert.alert-danger').remove().end().addClass('loading ui-loader show');
	placeholder.find('p.alert.alert-danger').remove().end().addClass('show');
	$.ajax({
	    url: url,
		dataType: 'html'
	})
	.done(function(data) {
		if ( data.match('error:') ) {
			window.location.href = data.replace('error: ','');
		} else {
			/** Atg: override path: Start **/
			data = data.replace(/app-find-it-guide-cars/g, 'custom/app-find-it-guide-cars');
			data = data.replace(/app-find-it-guide-cars-search/g, 'app-find-it-guide-cars-search/index.php');
			/** Atg: override path: End **/
		    placeholder.html(data).removeClass('ap_placeholder loading ui-loader show').trigger('create');
		    ap_after_page_content_loaded();
		}
	})
	.fail(function(data) {
	    console.log('error: ', data);
	    var msg = '<p class="alert alert-danger vmargin hmargin text-center">'
	    			+'<strong>Doh!</strong><br>'
	    			+'We\'re having trouble crawling the Intertubes...<br>'
	    			+'Maybe a bad Internet connection?<br><br>'
	    			+'<button class="btn btn-success" onclick="ap_fetch_page_content();">Try again</button>'
	    		+'</p>';
	    placeholder.html(msg).removeClass('loading ui-loader show');
	});
}


/**
 * Page load functions
 */
$(function() {
	ap_fetch_page_content();
});
