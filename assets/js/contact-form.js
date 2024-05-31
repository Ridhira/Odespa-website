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

// close modal function
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
  console.log("Button Click");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);
openModalBtn1.addEventListener("click", openModal);

// ! USER DETAILS FORM
let userDetails = document.getElementById("user-details");

userDetails.addEventListener("submit", (e) => {
  e.preventDefault();

  // let userName = document.getElementById("userName");
  // let phone = document.getElementById("phone");
  // let email = document.getElementById("email");
  // let submitBtn = document.getElementById("submit_btn");
  // let error = document.getElementById("error-message");

  error.innerHTML = "";

  if (phone.value.length !== 10) {
    error.innerHTML = "Please enter valid phone number";
  } else {
    let leadStatus = "New Lead";
    let leadSource = "Website";
    let firstName = userName.value.split(" ")[0];
    let lastName = userName.value.split(" ")[1];
    let checkboxVal = "Ode Spa";
    let message = "Booking Enquiry";

    submitBtn.innerHTML = "Saving...";

    console.log(error);

    fetch(
      `https://ridhirazen.com/zohocrmleadcreate.php?phone_number=${phone.value}&first_name=${firstName}&last_name=${lastName}&email=${email.value}&product=${checkboxVal}&lead_source=${leadSource}&lead_status=${leadStatus}&description=${message}&mobile=${phone.value}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data--->", data);
        if (data.data[0].status === "success") {
          error.classList.add("success_text");
          error.classList.remove("error-text");
          error.innerHTML =
            "Your form details submitted successfully. Thankyou!! ";
          submitBtn.innerHTML = "Submit";

          // window.location.replace(
          //   "https://odespa.zenoti.com/webstoreNew/services?ref=lbb"
          // );
          window.open(
            "https://odespa.zenoti.com/webstoreNew/services?ref=lbb",
            "_blank"
          );
        } else {
          console.log("In Else Block");
          error.innerHTML = "Something went wrong. Please Try Again!!";
          submitBtn.innerHTML = "Submit";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
