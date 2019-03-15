import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

function checkViewPortWidth() {
    if (Foundation.MediaQuery.atLeast('medium')) {
        $('.main-carousel').addClass('row');
        $('.carousel-cell').addClass('columns');
    } else {
        $('.main-carousel').removeClass('row');
        $('.carousel-cell').removeClass('columns');
    }
}

$(document).ready(function() {

	// define variables
	var name = $("#name_input"),
	    email = $("#mail_input"),
	    phone = $("#phone_input"),
	    entourage = $("#entourage_input"),
	    guestSwitch = $('#guestSwitch'),
	    guestInput = $('#guest-input'),
      form = $('#anmelde_formular'),
      thankYou = $('#thankYou'),
	    guestIsComing = false,
	    valid = false;

    // listen to form submit button
    $('#ajaxButton').on('click', function(e) {
        e.preventDefault();
        makeRequest(valid);
    });

    // execute updateuser.php
    function makeRequest(isValid) {
        //access entered email value for confirmation
        if (isValid) {
          form.addClass('invisible');
          thankYou.addClass('visible');
        	// get selected date
        	var dateSelected = $('.flicker-border').find('span.date').html();
			$('#date_selected').val(dateSelected);

            // declare form element
            var formElement = document.getElementById("anmelde_formular");

            var httpRequest;

            // create request
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                httpRequest = new XMLHttpRequest();

                if (!httpRequest) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }
            } else {
                // code for IE6, IE5
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }

            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // TODO: show confirm text if successful
                    console.log(this.responseText);
                }
            };

            httpRequest.open("POST", "updateuser.php", /* async = */ true);
            httpRequest.send(new FormData(formElement));
            // TODO for BENI: write a function who hides the form when the datas are sent. --> hideForm();
        } else {
        	console.log("form is not valid");
        }
    }

    //This whole function is used to highlight the border of the date-option element depending on which date the visitor has selected
    var switchInput = $(".switch-input");
    var highlightDateOption = function() {
        var activeInput = $(".switch-input:checked");
        var parent = activeInput.parents('.date-option');
        parent.addClass('flicker-border');

        var inactiveInput = $(".switch-input:not(:checked)");
        var inactiveParent = inactiveInput.parents('.date-option');
        inactiveParent.removeClass('flicker-border');

    }
    highlightDateOption();
    switchInput.on("click", highlightDateOption);

    function validate() {
        //Validate Form

        $(guestSwitch).change(function() {
            if (this.checked) {
                $(guestInput).removeClass('hidden');
                guestIsComing = true;
            } else {
                $(guestInput).addClass('hidden');
                guestIsComing = false;
            }
            checkForm();
        });


        //Check form validity everytime value in input field is changed
        $(".input").on('input', function() {
            checkForm();
        });

        //Check Email and Name field AND all address boxes
        function checkForm() {
            //if (name and email are valid) AND address fields are valid (or empty), return true. Else return false.
            if (checkMandatory()) {
                $('#ajaxButton').removeClass("disabled");
                $('#ajaxButton').addClass("button-enabled");
                valid = true;
            } else {
                $('#ajaxButton').addClass("disabled");
                $('#ajaxButton').removeClass("button-enabled");
                valid = false;
            }
        }

        //Create object with a regex to validate each field
        var regex = {
            name: /^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/i,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            phone: /^[0-9 ]+$/,
        };

        //Validate each field against its corresponding regex. Return true or false.
        function checkBox(input) {
            //Create variable with value INSIDE the corresponding field (e.g. inside 'name', we find 'Max Mustermann')
            var value = input.val();
            //Create a variable with each field's corresponding regex, by using this field's name and accessing the 'regex' object.
            var specificRegex = regex[input.attr('regex')];
            //If the field passes the regex test (is valid), removeClass .invalid (visual, red) from that field. Return true.
            if (specificRegex.test(value)) {
                input.addClass('valid')
                return true;
            }
            //Else: addClass .invalid to that field and return false.
            else {
                input.removeClass('valid')
                return false;
            }
        }

        function checkEntourage() {
            if (guestIsComing) {
                if (checkBox(entourage)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }

        //checkMandatory() MUST REMAIN AT BOTTOM OF SCRIPT!!!
        function checkMandatory() {
            if (checkBox(name) & checkBox(email) & checkBox(phone) & checkEntourage()) {
                return true;
            } else {
                return false;
            }
        }
        checkMandatory();
    }
    validate();

    function disableButton() {
        $('#ajaxButton').addClass("disabled");
        valid = false;
    }

    var $lights = $('.flickering-line');
    $lights.viewportChecker({
        classToAdd: 'flicker-lamp',
        repeat: true,
        offset: '15%',
        invertBottomOffset: true
    });

    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true,
        pageDots: false,
        prevNextButtons: false,
        watchCSS: true
    });

    checkViewPortWidth();
});


$(window).resize(function() {
    console.log("resize");
    checkViewPortWidth();
});
