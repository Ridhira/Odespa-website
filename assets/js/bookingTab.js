// Global variable to store final selection
let finalSelection = {
  name: "",
  phone: "",
  city: "",
  outlet: "",
  service: "",
  date: "",
};

// Data structure for cities, outlets, and services
const locationData = {
  "New York": {
    "Midtown Manhattan Outlet": {
      services: ["Haircut", "Color Treatment", "Styling"],
    },
    "Brooklyn Outlet": {
      services: ["Beard Trim", "Hair Coloring", "Scalp Treatment"],
    },
  },
  "Los Angeles": {
    "Hollywood Outlet": {
      services: ["Celebrity Styling", "Color Correction", "Hair Extensions"],
    },
    "Santa Monica Outlet": {
      services: ["Beach Wave Styling", "Balayage", "Hair Spa"],
    },
  },
  Chicago: {
    "Downtown Outlet": {
      services: ["Professional Cut", "Color Consultation", "Keratin Treatment"],
    },
    "Wicker Park Outlet": {
      services: ["Trendy Cuts", "Vivid Colors", "Hair Repair"],
    },
  },
};

// Validation functions
function validateName() {
  const nameInput = document.getElementById("nameInput");
  const nameError = document.getElementById("nameError");

  if (nameInput.value.trim().length < 2) {
    // nameError.textContent = "Name must be at least 2 characters long";
    return false;
  }
  // nameError.textContent = "";
  return true;
}

function validatePhone() {
  const phoneInput = document.getElementById("phoneInput");
  const phoneError = document.getElementById("phoneError");

  // Remove any non-digit characters
  const cleanedPhone = phoneInput.value.replace(/\D/g, "");

  if (cleanedPhone.length !== 10) {
    // phoneError.textContent = "Phone number must be exactly 10 digits";
    return false;
  }
  // phoneError.textContent = "";
  // phoneInput.value = cleanedPhone; // Set cleaned phone number
  return true;
}

function validateDate() {
  const dateInput = document.getElementById("dateInput");
  const dateError = document.getElementById("dateError");

  const selectedDate = new Date(dateInput.value);
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);

  if (JSON.stringify(selectedDate) === "null") {
    return false;
  }

  // if (selectedDate < today) {
  //   // dateError.textContent = "Please select a future date";
  //   return false;
  // }

  // if (selectedDate > maxDate) {
  //   // dateError.textContent = "Please select a date within the next month";
  //   return false;
  // }

  // dateError.textContent = "";
  return true;
}

function setDateConstraints() {
  const dateInput = document.getElementById("dateInput");

  // Get today's date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  // Set min date to today
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  // Set max date to one month from today
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const maxDd = String(maxDate.getDate()).padStart(2, "0");
  const maxMm = String(maxDate.getMonth() + 1).padStart(2, "0");
  const maxYyyy = maxDate.getFullYear();
  dateInput.max = `${maxYyyy}-${maxMm}-${maxDd}`;
}

// Populate city dropdown on page load
function populateCities() {
  const cityDropdown = document.getElementById("cityDropdown");
  // console.log(cityDropdown);
  Object.keys(locationData).forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    // console.log("option==>", option);
    cityDropdown.appendChild(option);
    // console.log("CityDropdown==>", cityDropdown);
  });
}

// Update outlets based on selected city
function updateOutlets() {
  const cityDropdown = document.getElementById("cityDropdown");
  const outletDropdown = document.getElementById("outletDropdown");
  const servicesDropdown = document.getElementById("servicesDropdown");

  // Reset outlet and services dropdowns
  outletDropdown.innerHTML = '<option value="">Choose an Outlet</option>';
  servicesDropdown.innerHTML = '<option value="">Choose a Service</option>';

  const selectedCity = cityDropdown.value;

  if (selectedCity) {
    // Enable outlet dropdown
    outletDropdown.disabled = false;

    // Populate outlets for selected city
    Object.keys(locationData[selectedCity]).forEach((outlet) => {
      const option = document.createElement("option");
      option.value = outlet;
      option.textContent = outlet;
      outletDropdown.appendChild(option);
    });

    // Update global selection
    finalSelection.city = selectedCity;

    // Validate and check form completeness
    validateForm();
  } else {
    // Disable dropdowns if no city is selected
    outletDropdown.disabled = true;
    servicesDropdown.disabled = true;
  }
}

// Update services based on selected outlet
function updateServices() {
  const cityDropdown = document.getElementById("cityDropdown");
  const outletDropdown = document.getElementById("outletDropdown");
  const servicesDropdown = document.getElementById("servicesDropdown");

  // Reset services dropdown
  servicesDropdown.innerHTML = '<option value="">Choose a Service</option>';

  const selectedCity = cityDropdown.value;
  const selectedOutlet = outletDropdown.value;

  if (selectedCity && selectedOutlet) {
    // Enable services dropdown
    servicesDropdown.disabled = false;

    // Populate services for selected outlet
    locationData[selectedCity][selectedOutlet].services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service;
      option.textContent = service;
      servicesDropdown.appendChild(option);
    });

    // Update global selection
    finalSelection.outlet = selectedOutlet;

    // Validate and check form completeness
    validateForm();
  } else {
    // Disable services dropdown
    servicesDropdown.disabled = true;
  }
}

// Add event listeners for validation
function addEventListeners() {
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const cityDropdown = document.getElementById("cityDropdown");
  const outletDropdown = document.getElementById("outletDropdown");
  const servicesDropdown = document.getElementById("servicesDropdown");
  const dateInput = document.getElementById("dateInput");
  const form = document.getElementById("serviceBookingForm");

  // Input event listeners for validation
  nameInput.addEventListener("input", () => {
    validateName();
    validateForm();
  });

  phoneInput.addEventListener("input", () => {
    validatePhone();
    validateForm();
  });

  servicesDropdown.addEventListener("change", () => {
    const selectedService = servicesDropdown.value;
    finalSelection.service = selectedService;
    validateForm();
  });

  dateInput.addEventListener("change", () => {
    validateDate();
    if (validateDate()) {
      finalSelection.date = dateInput.value;
    }
    validateForm();
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Final validation before submission
    if (validateForm(true)) {
      // Capture final values
      finalSelection.name = nameInput.value.trim();
      finalSelection.phone = phoneInput.value;

      // Log or send to API
      console.log("Final Booking Details:", finalSelection);

      // Here you would typically call your API
      // For example:
      // callBookingAPI(finalSelection);
    }
  });
}

// Validate entire form and manage submit button
function validateForm(finalCheck = false) {
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const cityDropdown = document.getElementById("cityDropdown");
  const outletDropdown = document.getElementById("outletDropdown");
  const servicesDropdown = document.getElementById("servicesDropdown");
  const dateInput = document.getElementById("dateInput");
  const submitBtn = document.getElementById("submitBtn");

  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isCitySelected = cityDropdown.value !== "";
  const isOutletSelected = outletDropdown.value !== "";
  const isServiceSelected = servicesDropdown.value !== "";
  const isDateValid = validateDate();

  // If it's the final check before submission, show errors
  // if (finalCheck) {
  //   document.getElementById("cityError").textContent = !isCitySelected
  //     ? "Please select a city"
  //     : "";
  //   document.getElementById("outletError").textContent = !isOutletSelected
  //     ? "Please select an outlet"
  //     : "";
  //   document.getElementById("serviceError").textContent = !isServiceSelected
  //     ? "Please select a service"
  //     : "";
  // }

  // Enable submit button only if all validations pass
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isCitySelected &&
    isOutletSelected &&
    isServiceSelected &&
    isDateValid;

  // console.log("isFormValid", isFormValid);
  submitBtn.disabled = !isFormValid;

  return isFormValid;
}

// Initialize page
// window.onload = () => {
//   setDateConstraints();
//   addEventListeners();
//   populateCities();
// };

// setDateConstraints();
// addEventListeners();
// populateCities();

document.addEventListener("DOMContentLoaded", () => {
  setDateConstraints();
  addEventListeners();
  populateCities();
});
