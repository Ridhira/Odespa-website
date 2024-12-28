var spaOutletDetails = [
  {
    Hyderabad: [
      {
        cityName: "Hyderabad",
        location: "Novotel",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
      {
        cityName: "Hyderabad",
        location: "Vivanta",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
      {
        cityName: "Hyderabad",
        location: "Gvk One",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
    ],
  },
  {
    Chennai: [
      {
        cityName: "Chennai",
        location: "ChennaiOut let - 1",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
      {
        cityName: "Chennai",
        location: "ChennaiOut let - 2",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
      {
        cityName: "Chennai",
        location: "ChennaiOut let - 3",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
    ],
  },
  {
    Bangalore: [
      {
        cityName: "Bangalore",
        location: "Bnglr Out let - 1",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
      {
        cityName: "Bangalore",
        location: "Bnglr Out let - 2",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
      {
        cityName: "Bangalore",
        location: "Bnglr Out let - 3",
        address:
          "3rd Floor, Gvk One Mall, Rd Number 1, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "09959555443",
        redirect_link: "#",
      },
    ],
  },
];

$(document).ready(function () {
  $(".spa-locations").select2();

  let selectedLocation;
  var cards;
  var resultObject;
  var locatedSpaDetails;

  $(".spa-locations").on("change", function () {
    selectedLocation = $(this).val();
    testString = selectedLocation.trim();
    switch (true) {
      case selectedLocation == "Hyderabad":
        resultObject = spaOutletDetails.filter((val) => val.Hyderabad);
        break;
      case selectedLocation == "Chennai":
        resultObject = spaOutletDetails.filter((val) => val.Chennai);
        break;
      case selectedLocation == "Bangalore":
        resultObject = spaOutletDetails.filter((val) => val.Bangalore);
        break;
      default:
        console.log("Something went wrong!");
    }
    selectedLocationOutlets = resultObject;
    for (let location in selectedLocationOutlets) {
      for (let details in selectedLocationOutlets[location]) {
        locatedSpaDetails = selectedLocationOutlets[location][details].map(
          (obj) => ({
            city: obj.cityName,
            location: obj.location,
            address: obj.address,
            phone: obj.phone,
          })
        );
      }
    }
    getOutlets(locatedSpaDetails);
  });

  function getOutlets(locatedSpaDetails) {
    cards = `<div class="container">
<div class="row vs-carousel wow fadeInUp justify-content-between" data-wow-delay="0.3s" data-slide-show="3" data-lg-slide-show="2" data-md-slide-show="2">
${locatedSpaDetails
  .map(
    (outletDtls) => `<div class="col-xl-4 my-3">
					<div class="package-style1">
						<div class="package-top">
							<div class="package-left">
								<h3 class="package-name">${outletDtls.city} - ${outletDtls.location}</h3>
							</div>
						</div>
						<div class="package-shape"><img src="assets/img/shape/price-shape-2.png" alt="shape"></div>
						<div class="package-list">
							<p class="footer-info"><i class="far fa-location text-theme me-2"></i>${outletDtls.address}</p>
							<div class="recent-post-wrap">
								<p class="footer-info">
                                <a href="${outletDtls.phone}" class="text-inherit">
                                <i class="far fa-phone-alt text-theme me-2"></i>${outletDtls.phone}
                                </a>
                                <br>
                                </p>
							</div>
						</div>
						<div class="package-btn">
                            <a href="#" class="vs-btn style3">Select</a>
                        </div>
					</div>
				</div>`
  )
  .join("")}</div></div>`;
    $("#cards-result").html(cards);
  }
});
