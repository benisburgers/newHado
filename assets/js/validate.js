$(document).ready(function(){

  console.log('validate.js');


  var name = $(".name_input"),
      email = $(".mail_input"),
      phone = $(".phone_input"),
      valid = false,

      //Validate Form

    //Check form validity everytime value in input field is changed
    $(".input").on('input', function() {
      checkForm();
    });

    //Check Email and Name field AND all address boxes
    function checkForm() {
      //if (name and email are valid) AND address fields are valid (or empty), return true. Else return false.
      if (checkMandatory()) {
        $('#ajaxButton').removeClass("inactive");
        valid = true;
      }
      else {
        $('#ajaxButton').addClass("inactive");
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
        console.log('we good' + input);;
        return true;
      }
      //Else: addClass .invalid to that field and return false.
      else {
        console.log('we bad' + input);;
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

});
