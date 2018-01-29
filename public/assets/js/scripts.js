/**<style>

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans";
  font-size: 14px;
}

.container {
  width: 500px;
  margin: 25px auto;
}

form {
  padding: 20px;
  background: #2c3e50;
  color: #fff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
}

form label,
form input,
form button {
  border: 0;
  margin-bottom: 3px;
  display: block;
  width: 100%;
}

form input {
  height: 25px;
  line-height: 25px;
  background: #fff;
  color: #000;
  padding: 0 6px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

form button {
  height: 30px;
  line-height: 30px;
  background: #e67e22;
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
}

form .error {
  color: #ff0000;
}
form input.error {
  border: 3px solid #ff0000;
}

</style>

  <div class="container">
  <h2>Registration</h2>
  <form action="" id="reg" name="registration">

    <label for="firstname">First Name</label>
    <input type="text" name="firstname" id="firstname" placeholder="John" />

    <label for="lastname">Last Name</label>
    <input type="text" name="lastname" id="lastname" placeholder="Doe" />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" placeholder="john@doe.com" />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" />

    <button type="submit">Register</button>

  </form>
</div>
 */
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  var validation = {
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      password: {
        required: true,
        minlength: 5
      }
    },
    // Specify validation error messages
    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function() {
      	form.submit();      
    }
  };
  
  var inputsAvailable = Object.keys(validation.rules);
  var inputsStatus = {};
  
  var executeSubmit = function(){
  	
    inputsAvailable.forEach(function(inputElement){
      inputsStatus[inputElement] = validateInputs(inputElement);
    });
    var isAllValid = true;
    for(var i in inputsStatus){
      if(!inputsStatus[i]){
        isAllValid = false;
        break;
      }
    }
    debugger;
    if(isAllValid){
    	$('#reg').submit();
      console.log("Call Submit");
    }
  };
  
  var validateInputs = function(thisElement){
  	var $element = $("#"+thisElement);
    if(typeof validation.rules[thisElement] == "string" && validation.rules[thisElement] == "required"){
    	var valueOfElement = $element.val(),
      		isValid = exeReq(valueOfElement, $element);;
      return isValid;
    }else if(typeof validation.rules[thisElement] == "object"){
    	var isValid = false;
      var valueOfElement = $element.val();
    	if(validation.rules[thisElement].required && !isValid){      	
      	isValid = exeReq(valueOfElement, $element);
      }
      if(validation.rules[thisElement].email && isValid){
      	isValid = valEmail(valueOfElement);
      }      
      if(validation.rules[thisElement].minlength && isValid){
      	var minlength =validation.rules[thisElement].minlength;
      	isValid = valueOfElement.length >= minlength ? true : false;
      }
      if(validation.rules[thisElement].maxlength && isValid){
      	var maxlength = validation.rules[thisElement].maxlength;
      	isValid = valueOfElement.length <= maxlength ? true : false;
      }
      !isValid ? $element.addClass("error") : $element.removeClass("error");
     	return isValid;
      
    }
    
    function exeReq(valueOfElement, $element){
    	
    	if(valueOfElement.length){
      	$element.removeClass("error");
        return true;
      }else{
      	$element.addClass("error");
        return false;
      }
    };
    function valEmail(val){
    	return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(val);
    };
    
  };
  $('#reg').submit(function(){
   // code
   executeSubmit();
   return false;
	});
});