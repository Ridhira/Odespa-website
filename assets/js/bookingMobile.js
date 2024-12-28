// Global variable to store final selection
let finalSelection2 = {
  name: "",
  phone: "",
  city: "",
  outlet: "",
  service: "",
  date: "",
};

// Data structure for cities, outlets, and services
const locationData2 = {
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
function validateName2() {
  const nameInput = document.getElementById("nameInput2");
  if (nameInput.value.trim().length < 2) {
    return false;
  }
  return true;
}

function validatePhone2() {
  const phoneInput = document.getElementById("phoneInput2");

  const cleanedPhone = phoneInput.value.replace(/\D/g, "");

  if (cleanedPhone.length !== 10) {
    return false;
  }

  return true;
}

function validateDate2() {
  const dateInput = document.getElementById("dateInput2");

  const selectedDate = new Date(dateInput.value);
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);

  if (JSON.stringify(selectedDate) === "null") {
    return false;
  }

  return true;
}

function setDateConstraints2() {
  const dateInput = document.getElementById("dateInput2");

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
function populateCities2() {
  const cityDropdown = document.getElementById("cityDropdown2");
  Object.keys(locationData2).forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityDropdown.appendChild(option);
  });
}

// Update outlets based on selected city
function updateOutlets2() {
  const cityDropdown = document.getElementById("cityDropdown2");
  const outletDropdown = document.getElementById("outletDropdown2");
  const servicesDropdown = document.getElementById("servicesDropdown2");

  // Reset outlet and services dropdowns
  outletDropdown.innerHTML = '<option value="">Choose an Outlet</option>';
  servicesDropdown.innerHTML = '<option value="">Choose a Service</option>';

  const selectedCity = cityDropdown.value;

  if (selectedCity) {
    // Enable outlet dropdown
    outletDropdown.disabled = false;

    // Populate outlets for selected city
    Object.keys(locationData2[selectedCity]).forEach((outlet) => {
      const option = document.createElement("option");
      option.value = outlet;
      option.textContent = outlet;
      outletDropdown.appendChild(option);
    });

    // Update global selection
    finalSelection2.city = selectedCity;

    // Validate and check form completeness
    validateForm2();
  } else {
    // Disable dropdowns if no city is selected
    outletDropdown.disabled = true;
    servicesDropdown.disabled = true;
  }
}

// Update services based on selected outlet
function updateServices2() {
  const cityDropdown = document.getElementById("cityDropdown2");
  const outletDropdown = document.getElementById("outletDropdown2");
  const servicesDropdown = document.getElementById("servicesDropdown2");

  // Reset services dropdown
  servicesDropdown.innerHTML = '<option value="">Choose a Service</option>';

  const selectedCity = cityDropdown.value;
  const selectedOutlet = outletDropdown.value;

  if (selectedCity && selectedOutlet) {
    // Enable services dropdown
    servicesDropdown.disabled = false;

    // Populate services for selected outlet
    locationData2[selectedCity][selectedOutlet].services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service;
      option.textContent = service;
      servicesDropdown.appendChild(option);
    });

    // Update global selection
    finalSelection2.outlet = selectedOutlet;

    // Validate and check form completeness
    validateForm2();
  } else {
    // Disable services dropdown
    servicesDropdown.disabled = true;
  }
}

// Add event listeners for validation
function addEventListeners2() {
  const nameInput = document.getElementById("nameInput2");
  const phoneInput = document.getElementById("phoneInput2");
  const cityDropdown = document.getElementById("cityDropdown2");
  const outletDropdown = document.getElementById("outletDropdown2");
  const servicesDropdown = document.getElementById("servicesDropdown2");
  const dateInput = document.getElementById("dateInput2");
  const form = document.getElementById("serviceBookingForm2");

  // Input event listeners for validation
  nameInput.addEventListener("input", () => {
    validateName2();
    validateForm2();
  });

  phoneInput.addEventListener("input", () => {
    validatePhone2();
    validateForm2();
  });

  servicesDropdown.addEventListener("change", () => {
    const selectedService = servicesDropdown.value;
    finalSelection2.service = selectedService;
    validateForm2();
  });

  dateInput.addEventListener("change", () => {
    validateDate2();
    if (validateDate2()) {
      finalSelection2.date = dateInput.value;
    }
    validateForm2();
  });
}

// Validate entire form and manage submit button
function validateForm2(finalCheck = false) {
  const nameInput = document.getElementById("nameInput2");
  const phoneInput = document.getElementById("phoneInput2");
  const cityDropdown = document.getElementById("cityDropdown2");
  const outletDropdown = document.getElementById("outletDropdown2");
  const servicesDropdown = document.getElementById("servicesDropdown2");
  const dateInput = document.getElementById("dateInput2");

  const isNameValid = validateName2();
  const isPhoneValid = validatePhone2();
  const isCitySelected = cityDropdown.value !== "";
  const isOutletSelected = outletDropdown.value !== "";
  const isServiceSelected = servicesDropdown.value !== "";
  const isDateValid = validateDate2();

  // Enable submit button only if all validations pass
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isCitySelected &&
    isOutletSelected &&
    isServiceSelected &&
    isDateValid;

  console.log("isFormValid", isFormValid);

  return isFormValid;
}

// Initialize page
window.onload = () => {
  populateCities2();
  setDateConstraints2();
  addEventListeners2();
};

const btnClick = () => {
  console.log("btnClick");
  if (validateForm2()) {
    document.getElementById("errorMessage").style.display = "none";
    const nameInput = document.getElementById("nameInput2");
    const phoneValue = document.getElementById("phoneInput2");
    finalSelection2.name = nameInput.value.trim();
    finalSelection2.phone = phoneValue.value;
    console.log("finalSelection2", finalSelection2);
    // Here you would typically call your API
    // For example:
    // callBookingAPI(finalSelection);
  } else {
    console.log("invalid Values");
    document.getElementById("errorMessage").style.display = "block";
  }
};
