function formchecker() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (name != "" && email != "" && password != "") {
    const person = {
      Name: name,
      Password: password,
    };
    let value = JSON.stringify(person);
    let emcheck = localStorage.getItem(email);
    if (emcheck) {
      document.getElementById("div").innerHTML =
        `<div>You already created account please <a href="log_in.html">LogIn?</a></div>`;
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("div").style.border = "2px solid orange";
      setInterval(() => {
        document.getElementById("div").style.padding =
          "15px 30px";
        document.getElementById("div").style.borderRadius =
          "20px";
        document.getElementById("div").style.border =
          "2px solid red";
      }, 500);
      setInterval(() => {
        document.getElementById("div").style.padding =
          "15px 30px";
        document.getElementById("div").style.borderRadius =
          "20px";
        document.getElementById("div").style.border =
          "2px solid orange";
      }, 1000);
    } else {
      localStorage.setItem(email, value);
      setTimeout(() => {
        location.replace("log_in.html")
      }, 100);
    }
  }
}