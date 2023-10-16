function formchecker() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let emcheck = localStorage.getItem(`coffeeShop${email}`);
  if (email != "" && password != "") {
    if (emcheck) {
      let value = JSON.parse(emcheck);
      if (value.Password === password) {
        value = JSON.stringify(value);
        localStorage.setItem("coffeeShopLogerName", value);
        setTimeout(() => {
          location.replace("../index.html")
        }, 100);
      } else {
        document.getElementById("div").innerHTML =
          `<div">Incorrect password <a href="index.html">SignUp</a></div>`;
        setInterval(() => {
          document.getElementById("password").style.border =
            "2px solid red";
        }, 500);
        setInterval(() => {
          document.getElementById("password").style.border =
            "2px solid orange";
        }, 1000);
      }
    } else {
      document.getElementById("div").innerHTML =
        `<div">You don't have account please <a href="index.html">SignUp</a></div>`;
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
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
    }
  }
}