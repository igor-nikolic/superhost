$(document).ready(() => {
  $(document).on("click", ".payBtn", e => {
    console.log("clciked");
    let btn = e.currentTarget;
    let type = $(btn).data("type");
    let obj = { type };
    $.ajax({
      type: "POST",
      url: "http://localhost:5000/api/test",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(obj),
      success: data => {
        console.log(data);
      },
      error: (xhr, type, exception) => {
        console.log(type);
        console.log(exception);
      }
    });
  });
});
