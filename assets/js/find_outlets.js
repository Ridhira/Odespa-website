$(document).ready(function () {
  $("#spa-location").select2();

  // cities names and icons
  var citiesList = [
    { city: "Ahmedabad", icon: "./assets/img/city_icons/Ahmedabad.png" },
    { city: "Bangalore", icon: "./assets/img/city_icons/Bangalore.png" },
    { city: "Chennai", icon: "./assets/img/city_icons/Chennai.png" },
    { city: "Cochin", icon: "./assets/img/city_icons/Cochin.png" },
    { city: "Hyderabad", icon: "./assets/img/city_icons/Hyderabad.png" },
    { city: "Jaipur", icon: "./assets/img/city_icons/jaipur.png" },
    { city: "Kodaikanal", icon: "./assets/img/city_icons/kodaikanal.png" },
    { city: "Lucknow", icon: "./assets/img/city_icons/lucknow.png" },
    { city: "Mumbai", icon: "./assets/img/city_icons/mumbai.png" },
    { city: "New Delhi", icon: "./assets/img/city_icons/Delhi.png" },
    {
      city: "Rajamahendravaram",
      icon: "./assets/img/city_icons/Rajamundry.png",
    },
    { city: "Udaipur", icon: "./assets/img/city_icons/udaipur.png" },
  ];

  var getLocationFromURL = location.hash;

  if (getLocationFromURL !== "") {
    if (getLocationFromURL.charAt(0) === "#") {
      locationString = getLocationFromURL.substring(1);
    }
    fetchoutlets(locationString);
  }

  // select location functionality
  $("#spa-location").html(`
    <option value="null" disabled selected>Select a city</option>
    ${citiesList.map(
      (city) => `<option value="${city.city}">${city.city}</option>`
    )}
    `);

  // List of cities with icons
  $("#spa_locations").html(
    citiesList.map(
      (cities) => `
    <div class="col-md-6 col-lg-4 col-xl-3">
		<div class="service-style5">
			<div class="service-icon">
                <img src="${cities.icon}" width="25%" alt="icon">
      </div>
			<div class="service-content">
				<h3 class="service-title h4"><a class="text-inherit">${cities.city}</a></h3>
                <div class="pt-2 pb-3">
                    <button class="select-location fetcheAction" data-location = "${cities.city}">Select</button>
                </div>
			</div>
		</div>
	</div>
    `
    )
  );

  // select city outlets functionality
  $(document).on("click", ".fetcheAction", function () {
    window.scrollTo(0, 275);
    var selectedCustomLocation = $(this).attr("data-location");
    $("#cards-result").html(`
        <div class="find-spa-spinner text-center pt-5">
          <div class="spinner-border" role="status" style="border: .25em solid var(--theme-color); border-right-color: transparent;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>`);
    fetchoutlets(selectedCustomLocation);
  });

  // loading animation
  $("#spa-location").on("change", function () {
    selectedLocation = $(this).val();
    $("#cards-result").html(`<div class="find-spa-spinner text-center pt-5">
        <div class="spinner-border" role="status" style="border: .25em solid var(--theme-color); border-right-color: transparent;">
        <span class="visually-hidden">Loading...</span>
        </div>
        </div>`);
    fetchoutlets(selectedLocation);
  });

  // For Booking bar functionality
  $(document).on("click", ".location-link", function () {
    let location_link_text = $(this).text();
    fetchoutlets(location_link_text);
  });

  // fetching centers.json file data for outlets
  function fetchoutlets(selectedLocation) {
    axios
      .request("assets/js/centers.json")
      .then(function (response) {
        fetchingApiData(response.data, selectedLocation);
      })
      .catch(function (error) {
        $("#cards-result").html(
          `<div class="text-center py-5">
                <h2> ${error.message} <h2>
          </div>`
        );
      });

    function fetchingApiData(data, selectedLocation) {
      let result_array = [];
      const query_string = selectedLocation;
      data.centers.filter((obj) => {
        var active_outlets = [
          "92d41019-c790-4668-9158-a693e531c1a4",
          "28d6d1a3-a375-4b7d-87c6-137528e280af",
          "382c7ba3-5db8-4b1a-b61c-820590a8ccef",

          "16601020-f27c-445c-bc9b-3a7c4e4d82a1",
          "60f37c05-f44a-4dd3-aab7-490c32c61d6e",
          "5a3186b6-7bf9-41ca-8d75-6ab0bb4185c0",
          "3adc38ff-63ee-4974-9c6e-654fa558c85d",
          "883ec38d-bf5e-4be0-b1fd-d2d7eb87ed5b",
          "5bee05b9-b470-4498-a6ad-0accb771ffe0",
          "b6d6e3f0-8621-4717-b79a-370d87f8da89",
          "2b507ff0-b1ef-4fcc-9f6c-37009868b9c0",
          "17fc4324-bb62-4905-9081-636a6ae7fd3e",
          "d722725c-dfad-495f-928a-1fc1edec2674",
          "2afb599f-c6e3-400a-b958-51b1342597fa",
          "8c745587-427d-473b-9237-c87a35fd9521",
          "a56973f6-704b-46f8-8200-f3c44744507e",
          "e31deb8a-3d80-4e45-867a-87422f8c691a",
          "d069efee-094e-4a30-ba19-9458effffdd4",
          "43e4e02f-6e8c-4f71-acce-b42ac7ef89ad",
          "5b99f92a-53dc-43d9-b0eb-8b29c778bb7d",
          "349f181f-5c56-438e-b128-70887eda09be",
          "6f040deb-7bc3-4728-890e-696ad17cdafb",
          "fd0b1849-c640-472e-a3de-b56165358e2b",
          "ea5d4cc7-9466-4135-b66e-02280d2ceb96",
          "e7def4e3-4f13-4022-85bd-fcbaa89df193",
          "db97db51-fa88-40c7-8d14-e0de4a18853c",
          "b0f2a5c7-2029-4d05-b2eb-4e6929844e27",
          "c65ee03d-871e-411e-aa7a-17808159c45b",
          "4a1c048a-ae0f-44e6-aa06-01b33ffc1e37",
          "6c8bcf43-96a5-4351-a422-32d814479635",
          "86a0da45-4cd6-4235-afaf-9e4ab0c3f916",
          "83f0c9f1-f91b-4201-9c43-edfced132d8f",
          "770491a4-a5d0-4e34-a73f-30a62aad1a15",
          "1efbbc03-3cb9-4c15-9073-a13482504d29",
          "59bf0758-8cd4-47f1-8447-3d3b1dd1e40f",
          "400b79c7-b20b-44c7-a784-c757dd8ae6fa",
          "297393d6-ee20-4ebb-b25c-d6066a0b4df3",
          "4be75f7f-20d0-47e9-a58f-0eea181ba3e5",
        ];
        active_outlets.forEach((id) => {
          if (id == obj.id) {
            if (obj.address_info.city.includes(query_string)) {
              result_array.push(obj);
            }
          }
        });
      });

      cards = `
    <div class="my-5 back-to-location-nav">
    
    <button id="serviceLocationsButton" style="background: none; border: 0; font-size: 24px; color: var(--black-color);">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--black-color)" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg> 
    Back to Service locations
    </button>

    </div>
    <div class="row vs-carousel wow fadeInUp justify-content-evenly" data-wow-delay="0.3s" data-slide-show="3" data-lg-slide-show="2" data-md-slide-show="2" id="spa_locations">
    ${
      result_array.length !== 0
        ? result_array
            .map(
              (data) => `<div class="col-xl-4">
					<div class="package-style1">
						<div class="package-top">
							<div class="package-left">
								<h3 class="package-name">${data.display_name}</h3>
							</div>
						</div>
						<div class="package-shape"><img src="assets/img/shape/price-shape-2.png" alt="shape"></div>
						<div class="package-list">
							<p class="footer-info"><i class="far fa-location text-theme me-2"></i>
                            ${
                              data.address_info.address_1 == "undefined"
                                ? "null"
                                : data.address_info.address_1
                            } 
                            ${
                              data.address_info.address_2 == "undefined"
                                ? "null"
                                : data.address_info.address_2
                            } 
                            ${
                              data.address_info.city == "undefined"
                                ? "null"
                                : data.address_info.city
                            } 
                            ${data.address_info.zip_code}.
                </p>
							<div class="recent-post-wrap">
								<p class="footer-info">
                                <a class="text-inherit">
                                <i class="far fa-phone-alt text-theme me-2"></i>
                                ${
                                  data.contact_info.phone_1 == null
                                    ? ""
                                    : `<a style="color: #a3a2a2" href="tel:${data.contact_info.phone_1.number}">${data.contact_info.phone_1.number}</a>`
                                }
                                ${
                                  data.contact_info.phone_1 !== null &&
                                  data.contact_info.phone_2 !== null
                                    ? ","
                                    : ""
                                } 
                                ${
                                  data.contact_info.phone_2 == null
                                    ? ""
                                    : `<a style="color: #a3a2a2" href="tel:${data.contact_info.phone_2.number}">${data.contact_info.phone_2.number}</a>`
                                }
                                ${
                                  data.contact_info.phone_1 == null &&
                                  data.contact_info.phone_2 == null
                                    ? "Contact Not Available"
                                    : ""
                                }
                                </a>
                                <br>
                  </p>
							</div>
						</div>
						<div class="package-btn">
              <a class="vs-btn style3" href="https://odespa.zenoti.com/webstoreNew/services/${
                data.id
              }/?ref=lbb">Select</a>
            </div>
					</div>
				</div>`
            )
            .join("")
        : `<div class="py-4 text-center display-5">No Active outlets found in ${selectedLocation}</div>`
    }
    </div>
    `;
      $("#cards-result").html(cards);
    }
  }

  // Back to service locations functionality
  $(document).on("click", "#serviceLocationsButton", function () {
    window.location.href = "find-spa.html";
    // $(".back-to-location-nav").remove();
    // $("#spa_locations").html(
    //     citiesList.map(
    //       (cities) => `
    //   <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
    //       <div class="service-style5">
    //           <div class="service-icon">
    //               <img src="${cities.icon}" width="25%" alt="icon">
    //           </div>
    //           <div class="service-content">
    //               <h3 class="service-title h4"><a class="text-inherit">${cities.city}</a></h3>
    //               <div class="pt-2 pb-3">
    //                   <button class="select-location fetcheAction" data-location = "${cities.city}">Select</button>
    //               </div>
    //           </div>
    //       </div>
    //   </div>
    //   `
    //     )
    //   ).addClass("my-5");
  });
});
