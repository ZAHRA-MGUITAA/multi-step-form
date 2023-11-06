function adderrormessage() {
  const form = document.getElementById("form");
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let namerrorAdded = false,
    emailerrorAdded = false,
    phonerrorAdded = false;

  name.addEventListener("keyup", () => {
    if (name.value.trim() === "" && !namerrorAdded) {
      let errorname =
        "<span class='error errorname'>name couldn't be empty</span>";
      document
        .getElementById("namelabel")
        .insertAdjacentHTML("afterbegin", errorname);
      namerrorAdded = true;
    } else if (name.value !== "" && namerrorAdded) {
      document.querySelector(".errorname").remove();
      namerrorAdded = false;
    }
  });

  email.addEventListener("keyup", () => {
    if (!email.value.includes("@") && !emailerrorAdded) {
      let erroremail =
        "<span class='error erroremail'>Please enter a valid email address.</span>";
      document
        .getElementById("emaillabel")
        .insertAdjacentHTML("afterbegin", erroremail);
      emailerrorAdded = true;
    } else if (email.value.includes("@") && emailerrorAdded) {
      document.querySelector(".erroremail").remove();
      emailerrorAdded = false;
    }
  });

  phone.addEventListener("keyup", () => {
    if (phone.value.length < 10 && !phonerrorAdded) {
      let phoneerror =
        "<span class='error phoneerror'>phone number must be 10 numbers</span>";
      document
        .getElementById("phonelabel")
        .insertAdjacentHTML("afterbegin", phoneerror);
      phonerrorAdded = true;
    } else if (phone.value.length == 10 && phonerrorAdded) {
      document.querySelector(".phoneerror").remove();
      phonerrorAdded = false;
    }
  });
}
adderrormessage();

function switch_() {
  let toggle = document.querySelector(".toggle-switch");
  let monthly_p = document.querySelector(".monthly-p");
  let yearly_p = document.querySelector(".yearly-p");
  if (toggle.classList.contains("monthly")) {
    toggle.classList.toggle("yearly");
    toggle.classList.remove("monthly");
    yearly_p.style.color = "var(--Marine-blue)";
    monthly_p.style.color = "var(--Light-gray)";
    let yearlyprice =
      getFromLocalStorage("plan").planprice.match(/\d+/)[0] * 10;
    console.log(Number(yearlyprice));
    document.querySelectorAll("span.planprice.monthly").forEach((plan) => {
      plan.style.display = "none";
    });
    document.querySelectorAll("span.planprice.yearly").forEach((plan) => {
      plan.style.display = "block";
    });
    document.querySelectorAll(".free").forEach((free) => {
      free.style.display = "block";
    });
  } else if (toggle.classList.contains("yearly")) {
    toggle.classList.add("monthly");
    toggle.classList.remove("yearly");
    monthly_p.style.color = "var(--Marine-blue)";
    yearly_p.style.color = "var(--Light-gray)";
    let monthlyprice = getFromLocalStorage("plan").planprice.match(/\d+/)[0];
    document.querySelectorAll("span.planprice.monthly").forEach((plan) => {
      plan.style.display = "block";
    });
    document.querySelectorAll("span.planprice.yearly").forEach((plan) => {
      plan.style.display = "none";
    });
    document.querySelectorAll(".free").forEach((free) => {
      free.style.display = "none";
    });
  }
}

function nextStep(stepNumber) {
  let currentstep = document.getElementById("step-" + (stepNumber - 1));
  let currentstepSide = document.querySelector(".step-" + (stepNumber - 1));
  currentstepSide.classList.remove("active");
  currentstep.classList.remove("active");
  let nextStep = document.getElementById("step-" + stepNumber);
  let nextStepSide = document.querySelector(".step-" + stepNumber);
  nextStepSide.classList.add("active");
  nextStep.classList.add("active");
}

function goback(stepNumber) {
  let currentstep = document.getElementById("step-" + (stepNumber + 1));
  currentstep.classList.remove("active");
  let prevstep = document.getElementById("step-" + stepNumber);
  prevstep.classList.add("active");
  let currentstepSide = document.querySelector(".step-" + (stepNumber + 1));
  currentstepSide.classList.remove("active");

  let prevStepSide = document.querySelector(".step-" + stepNumber);
  prevStepSide.classList.add("active");
}

function selectplan() {
  let planstep2radio = document.querySelectorAll(
    '.planstep2 input[type="radio"]'
  );
  let planstep2 = document.querySelector(".planstep2");
  planstep2.addEventListener("click", () => {
    planstep2radio.forEach((plan, index) => {
      if (plan.checked) {
        plan.nextElementSibling.style.border = "1px solid var(--Purplish-blue)";
        plan.style.background = "var(--Alabaster)";
      } else {
        plan.nextElementSibling.style.border = "1px solid var(--Light-gray)";
        plan.style.background = "none";
      }
    });
  });
}
selectplan();

function firststep() {
  document.getElementById("step-1");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  saveToLocalStorage("name", name);
  saveToLocalStorage("email", email);
  saveToLocalStorage("phone", phone);
}
function secondstep() {
  let planstep2 = document.getElementsByName("subscription");
  let toggle = document.querySelector(".toggle-switch");

  if (toggle.classList.contains("monthly")) {
    planstep2.forEach((plan) => {
      if (plan.checked) {
        saveToLocalStorage("plan", {
          planname: plan.value,
          planprice:
            plan.nextElementSibling.querySelector(".planprice.monthly")
              .innerHTML,
        });
      }
    });
    saveToLocalStorage("package", "monthly");
  } else if (toggle.classList.contains("yearly")) {
    planstep2.forEach((plan) => {
      if (plan.checked) {
        saveToLocalStorage("plan", {
          planname: plan.value,
          planprice:
            plan.nextElementSibling.querySelector(".planprice.yearly")
              .innerHTML,
        });
      }
    });
    saveToLocalStorage("package", "yearly");
  }
}
function thirdstep() {
  let addons = document.getElementsByName("addon");
  let selectedaddons = [];
  let toggle = document.querySelector(".toggle-switch");
  addons.forEach((addon) => {
    if (toggle.classList.contains("monthly")) {
      addon.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
        "none";
      addon.nextElementSibling.nextElementSibling.style.display = "block";
    } else if (toggle.classList.contains("yearly")) {
      addon.nextElementSibling.nextElementSibling.style.display = "none";
      addon.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
        "block";
    }
    if (addon.checked) {
      if (toggle.classList.contains("monthly")) {
        let addonvalue = addon.value;
        let addonprice = addon.nextElementSibling.nextElementSibling.innerHTML;

        selectedaddons.push({ value: addonvalue, price: addonprice });
      } else if (toggle.classList.contains("yearly")) {
        let addonvalue = addon.value;
        let addonprice =
          addon.nextElementSibling.nextElementSibling.nextElementSibling
            .innerHTML;

        selectedaddons.push({ value: addonvalue, price: addonprice });
      }
    }
  });
  saveToLocalStorage("addons", selectedaddons);
}
function forthstep() {
  let plan = document.querySelector(".plane");
  let selectedplan = getFromLocalStorage("plan");
  let total = document.querySelector(".total h5");
  let totalprice = 0;
  let toggle = document.querySelector(".toggle-switch");
  let htmlplan = `<h6>${selectedplan.planname} (${getFromLocalStorage(
    "package"
  )})</h6><h6>${selectedplan.planprice}</h6>`;
  totalprice += Number(selectedplan.planprice.match(/\d+/)[0]);
  plan.innerHTML = htmlplan;
  let serviceonline = document.querySelector(".service-online");
  let selectedaddons = getFromLocalStorage("addons");
  serviceonline.innerHTML = "";
  selectedaddons.forEach((addon) => {
    serviceonline.insertAdjacentHTML(
      "beforeEnd",
      `<div>
    <p>${addon.value}</p>
    <p>${addon.price}</p>
  </div>`
    );
    totalprice += Number(addon.price.match(/\d+/)[0]);
  });
  total.innerHTML =
    "+$" + totalprice + (toggle.classList.contains("monthly") ? "/mo" : "/yr");
}
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Clear all values from local storage
function clearLocalStorage() {
  localStorage.clear();
}
// Retrieve a value from local storage
function getFromLocalStorage(key) {
  var value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}
document.getElementById("firststepnext").addEventListener("click", () => {
  firststep();
});
document.getElementById("step2").addEventListener("click", () => {
  secondstep();
  thirdstep();
});
document.getElementById("step-3").addEventListener("change", () => {
  thirdstep();
  forthstep();
});
document.getElementById("step3").addEventListener("click", () => {
  thirdstep();
  forthstep();
});
document.querySelector("#step-2").addEventListener("change", () => {
  secondstep();
  thirdstep();
});

document.getElementById("step4").addEventListener("click", () => {
  clearLocalStorage();
  document.getElementById("form").style.display = "none";
  document.querySelector(".thankyou").style.display = "block";
});
