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

// @ FORM SUBMISSION
const fnSendWhatsappNotification = async (name, phone, email) => {
  var template = {
    id: "46365bd4-ff0d-45de-aa57-08d348a89583",
    params: [name, phone, email],
  };

  const response = await fetch(
    "https://api.gupshup.io/wa/api/v1/template/msg",
    {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
        apikey: "v5puhrcusaw2hsrc7upudfcs9kzz4ubl",
      },
      body: new URLSearchParams({
        channel: "whatsapp",
        source: "917995026846",
        destination: "917207925841", // Send the message to the provided customer number
        "src.name": "Snogf0uw48PjDbJ44sboh5v5",
        template: JSON.stringify(template),
      }),
    }
  );

  const res = await response.json();
  console.log("res", res);
};

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwgCzTPxP13H4LGiRtTGeqAxSOTmLy7t_rfffTm0fKy3CGtyWJlQTBNEhEZ6exXYBNg/exec";

const form = document.forms["user-form"];
const submitButton = document.querySelector(".submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitButton.textContent = "Saving...";
  const userName = document.getElementById("fullName").value;
  const userPhone = document.getElementById("phoneNumber").value;
  const userEmail = document.getElementById("emailAddress").value;

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("response", response);
      fnSendWhatsappNotification(userName, userPhone, userEmail);
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
