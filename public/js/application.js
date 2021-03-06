$(document).ready(function() {
  // user drop down
  $(".btn_user").on("click", function() {
    event.preventDefault();
    $("#logout").css("display","block");
  })

  // toggle the log-in and regsitration window
  $("#nav_registration").on("click", ".flag", function() {
    var flag = $(this);
    var link = flag.find('a').attr("class");
    if (link == "login") {
      if($('.register-form').is(':visible')) {
        toggleForm();
      }
    } else {
      if($('.login-form').is(':visible')) {
        toggleForm();
      };
    };
  });

  function toggleForm() {
    $('form').animate({
      height: "toggle",
      opacity: "toggle"
    }, "slow");
  }

  // --- load the courses list --- //
  $("#build_lesson").on( "click", "a", function( event ) {
      event.preventDefault();
      var route="/" + $(this).attr("id");
      console.log(route);
      $.ajax({
        url: route,
        method: "get"
      })
      .done(function(response) {
        // expect the response to send back a partial to display in the #lesson-form
        $("#lesson-form").empty();
        $("#lesson-form").append(response);
      });
  });
  // ----------------------------- //


  $(".register-form").on("submit", function() {
    // stop the form from being submitted if I was called
    event.preventDefault();

    // capture the form so that we can extract the url(action) and method (get/post) and data from form
    var newUserForm = $(this);
    // where does the form get sent to?
    var url = newUserForm.attr("action");
    // get or post?
    var method = newUserForm.attr("method");
    // capture the data from the form
    var formData = newUserForm.serialize();

    $.ajax({
      url: url,
      method: method,
      data: formData
    })
    .done(function(response) {
      // capture the message that the route returns back once the call is made to it

      // if user registered successfully, the controller response will be returned "success"
      if (response === "success") {
        // redirect
        window.location = "/";
      }

      // expecting response to be @errors, which needs to be received as a JSON
      var errors = response
      if(errors.name) {
        nameError = "Name " + errors.name[0];
        $(".name").css("border","1px solid red");
        $(".name").attr("placeholder", nameError);
      } else {
        $("input").removeAttr("border");
      }
      if(errors.email) {
        emailError = "Email " + errors.email[0];
        $(".email").css("border","1px solid red");
        $(".email").val("");
        $(".email").attr("placeholder", emailError);
      } else {
        $("input").removeAttr("border");
      }

      if(errors.password) {
        $('input[type=password]').val("");
        passwordError = "Password " + errors.password[0];
        $(".password").css("border","1px solid red");
        $(".password").val("");
        $(".password").attr("placeholder", passwordError);
      } else {
        $("input").removeAttr("border");
      };
    });
  });

  $("#lesson-form").on("submit", function() {
    // stop the form from being submitted if I was called
    event.preventDefault();

    // capture the form so that we can extract the url(action) and method (get/post) and data from form
    var newLessonForm = $(this);
    // where does the form get sent to?
    var url = $(this).attr("action");
    // get or post?
    var method = $(this).attr("method");
    // capture the data from the form
    var formData = newLessonForm.serialize();

    $.ajax({
      url: url,
      method: method,
      data: formData
    })
    .done(function(response) {
      // capture the message that the route returns back once the call is made to it

      // if user registered successfully, the controller responds with the redierect
      console.log(response);
      document.location.href = response;

      // expecting response to be @errors, which needs to be received as a JSON
      var errors = response
      if(errors.title) {
        nameError = "Lesson Title " + errors.title[0];
        $(".title").css("background-color","#C1E8F6");
        $(".title").attr("placeholder", nameError);
      } else {
        $("input").removeAttr("border");
      };
    });
  });
});
