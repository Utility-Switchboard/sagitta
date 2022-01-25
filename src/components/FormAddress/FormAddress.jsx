import React, { useState, useEffect } from "react";
// Styles
import "./FormAddress.css";

// Swal
import swal from "sweetalert";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { ImProfile } from "react-icons/im";

// Hooks
import useAddress from "../useAddress/useAddress";

// Components
import FormScript from "../FormScript/FormScript";
import Error from "../Error/Error";
import FormAssistant from "../FormAssistant/FormAssistant";

function FormAddress({
  postcodeValue,
  progressBar,
  showScript,
  customerInformation,
  updateCustomerInformation,
  updateCustomerAddress,
  updateShowFormPostCode,
  updateShowFormAddres,
  updateShowFormFuelType,
  updateShowOverlay,
  updateProgressBar,
}) {
  /** STATES */
  // Customer Address JSON
  const [dataAddress, updateDataAddress] = useState({
    doornumber: "",
    addressline1: "",
    addressline2: "",
    city: "",
    postcode: "",
  });
  console.log(customerInformation);
  // Customer Address List
  const [addressList, updateAddressList] = useState([]);

  // Hook useAddress
  const [address, SelectAddress, updateAddress] = useAddress(
    "", //Label
    "", //Initial State
    addressList //Array(response)
  );

  // Show Address type section
  const [showTypeAddress, updateShowTypeAddres] = useState(true);

  // Error State
  const [error, updateError] = useState(false);

  // Button focus animation
  const [focusAnimation, setFocusAnimation] = useState(false);

  /** FUNCTIONS */

  // Error smooth scroll
  useEffect(() => {
    if (error) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      };

      scroll_to();
    }
  }, [error]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // useEffect to fetch the data from API
  useEffect(() => {
    // const address_api = process.env.REACT_APP_ADDRESS_API;

    // Fetching Data
    const fetchAPI = async () => {
      // const url = `https://ws.postcoder.com/pcw/${address_api}/address/uk/${postcodeValue.replace(/ /g, '').toLowerCase()}`;
      const key = process.env.REACT_APP_ADDRESS_API;
      const url = `http://51.140.201.189:6001/getAddress`;
      const response_postcode = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ code: postcodeValue }),
      })
        .then(function (response) {
          if (response.status === 200) {
            return response.json();
          } else {
            swal({
              title: "Address not found",
              text: "SomEthing went wrong, pleas try again.",
              icon: "warning",
              button: "Ok",
            });
            return;
          }
        })
        .then(function (response) {
          if (response.status === 200) {
            return response;
          } else {
            swal({
              title: "Sorry!",
              text: response.message,
              icon: "warning",
              button: "Ok",
            }).then(() => goToPostcode(1));
            return;
          }
        })
        .catch(function (error) {
          console.error(`Catch an error fetching to postcoder ${error}`);

          swal({
            title: "Address not found",
            text: "Please enter the address manually.",
            icon: "warning",
            button: "Ok",
          });
          return;
        });

      if (response_postcode !== undefined) {
        const data = response_postcode.message.addresses;

        // Adding an ID
        data.forEach((item, i) => {
          item.id = i + 1;
        });

        if (addressList === []) {
          return;
        } else {
          updateAddressList(data);
        }
      } else {
        return;
      }
    };
    // Execute Fetch API
    fetchAPI();
  }, []);

  // Address Data
  if (address !== "") {
    // Selected Value
    const selectedValue = addressList[address - 1];

    // Separated Values
    var doornumberValue = selectedValue.formatted_address[0].replace(
      /[^0-9.]/g,
      ""
    );
    var addressline1Value = selectedValue.formatted_address.toString();
    var addressline2Value = "";
    var cityValue = selectedValue.town_or_city;

    if (doornumberValue === undefined || doornumberValue === "") {
      doornumberValue = "N/A";
    } else {
      doornumberValue = selectedValue.formatted_address[0].replace(
        /[^0-9.]/g,
        ""
      );
    }

    if (addressline1Value === undefined || addressline1Value === "") {
      addressline1Value = "N/A";
    } else {
      addressline1Value = selectedValue.formatted_address.toString();
    }

    if (addressline2Value === undefined || addressline2Value === "") {
      addressline2Value = "N/A";
    } else {
      addressline2Value = "";
    }

    if (cityValue === undefined || cityValue === "") {
      cityValue = "N/A";
    } else {
      cityValue = selectedValue.town_or_city;
    }
  }

  const doornumber = doornumberValue;
  const addressline1 = addressline1Value;
  const addressline2 = addressline2Value;
  const city = cityValue;
  const postcode = postcodeValue;

  // useEffect to add the data to the state
  useEffect(() => {
    updateDataAddress({
      ...dataAddress,
      doornumber: doornumber,
      addressline1: addressline1,
      addressline2: addressline2,
      city: city,
      postcode: postcode,
    });
    updateError(false);
  }, [address]);

  // Function that runs every time the user writes to the input
  const handleChange = (e) => {
    updateDataAddress({
      ...dataAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTypeAddress = () => {
    const door_typed = document.getElementById("door-number").value;
    const addres_line1_typed = document.getElementById("line1").value;
    const city_typed = document.getElementById("city").value;

    // Validation for Typeaddress
    if (door_typed !== "" && addres_line1_typed !== "" && city_typed !== "") {
      // Hidde message
      updateError(false);
    }
  };

  // Send Add address to CustomerData
  const sendAddress = async (dataAddress) => {
    const door_typed = document.getElementById("door-number").value;
    const addres_line1_typed = document.getElementById("line1").value;
    const city_typed = document.getElementById("city").value;
    console.log(dataAddress);
    // Validation for type address section
    if (
      door_typed === "" ||
      door_typed === undefined ||
      addres_line1_typed === "" ||
      addres_line1_typed === undefined ||
      city_typed === "" ||
      city_typed === undefined
    ) {
      updateError(true);
      return;
    } else {
      updateError(false);
    }

    // Show Overlay
    updateShowOverlay(true);
    // Validation successful
    updateError(false);
    // Update data
    updateCustomerAddress({
      ...dataAddress,
    });
    updateCustomerInformation({
      ...customerInformation,
      address: { ...dataAddress },
    });
    // Update progress bar
    updateProgressBar({ ...progressBar, step: 2 });
    // Hidde Form Address
    updateShowFormAddres(false);
    // Show Form Fuel type
    updateShowFormFuelType(true);
    // Hidde Overlay
    updateShowOverlay(false);
    console.log("Data was sent successfully - No user found");
    console.log("Create a new customer in firebase");

    // End process
    return;
  };

  // Go back to postcode
  const goToPostcode = (e) => {
    if (e !== 1) {
      e.preventDefault();
    }
    // Update Customer Information
    let newCustomerInformation = { ...customerInformation };
    delete newCustomerInformation["address"];
    updateCustomerInformation({
      ...newCustomerInformation,
    });
    // Hidde Form Address
    updateShowFormAddres(false);
    // Show Postcode
    updateShowFormPostCode(true);
    // Update progress bar
    updateProgressBar({ ...progressBar, step: 0 });
  };

  // Address is not listed
  const type_address = (e) => {
    e.preventDefault();
    // Update data address
    updateDataAddress({
      ...dataAddress,
      doornumber: "",
      addressline1: "",
      addressline2: "",
      city: "",
    });
    // Cleaning states
    updateAddress("");
    updateShowTypeAddres(false);
    updateError(false);

    // Reset form
    let reset_doornumber = document.getElementById("door-number");
    let reset_line1 = document.getElementById("line1");
    let reset_line2 = document.getElementById("line2");
    let reset_city = document.getElementById("city");
    if (
      reset_doornumber !== null &&
      reset_line1 !== null &&
      reset_line2 !== null &&
      reset_city !== null
    ) {
      reset_doornumber.value = "";
      reset_line1.value = "";
      reset_line2.value = "";
      reset_city.value = "";
    }
  };

  // HandleChangeSelect
  const handleChangeSelect = (e) => {
    e.preventDefault();
    // Update states
    updateShowTypeAddres(true);
    updateDataAddress({
      ...dataAddress,
      doornumber: "",
      addressline1: "",
      addressline2: "",
      city: "",
    });
  };

  return (
    <>
      {showTypeAddress ? (
        address === "" ? (
          <section className="form-address-section">
            <div className="form-address-container">
              <div className="form-address-content">
                <div className="form-address">
                  <h1>Select your addres from the below</h1>
                  <p>
                    Having the correct address is key to ensuring we select the
                    correct MPAN / MRPN for the customer's address. Id the
                    customer's address is not present in the list below, we must
                    enter it manually and request the customers MPAN / MPRN to
                    enable successful switch.
                  </p>
                </div>

                {/* Address */}
                <div>
                  <SelectAddress />
                </div>

                <div className="form-address-manually-btn">
                  <button data-cy="addr-empty" onClick={(e) => type_address(e)}>
                    My address isn't listed
                  </button>
                </div>

                {/* Error */}
                {error === true ? (
                  <Error message={"Please enter an address"} />
                ) : null}

                {/* Buttons */}
                <div className="form-address-btn-container">
                  <button
                    className="form-address-btn btn-back"
                    onClick={goToPostcode}
                  >
                    <IconContext.Provider
                      value={{ color: "#D338AE", size: "35px" }}
                    >
                      <IoMdArrowDropleft className="icon-back" />
                    </IconContext.Provider>
                    Go back
                  </button>

                  <button
                    data-cy="addr-noselected"
                    className="form-address-btn btn-next"
                    onClick={() => (address === "" ? updateError(true) : null)}
                  >
                    Continue
                    <IconContext.Provider
                      value={{ color: "#FFF", size: "35px" }}
                    >
                      <IoMdArrowDropright className="icon-next" />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>

              {showScript ? (
                <div className="helper-address">
                  <div className="script-address">
                    <FormScript step={2} />
                  </div>

                  <div className="assistant-address-custom">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              ) : (
                <div style={{ width: "100%" }}>
                  <div className="assistant-address">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="form-address-section">
            <div className="form-address-container">
              <div className="form-address-content">
                <div className="form-address">
                  <h1>Select your addres from the below</h1>
                  <p>
                    Having the correct address is key to ensuring we select the
                    correct MPAN / MRPN for the customer's address. Id the
                    customer's address is not present in the list below, we must
                    enter it manually and request the customers MPAN / MPRN to
                    enable successful switch.
                  </p>
                </div>

                {/* Address */}
                <div>
                  <SelectAddress />
                </div>

                <div className="form-address-manually-btn">
                  <button
                    onClick={(e) => type_address(e)}
                    className={
                      focusAnimation
                        ? "animate__animated animate__headShake"
                        : ""
                    }
                  >
                    My address isn't listed
                  </button>
                </div>

                {/* Inputs */}
                <form className="form-address-input-container">
                  <div className="form-address-input-content">
                    <h2>Address Information</h2>

                    {/* Error */}
                    {error === true ? (
                      <Error message={"Please enter an address"} />
                    ) : null}

                    <div className="form-address-input">
                      <label>Door number</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="door-number"
                          name="doornumber"
                          type="text"
                          value={dataAddress.doornumber || ""}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div
                      className="form-address-input"
                      style={{ position: "relative" }}
                    >
                      <label>Address Line 1</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="line1"
                          name="addressline1"
                          type="text"
                          value={dataAddress.addressline1 || ""}
                          disabled={true}
                        />
                      </div>
                      <div className="form-address-tooltip">
                        {dataAddress.addressline1}
                      </div>
                    </div>

                    <div className="form-address-input">
                      <label>Address line 2 (optional)</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="line2"
                          name="addressline2"
                          type="text"
                          value={dataAddress.addressline2 || ""}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-address-input">
                      <label>City</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={dataAddress.city || ""}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-address-input">
                      <label>Postcode</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="postcode"
                          name="postcode"
                          type="text"
                          value={dataAddress.postcode || ""}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Buttons */}
                <div className="form-address-btn-container">
                  <button
                    className="form-address-btn btn-back"
                    onClick={goToPostcode}
                  >
                    <IconContext.Provider
                      value={{ color: "#D338AE", size: "35px" }}
                    >
                      <IoMdArrowDropleft className="icon-back" />
                    </IconContext.Provider>
                    Go back
                  </button>

                  <button
                    className="form-address-btn btn-next"
                    onClick={(e) => e.preventDefault(sendAddress(dataAddress))}
                  >
                    Continue
                    <IconContext.Provider
                      value={{ color: "#FFF", size: "35px" }}
                    >
                      <IoMdArrowDropright className="icon-next" />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>

              {showScript ? (
                <div className="helper-address">
                  <div className="script-address">
                    <FormScript step={2} />
                  </div>

                  <div className="assistant-address-custom">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              ) : (
                <div style={{ width: "100%" }}>
                  <div className="assistant-address">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )
      ) : (
        <section className="form-address-section">
          <div className="form-address-container">
            <div className="form-address-content">
              <div className="form-address">
                <h1>Select your addres from the below</h1>
                <p>
                  Having the correct address is key to ensuring we select the
                  correct MPAN / MRPN for the customer's address. Id the
                  customer's address is not present in the list below, we must
                  enter it manually and request the customers MPAN / MPRN to
                  enable successful switch.
                </p>
              </div>

              {/* Address */}
              <div onChange={(e) => handleChangeSelect(e)}>
                <SelectAddress />
              </div>

              <div className="form-address-manually-btn">
                <button onClick={(e) => type_address(e)}>
                  My address isn't listed
                </button>
              </div>

              {/* Inputs */}
              <form
                className="form-address-input-container"
                onChange={() => handleChangeTypeAddress()}
              >
                <div className="form-address-input-content">
                  <h2>Type address manually</h2>

                  {/* Error */}
                  {error === true ? (
                    <Error message={"Please enter an address"} />
                  ) : null}

                  <div className="form-address-input">
                    <label>Door number</label>
                    <input
                      id="door-number"
                      type="text"
                      value={dataAddress.doornumber || ""}
                      onChange={(e) => handleChange(e)}
                      name="doornumber"
                      data-cy="door-input"
                    />
                  </div>

                  <div
                    className="form-address-input"
                    style={{ position: "relative" }}
                  >
                    <label>Address Line 1</label>
                    <input
                      id="line1"
                      type="text"
                      value={dataAddress.addressline1 || ""}
                      onChange={(e) => handleChange(e)}
                      name="addressline1"
                      data-cy="addr1-input"
                    />
                  </div>

                  <div className="form-address-input">
                    <label>Address line 2 (optional)</label>
                    <input
                      id="line2"
                      type="text"
                      value={dataAddress.addressline2 || ""}
                      onChange={(e) => handleChange(e)}
                      name="addressline2"
                      data-cy="addr2-input"
                    />
                  </div>

                  <div className="form-address-input">
                    <label>City</label>
                    <input
                      id="city"
                      type="text"
                      value={dataAddress.city || ""}
                      onChange={(e) => handleChange(e)}
                      name="city"
                      data-cy="city-input"
                    />
                  </div>

                  <div className="form-address-input">
                    <label>Postcode</label>
                    <input
                      id="postcode"
                      type="text"
                      value={postcodeValue}
                      onChange={(e) => handleChange(e)}
                      name="postcode"
                      disabled
                    />
                  </div>
                </div>
              </form>

              {/* Buttons */}
              <div className="form-address-btn-container">
                <button
                  className="form-address-btn btn-back"
                  onClick={goToPostcode}
                >
                  <IconContext.Provider
                    value={{ color: "#D338AE", size: "35px" }}
                  >
                    <IoMdArrowDropleft className="icon-back" />
                  </IconContext.Provider>
                  Go back
                </button>

                <button
                  data-cy="addrtyped-continue"
                  className="form-address-btn btn-next"
                  onClick={(e) => e.preventDefault(sendAddress(dataAddress))}
                >
                  Continue
                  <IconContext.Provider value={{ color: "#FFF", size: "35px" }}>
                    <IoMdArrowDropright className="icon-next" />
                  </IconContext.Provider>
                </button>
              </div>
            </div>

            {showScript ? (
              <div className="helper-address">
                <div className="script-address">
                  <FormScript step={2} />
                </div>

                <div className="assistant-address-custom">
                  <FormAssistant tips={1} />
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <div className="assistant-address">
                  <FormAssistant tips={1} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default FormAddress;
