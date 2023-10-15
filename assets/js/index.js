// profile update.................
let userName = document.querySelector(".userName");
let obj = localStorage.getItem("logerName");
obj = JSON.parse(obj) || "none";
if (obj != "none") {
  userName.innerHTML = `${obj.Name}`;
}


// signup/Login alert ................................................
window.addEventListener("load", () => {
  setTimeout(() => {
    if (userName.innerHTML.trim() == "User") {
      Swal.fire({
        title: `Hello...!`,
        text: 'Please... SignUp/LogIn...!',
        footer: `<a href="log_in&sign_up/index.html"class="text-primary">SignUp/LogIn</a>`
      })
    }
  }, 10000);
});

// img slider.......................................................
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active2", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active2";
}

// dropdowns........................................
let dropdowns = document.querySelectorAll(".dropdown-toggle");
dropdowns.forEach((dd) => {
  dd.addEventListener("click", function () {
    var el = this.nextElementSibling;
    el.style.display = el.style.display === "block" ? "none" : "block";
  });
});

// navbar........................................
let menu = document.querySelector(".navbar-toggler-icon");
let nav = document.querySelector(".nav");
let x = document.querySelector(".x");
menu.addEventListener("click", () => {
  nav.classList.remove("d-none");
})
x.addEventListener("click", () => {
  nav.classList.add("d-none");
})

// nav.....cartbagicon....................................
let cartBox = document.querySelector(".cart-box");
let cartBag = document.querySelector(".cart-bag");
let cartX = document.querySelector(".cart-x");
cartBag.addEventListener("click", () => {
  cartBox.classList.remove("d-none");
})
cartX.addEventListener("click", () => {
  cartBox.classList.add("d-none");
})


// Add to cart.........................................
let addBox = document.querySelector(".add-box");
let addbtn = document.querySelectorAll(".add");

// GET ELMENT IN TO localStorage
let getArray = JSON.parse(localStorage.getItem("arraylist")) || [];
window.addEventListener("load", () => {
  addToCart();
});

// addbtn.................................................
let addArray = [];
addbtn.forEach(btn => {
  btn.addEventListener("click", () => {
    let img = btn.parentElement.parentElement.querySelector("img").src;
    let name = btn.parentElement.parentElement.querySelector("h3").innerHTML;
    let cost = btn.parentElement.parentElement.querySelector(".cost").innerHTML;
    const arr = [img, name, cost];
    addArray.push(arr);
    let tempArray = removeDuplicates(addArray);
    if (tempArray.length === addArray.length) {
      Swal.fire(
        'Done!',
        'Successfully Add Product.',
        'success'
      )
    } else {
      Swal.fire(
        'Sorry!',
        "You Alreay Added.",
        'warning'
      )
    }
    addArray = tempArray;
    addToCart();
  })
})

// removeDuplicates...............................................
function removeDuplicates(arr) {
  var uniques = [];
  var itemsFound = {};
  for (var i = 0; i < arr.length; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) { continue; }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

// counter...........................
function counter() {
  let count = document.querySelector(".counter");
  count.innerHTML = updateArray.length;
}

// addToCart().................................................
let updateArray = [];
function addToCart() {
  updateArray = [...getArray, ...addArray];
  updateArray = removeDuplicates(updateArray);
  // SET ELMENT IN TO localStorage
  localStorage.setItem("arraylist", JSON.stringify(updateArray));
  addBox.innerHTML = "";
  if (updateArray.length > 0) {
    updateArray.forEach(a => {
      addBox.innerHTML +=
        `<div class="row bg-info">
        <h6 class="name">${a[1]}</h6>
        <div class="col-md-4 col-12 cart-image">
          <img
            src="${a[0]}"
            alt="cart img"
            width="100px"
            height="100px"
          />
        </div>
        <div class="col-md-6 col-12 cart-topic">
          <div class="qtydiv">
            <h3 class="cost">${a[2]}</h3>
            <input
              class="qty"
              type="number"
              value="1"
            />
          </div>
          <br>
          <div class="tdiv">
            <p>SubTotal :</p>
            <p class="tcost">${a[2]}</p>
          </div>
        </div>
        <div class="col-md-2 col-12 cart-delete">
          <a class="fa fa-trash fa-2xl text-danger"></a>
        </div>
      </div>`;
    });
  } else {
    addBox.innerHTML = `<center>Cart Is Empty You can't Buy Any</center>`
  }
  qty();
  delt();
  totals();
  counter();
}

// quantity btn ................................................................
function qty() {
  let qtys = document.querySelectorAll(".qty");
  qtys.forEach((qty) => {
    qty.addEventListener("change", () => {
      if (qty.value <= 0 || qty.value == "") {
        qty.value = 1;
      }
      // update subtotal ..........................
      let cost = parseFloat(qty.parentElement.querySelector(".cost").innerHTML.slice(1));
      let tcost = qty.parentElement.parentElement.querySelector(".tcost");
      let totalValue = qty.value * cost;
      tcost.innerHTML = `$${totalValue}`;
      totals();
    });
  });
}

// delete btn ....................................................................
function delt() {
  let delbtn = document.querySelectorAll(".cart-delete");
  delbtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (updateArray.length === 1 || addArray.length === 1 || getArray.length === 1) {
        updateArray.pop();
        addArray.pop();
        getArray.pop();
      } else {
        updateArray.splice(i, 1);
        addArray.splice(i, 1);
        getArray.splice(i, 1);
      }
      // update ELMENT IN TO localStorage
      localStorage.setItem("arraylist", JSON.stringify(updateArray));
      btn.parentNode.parentNode.removeChild(btn.parentNode);
      if (updateArray.length === 0) {
        addBox.innerHTML = `<center>Cart Is Empty You can't Buy Any</center>`
      }
      totals();
      counter();
    })
  })
}

// total.................................................................
function totals() {
  let total = document.querySelector(".total");
  let tcost = document.querySelectorAll(".tcost");
  let totalCost = 0;
  if (tcost.length <= 0) {
    total.innerHTML = "Total Amount : $0";
  }
  tcost.forEach((t) => {
    totalCost += parseFloat(t.innerHTML.slice(1))
    total.innerHTML = "Total Amount : $" + totalCost.toFixed(2);
  })
}

//buy btn .........................................................................
let buy = document.querySelector(".buy button");
buy.addEventListener("click", () => {
  if (updateArray.length > 0) {
    Swal.fire(
      'Done!',
      'Successfully Buy All Product!',
      'success'
    )
    updateArray = [];
    addArray = [];
    getArray = [];
    // update ELMENT IN TO localStorage
    localStorage.setItem("arraylist", JSON.stringify(updateArray));
    document.querySelector(".add-box").innerHTML = "";
    addBox.innerHTML = `<center>Cart Is Empty You can't Buy Any</center>`
    document.querySelector(".total").innerHTML = "Total Amount : $00.00";
    counter();

  }
  else if (updateArray.length === 0) {
    Swal.fire(
      'Oops!',
      "You Can't Buy Cart Is Empty.",
      'warning'
    )
  }
})

// Animation....................................................................................................

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const h1 = document.querySelector('.pure h1');
  const inputGroup = document.querySelector('.input-group');
  const inputGroupText = document.querySelector('.input-group-text');

  // Add the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    h1.classList.add('animated');
    inputGroup.classList.add('animated');
    inputGroupText.classList.add('animated');
  }, 500); // Adjust the delay as needed

  // Remove the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    h1.classList.remove('animated');
    inputGroup.classList.remove('animated');
    inputGroupText.classList.remove('animated');
  }, 5000); // Adjust the delay as needed
});


document.addEventListener('DOMContentLoaded', function () {
  const h1 = document.querySelector('.independ h1');
  // Add the 'animated' class to trigger the animation after a delay
  setTimeout(() => {
    h1.classList.add('animated2');
  }, 1000); // Adjust the delay as needed
});


document.addEventListener('DOMContentLoaded', function () {
  const icon = document.querySelectorAll('i');
  // Add the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    icon.forEach(i => {
      i.classList.add('animated3');
    });
  }, 500); // Adjust the delay as needed
  // Remove the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    icon.forEach(i => {
      i.classList.remove('animated3');
    });
  }, 2000); // Adjust the delay as needed
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact form');

  // Add the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    form.classList.add('animated4');
  }, 500); // Adjust the delay as needed
  // Remove the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    form.classList.remove('animated4');
  }, 10000); // Adjust the delay as needed
});


document.addEventListener('DOMContentLoaded', function () {
  const footer = document.querySelector('.footer');
  const socialIcons = document.querySelectorAll('.fa-brands');

  // Add the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    footer.classList.add('animated5');
  }, 100); // Adjust the delay as needed
  // Remove the 'animated' class to trigger the animation after a delay
  setInterval(() => {
    footer.classList.remove('animated5');
  }, 2000); // Adjust the delay as needed

  // Optional: Add hover animation for social media icons
  socialIcons.forEach((icon) => {
    icon.addEventListener('mouseover', function () {
      icon.style.opacity = 1;
    });

    icon.addEventListener('mouseout', function () {
      icon.style.opacity = 0.5;
    });
  });
});


// <!-- product fillter.................... -->
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.coffee-shop li');
  const cartItems = document.querySelectorAll('.coffee-shop .cart-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove 'active' class from all filter buttons
      filterButtons.forEach((btn) => btn.classList.remove('activef'));
      // Add 'active' class to the clicked button
      button.classList.add('activef');

      // Show/hide cart items based on the selected filter
      const filter = button.textContent.toLowerCase().trim().replace(" ", "-");
      cartItems.forEach((item) => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
      });
    });
  });
});


