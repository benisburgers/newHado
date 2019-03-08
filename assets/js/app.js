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
  }
  else {
    $('.main-carousel').removeClass('row');
    $('.carousel-cell').removeClass('columns');
  }
}

$( document ).ready(function() {


  //This whole function is used to highlight the border of the date-option element depending on which date the visitor has selected
    var switchInput = $( ".switch-input" );
    var highlightDateOption = function() {
      var activeInput = $( ".switch-input:checked" );
      var parent = activeInput.parents('.date-option');
      parent.addClass('flicker-border');

      var inactiveInput = $( ".switch-input:not(:checked)" );
      var inactiveParent = inactiveInput.parents('.date-option');
      inactiveParent.removeClass('flicker-border');

    }
    highlightDateOption();
    switchInput.on( "click", highlightDateOption );



    var name = $("#name_input"),
        email = $("#mail_input"),
        phone = $("#phone_input"),
        valid = false;
    validate();
    function validate() {
          //Validate Form

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
          }
          else {
            $('#ajaxButton').addClass("disabled");
            $('#ajaxButton').removeClass("button-enabled");
            valid = false;
          }
        }

        //Create object with a regex to validate each field
        var regex = {
          name:   /^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/i,
          email:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          phone:  /^[0-9 ]+$/,
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

        //checkMandatory() MUST REMAIN AT BOTTOM OF SCRIPT!!!
        function checkMandatory() {
          if (checkBox(name) & checkBox(email) & checkBox(phone)) {
            return true;
          }
          else {
            return false;
          }
        }
        checkMandatory();
    }

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


$( window ).resize(function() {
  checkViewPortWidth();
});
