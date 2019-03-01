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


$( document ).ready(function() {

  //This whole function is used to highlight the border of the date-option element depending on which date the visitor has selected
    var switchInput = $( ".switch-input" );
    var highlightDateOption = function() {
      var activeInput = $( ".switch-input:checked" );
      var parent = activeInput.parents('.date-option');
      parent.addClass('primary-border');

      var inactiveInput = $( ".switch-input:not(:checked)" );
      var inactiveParent = inactiveInput.parents('.date-option');
      inactiveParent.removeClass('primary-border');

    }
    highlightDateOption();
    switchInput.on( "click", highlightDateOption );
});
