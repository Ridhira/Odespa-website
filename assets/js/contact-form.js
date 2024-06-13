const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.getElementById("booking");
const openModalBtn1 = document.getElementById("booking1");
const closeModalBtn = document.querySelector(".btn-close");
let error = document.getElementById("error-message");
let userName = document.getElementById("userName");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let submitBtn = document.getElementById("submit_btn");

// close modal function update
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  error.innerHTML = "";
  userName.value = "";
  phone.value = "";
  email.value = "";
  submitBtn.textContent = "Submit";
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);
openModalBtn1.addEventListener("click", openModal);

// ! USER DETAILS FORM
// let userDetails = document.getElementById("user-details");

// userDetails.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // let userName = document.getElementById("userName");
//   // let phone = document.getElementById("phone");
//   // let email = document.getElementById("email");
//   // let submitBtn = document.getElementById("submit_btn");
//   // let error = document.getElementById("error-message");

//   error.innerHTML = "";

//   if (phone.value.length !== 10) {
//     error.innerHTML = "Please enter valid phone number";
//   } else {
//     let leadStatus = "New Lead";
//     let leadSource = "Website";
//     let firstName = userName.value.split(" ")[0];
//     let lastName = userName.value.split(" ")[1];
//     let checkboxVal = "Ode Spa";
//     let message = "Booking Enquiry";

//     submitBtn.innerHTML = "Saving...";

//     console.log(error);

//     fetch(
//       `https://script.google.com/macros/s/AKfycbwgCzTPxP13H4LGiRtTGeqAxSOTmLy7t_rfffTm0fKy3CGtyWJlQTBNEhEZ6exXYBNg/exec`,
//       {
//         method: "post",
//       }
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Data--->", data);
//         if (data.data[0].status === "success") {
//           error.classList.add("success_text");
//           error.classList.remove("error-text");
//           error.innerHTML =
//             "Your form details submitted successfully. Thankyou!! ";
//           submitBtn.innerHTML = "Submit";

//           // window.location.replace(
//           //   "https://odespa.zenoti.com/webstoreNew/services?ref=lbb"
//           // );
//           window.open(
//             "https://odespa.zenoti.com/webstoreNew/services?ref=lbb",
//             "_blank"
//           );
//         } else {
//           console.log("In Else Block");
//           error.innerHTML = "Something went wrong. Please Try Again!!";
//           submitBtn.innerHTML = "Submit";
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
// });

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwgCzTPxP13H4LGiRtTGeqAxSOTmLy7t_rfffTm0fKy3CGtyWJlQTBNEhEZ6exXYBNg/exec";

const form = document.forms["user-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      localStorage.setItem("userData", true);
      alert("Thank you! your form is submitted successfully.");
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error("Error!", error.message));
});

// Function to display the contact form popup
const isFormSubmitted = localStorage.getItem("userData");

function showContactForm() {
  let contactForm = document.getElementById("form1");

  if (!isFormSubmitted) {
    contactForm.style.display = "block";
  }
}

setTimeout(showContactForm, 6000);

// Hide Form

const hideForm = () => {
  let contactForm = document.getElementById("form1");
  contactForm.style.display = "none";
};
