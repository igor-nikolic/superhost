$(document).ready(() => {
  // Email availability check
  $(document).on("blur", "#email", e => {
    if (!e.currentTarget.value) return;
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.currentTarget.value
      )
    ) {
      $("#mailNotify")
        .removeClass("d-none")
        .addClass("d-block")
        .text("Please enter a valid email format!");
      $("#email")
        .removeClass("is-valid")
        .addClass("is-invalid");
      return;
    } else {
      $("#mailNotify")
        .removeClass("d-block")
        .addClass("d-none")
        .text("");
      $("#email")
        .removeClass("is-invalid")
        .addClass("is-valid");
    }
    $.ajax({
      type: "POST",
      url: "/auth/checkemail",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ email: e.currentTarget.value }),
      success: data => {
        if (data.available) {
          $("#email")
            .removeClass("is-invalid")
            .addClass("is-valid");
          $("#mailNotify")
            .removeClass("d-block")
            .addClass("d-none");
        } else {
          $("#email")
            .removeClass("is-valid")
            .addClass("is-invalid");
          $("#mailNotify")
            .removeClass("d-none")
            .addClass("d-block")
            .text("Email not available! Please try another one!");
        }
      },
      error: (xhr, type, exception) => {
        console.log(type);
        console.log(exception);
      }
    });
  });
  // Form validation
  $("#registerForm").on("submit", e => {
    console.log(e.currentTarget.value);
  });

  // Password check
  $(document).on("blur", "#password2", e => {
    const p2 = e.currentTarget.value;
    if (!p2) return;
    const p = $("#password").val();
    console.log(`p1 ${p} p2 ${p2}`);
    if (p === p2) {
      $("#password")
        .removeClass("is-invalid")
        .addClass("is-valid");
      $("#password2")
        .removeClass("is-invalid")
        .addClass("is-valid");
      $("#passwordsNotify")
        .removeClass("d-none invalid-feedback")
        .addClass("d-block valid-feedback")
        .text("Passwords match");
    } else {
      $("#password")
        .removeClass("is-valid")
        .addClass("is-invalid");
      $("#password2")
        .removeClass("is-valid")
        .addClass("is-invalid");
      $("#passwordsNotify")
        .removeClass("d-none valid-feedback")
        .addClass("invalid-feedback d-block")
        .text("Passwords do not match");
    }
  });
  // Password strength check
  $(document).on("blur", "#password", e => {
    const p = e.currentTarget.value;
    const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (prgx.test(p)) {
      $("#passwordNotify")
        .removeClass("d-none invalid-feedback")
        .addClass("d-block valid-feedback")
        .text("Password is strong enough");
    } else {
      $("#passwordNotify")
        .removeClass("d-none valid-feedback")
        .addClass("invalid-feedback d-block")
        .text(
          "Password must be between 6 and 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter"
        );
    }
  });
});
