import React, { useState, useEffect } from "react";
// CSS
import "./FormDetails.css";
import { IconContext } from "react-icons";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
// Utils
import { validateEmail } from "../../utils/utils";
// Phone Number Validation
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
// Components
import Error from "../Error/Error";

const FormDetails = ({
  customerInformation,
  progressBar,
  updateCustomerInformation,
  updateShowFormCustomer,
  updateShowFormDetails,
  updateShowFormBankDetails,
  updateShowSuccessFul,
  updateProgressBar,
  updateShowOverlay,
}) => {
  /** STATES */
  // disableInput
  const [disableInput, updateDisableInput] = useState(true);
  const [payment, updatePayment] = useState(false);
  const [salutation, updateSalutation] = useState("");

  const [customAvai, updateCustomAvai] = useState({
    monday_am: false,
    monday_pm: false,
    monday_allday: false,
    tuesday_am: false,
    tuesday_pm: false,
    tuesday_allday: false,
    wednesday_am: false,
    wednesday_pm: false,
    wednesday_allday: false,
    thursday_am: false,
    thursday_pm: false,
    thursday_allday: false,
    friday_am: false,
    friday_pm: false,
    friday_allday: false,
  });
  const [daysOfWeek, updateDaysOfWeek] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });
  const codes = {
    OOW1: "NOC",
    OOW2: "NFPR",
    OOW3: "NSO",
    SPOOW: "NSCP",
  };
  const [customerData, updateCustomerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  console.log(customerInformation);
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    (() => {})();
    if ("payment_ref" in customerInformation) {
      updatePayment(true);
    }
    if ("customerDetails" in customerInformation) {
      updateCustomerData(customerInformation.customerDetails);
    }
    if ("customAvai" in customerInformation) {
      updateCustomAvai(customerInformation.customAvai);
    }
    if ("daysOfWeek" in customerInformation) {
      updateDaysOfWeek(customerInformation.daysOfWeek);
    }
  }, []);

  // Error State
  const [error, updateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });

  // Variables
  const { doornumber, addressline1, addressline2, city, postcode } =
    customerInformation.address;
  // const { tariff_name, exit_fees, monthly_cost } = customerInformation.switching_details.supplier_selected;
  // const { debt_apply, debt_amount } = customerInformation.debt;

  // console.log('Desde');
  // console.log(customerInformation);

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

  // Function that runs every time the user writes to the input
  const handleChange = (e) => {
    // Hidde error
    updateError(false);
    if (e.target.name === "phone") {
      const re = /^[0-9\b]+$/;

      // if value is not blank, then test the regex

      if (e.target.value === "" || re.test(e.target.value)) {
        updateCustomerData({
          ...customerData,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      updateCustomerData({
        ...customerData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Verify button
  const verifyCustomer = async (e) => {
    e.preventDefault();

    // Show Overlay
    updateShowOverlay(true);

    let phone = {
      phone: customerData.phone
        .replace(/[^0-9\.]+/g, "")
        .trim()
        .toString(),
    };

    await fetch(
      "https://zohosdkfunction.azurewebsites.net/api/httptrigger1?method=verify",
      {
        method: "POST",
        body: JSON.stringify(phone),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.json());
        }

        return response.json();
      })
      .then((response) => {
        // console.log(response);
        if (response.status !== 200) {
          // Disable input
          updateDisableInput(false);
          return Promise.reject(response);
        }
        // Update Customer details
        updateCustomerInformation({
          ...customerInformation,
          customerDetails: {
            ...customerData,
            first_name: response.first_name ? response.first_name : "",
            last_name: response.last_name ? response.last_name : "",
            email: response.email ? response.email : "",
            phone: response.phone ? response.phone : "",
          },
          bankDetails: {
            account_holder: "",
            account_number: "",
            sort_code: "",
          },
        });

        // Disable input
        updateDisableInput(true);
      })
      .catch((error) => {
        console.error("Error: ", error);
        // Update Customer details
        updateCustomerInformation({
          ...customerInformation,
          customerDetails: {
            ...customerData,
            first_name: "",
            last_name: "",
            email: "",
            phone: phone.phone,
          },
          bankDetails: {
            account_holder: "",
            account_number: "",
            sort_code: "",
          },
        });
      });

    // Hide Overlay
    updateShowOverlay(false);
  };

  // Edit button
  const editCustomer = (e) => {
    e.preventDefault();

    // Update disable input
    updateDisableInput(false);
  };

  // goToBankDetails
  const goToBankDetails = async (e) => {
    e.preventDefault();

    // Customer Details
    const { first_name, last_name, email, phone } = customerData;
    // Validated details
    const first_name_validated = first_name.replace(/[^a-zA-Z ]/g, "").trim();
    const last_name_validated = last_name.replace(/[^a-zA-Z ]/g, "").trim();
    const email_validated = email.replace(/[^A-Za-z0-9|@.-]/g, "").trim();
    const phone_validated = phone
      .replace(/[^0-9\.]+/g, "")
      .trim()
      .toString();

    // Validate email
    if (!validateEmail(email_validated)) {
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: "Please introduce a valid email address",
      });
      // Show error
      updateError(true);
      return;
    }

    console.log(phone_validated);

    // Validate phone number length
    if (phone_validated.length <= 10 || phone_validated.length > 12) {
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: "Please introduce a valid phone number",
      });
      // Show Error
      updateError(true);
      return;
    }

    // Phone number parsed
    const parsedPhoneNumber = parsePhoneNumber(phone_validated, "GB");
    // Phone number
    const phoneNumber = parsedPhoneNumber.number;

    // Phone number validation
    if (!isValidPhoneNumber(phoneNumber, "GB")) {
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: "Please introduce a valid phone number",
      });
      // Show Error
      updateError(true);
      return;
    }

    // Validation
    if (
      !first_name_validated ||
      !last_name_validated ||
      !email_validated ||
      !phone_validated
    ) {
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: "All fields are required",
      });
      // Show Error
      updateError(true);
      return;
    }

    if (!disableInput) {
      // Show Overlay
      updateShowOverlay(true);

      // Customer Object
      const customerObj = {
        fullname: `${first_name_validated} ${last_name_validated}`,
        email: email_validated,
        phone: phoneNumber,
      };
      updateCustomerData({
        ...customerObj,
      });
      console.log(customerObj);

      // Endpoint
      //   const url =
      // "https://zohocontactcreatefunction.azurewebsites.net/api/HttpTrigger1?method=createContact";

      // Hide Overlay
      updateShowOverlay(false);
    }

    // Update Customer details
    updateCustomerInformation({
      ...customerInformation,
      customerDetails: {
        ...customerData,
      },
    });

    // Update Error
    updateError(false);
    // Hide Form Customer details
    updateShowFormDetails(false);
    // Update Progress Bar
    updateProgressBar({ ...progressBar, step: 6 });
    // Show Bank Details
    updateShowFormBankDetails(true);
  };
  const goNext = () => {
    updateCustomerInformation({
      ...customerInformation,
      customAvai: { ...customAvai },
      customerDetails: { ...customerData },
      daysOfWeek: daysOfWeek,
      salutation: salutation,
    });

    console.log(customerInformation);
    if (customerInformation.boiler.cover_plan) {
      // Update progress bar
      updateProgressBar({ ...progressBar, step: 6 });
      updateShowFormBankDetails(true);
      updateShowFormDetails(false);
    } else {
      // Update progress bar
      updateProgressBar({ ...progressBar, step: 7 });
      updateShowSuccessFul(true);
      updateShowFormDetails(false);
    }
  };
  // goToBoilerInfo
  const goToBoilerInfo = (e) => {
    e.preventDefault();

    // Delete Switching details
    const copy_customer_switching = { ...customerInformation };
    delete copy_customer_switching["customAvai"];
    delete copy_customer_switching["customerDetails"];
    delete copy_customer_switching["daysOfWeek"];
    delete copy_customer_switching["service_price"];
    // Update customer information
    updateCustomerInformation({ ...copy_customer_switching });
    // Update Error
    updateError(false);
    // Hide Customer details
    updateShowFormDetails(false);
    // Update Progress Bar
    updateProgressBar({ ...progressBar, step: 4 });
    // Show compare section
    updateShowFormCustomer(true);
  };

  const handlePay = async () => {
    let servNumber = customerInformation.service_number;
    let newServNumber = parseInt(servNumber[1]) + 1;
    newServNumber = `${servNumber[0]}-${newServNumber}`;
    let refNumber = `${newServNumber}-${codes[servNumber[0]]}`;
    // Customer Address
    const { doornumber, addressline1, addressline2, city, postcode } =
      customerInformation.address;

    let instId = "1421573";
    let cartId = newServNumber;
    let amount = customerInformation.service_price;
    let desc = refNumber;
    let lang = "en";
    let address1 = addressline1;
    let address2 = addressline2;
    let town = city;
    let pc = postcode;
    let country = "UK";
    let email = document.getElementById("emailAddress").value;
    let tel = document.getElementById("phoneNumber").value;

    let url = `https://secure-test.worldpay.com/wcc/purchase?instId=${instId}&cartId=${cartId}&amount=${amount}&currency=GBP&desc=${desc}&testMode=100&lang=${lang}&address1=${address1}&town=${town}&address2=${address2}&postcode=${pc}&country=${country}&email=${email}&tel=${tel}`;
    var win = window.open(url.replace(" ", "%20"), "Secure Payment");
    var timer = setInterval(async () => {
      if (win.closed) {
        clearInterval(timer);
        let paymentStatus = await fetch(
          "https://address-server.boilercompanyuk.com/getTransactStatus",
          {
            method: "POST",
            body: JSON.stringify({
              service_number: newServNumber,
            }),
          }
        )
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              return response.json();
            }
          })
          .then((response) => {
            if (response.status === 200) {
              return response.payment_status;
            } else {
              return false;
            }
          });
        updatePayment(paymentStatus);
        if (paymentStatus) {
          updateCustomerInformation({
            ...customerInformation,
            service_number: newServNumber,
            payment_ref: refNumber,
          });
        }
      }
      console.log(customerInformation);
    }, 1000);

    console.log("success");
  };
  const handleAvailability = (e) => {
    updateCustomAvai({
      ...customAvai,
      [e.target.name]: e.target.checked,
    });
  };
  // UseEffect - conditional disable state
  useEffect(() => {
    if (
      !customerData.first_name ||
      !customerData.last_name ||
      !customerData.email ||
      !customerData.phone
    ) {
      // Update disable input
      updateDisableInput(false);
    }
  }, []);

  return (
    <>
      <section className="form-details-section">
        <div className="form-details-container">
          {/* Content */}
          <div className="form-details-content">
            <div className="form-address">
              <h1>Customer Details</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                dicta libero tenetur commodi id? Eius aperiam illo voluptatem
                fuga nobis nulla vitae obcaecati. Rerum doloribus veniam
                accusamus ad quibusdam sequi!
              </p>
            </div>

            {/* Inputs */}
            <form
              className="form-details-input-container"
              onSubmit={(e) => goToBankDetails(e)}
            >
              <div className="form-details-input-content-custom">
                <div className="form-details-input-element-custom">
                  <label htmlFor="firstName">
                    First Name<span>*</span>
                  </label>
                  <div className="firstName">
                    <select
                      defaultValue={0}
                      onChange={(e) => updateSalutation(e.target.value)}
                      className="form-select-salut"
                      name="salutation"
                      id="select"
                    >
                      {/* <option value="">- Select -</option> */}

                      <option key="0" value="">
                        {" "}
                      </option>
                      <option key="1" value="Mr.">
                        {"Mr."}
                      </option>
                      <option key="2" value="Mrs.">
                        {"Mrs."}
                      </option>
                      <option key="3" value="Ms.">
                        {"Ms."}
                      </option>
                      <option key="4" value="Dr.">
                        {"Dr."}
                      </option>
                      <option key="5" value="Prof.">
                        {"Prof."}
                      </option>
                    </select>
                    <input
                      type="text"
                      id="firstName"
                      name="first_name"
                      onChange={handleChange}
                      value={customerData.first_name || ""}
                      disabled={disableInput}
                    />
                  </div>
                </div>

                <div className="form-details-input-element-custom">
                  <label htmlFor="lastName">
                    Last Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="last_name"
                    onChange={(e) => handleChange(e)}
                    value={customerData.last_name || ""}
                    disabled={disableInput}
                  />
                </div>
              </div>

              <div className="form-details-input-element">
                <label htmlFor="emailAddress">
                  Email address<span>*</span>
                </label>
                <input
                  type="text"
                  id="emailAddress"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={customerData.email || ""}
                  disabled={disableInput}
                  required={true}
                />
              </div>

              <div
                className="form-details-input-content-custom"
                style={error ? { marginBottom: "1.9rem" } : null}
              >
                <div className="form-details-input-element-custom">
                  <label htmlFor="phoneNumber">
                    Phone Number<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phone"
                    onChange={(e) => handleChange(e)}
                    value={customerData.phone || ""}
                    disabled={disableInput}
                    required={true}
                  />
                </div>

                {/* Verify and Edit buttons */}
                <div className="form-details-btn-container-custom">
                  <button
                    className="form-details-btn-custom"
                    type="button"
                    disabled={disableInput}
                    onClick={(e) => verifyCustomer(e)}
                  >
                    Verify
                  </button>

                  <button
                    className="form-details-btn-custom"
                    type="button"
                    onClick={(e) => editCustomer(e)}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div>
                <label>
                  Customer Unavailable<span>*</span>
                </label>
                <div className="day-week">
                  <button
                    data-cy="addrtyped-continue"
                    className={
                      daysOfWeek.monday
                        ? "form-details-btn days day-active"
                        : "form-details-btn days"
                    }
                    onClick={(e) => {
                      e.preventDefault(
                        updateDaysOfWeek({
                          ...daysOfWeek,
                          monday: !daysOfWeek.monday,
                        })
                      );
                    }}
                  >
                    Monday
                  </button>
                  <button
                    data-cy="addrtyped-continue"
                    className={
                      daysOfWeek.tuesday
                        ? "form-details-btn days day-active"
                        : "form-details-btn days"
                    }
                    onClick={(e) => {
                      e.preventDefault(
                        updateDaysOfWeek({
                          ...daysOfWeek,
                          tuesday: !daysOfWeek.tuesday,
                        })
                      );
                    }}
                  >
                    Tuesday
                  </button>
                  <button
                    data-cy="addrtyped-continue"
                    className={
                      daysOfWeek.wednesday
                        ? "form-details-btn days day-active"
                        : "form-details-btn days"
                    }
                    onClick={(e) => {
                      e.preventDefault(
                        updateDaysOfWeek({
                          ...daysOfWeek,
                          wednesday: !daysOfWeek.wednesday,
                        })
                      );
                    }}
                  >
                    Wednesday
                  </button>
                  <button
                    data-cy="addrtyped-continue"
                    className={
                      daysOfWeek.thursday
                        ? "form-details-btn days day-active"
                        : "form-details-btn days"
                    }
                    onClick={(e) => {
                      e.preventDefault(
                        updateDaysOfWeek({
                          ...daysOfWeek,
                          thursday: !daysOfWeek.thursday,
                        })
                      );
                    }}
                  >
                    Thursday
                  </button>
                  <button
                    data-cy="addrtyped-continue"
                    className={
                      daysOfWeek.friday
                        ? "form-details-btn days day-active"
                        : "form-details-btn days"
                    }
                    onClick={(e) => {
                      e.preventDefault(
                        updateDaysOfWeek({
                          ...daysOfWeek,
                          friday: !daysOfWeek.friday,
                        })
                      );
                    }}
                  >
                    Friday
                  </button>
                </div>
              </div>
              {daysOfWeek.monday ||
              daysOfWeek.tuesday ||
              daysOfWeek.wednesday ||
              daysOfWeek.thursday ||
              daysOfWeek.friday ? (
                <div>
                  <div className="daysOfWeek">
                    <div className="head">
                      <label>Day</label>
                      <label>AM</label>
                      <label>PM</label>
                      <label>All Day</label>
                    </div>
                    {daysOfWeek.monday ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <label style={{ width: "60px" }}>Monday</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="monday_am"
                            checked={customAvai.monday_am}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.monday_pm || customAvai.monday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="monday_pm"
                            checked={customAvai.monday_pm}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.monday_am || customAvai.monday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="monday_allday"
                            checked={customAvai.monday_allday}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.monday_am || customAvai.monday_pm
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ) : null}
                    {daysOfWeek.tuesday ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <label style={{ width: "60px" }}>Tuesday</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="tuesday_am"
                            checked={customAvai.tuesday_am}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.tuesday_pm || customAvai.tuesday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="tuesday_pm"
                            checked={customAvai.tuesday_pm}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.tuesday_am || customAvai.tuesday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="tuesday_allday"
                            checked={customAvai.tuesday_allday}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.tuesday_am || customAvai.tuesday_pm
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ) : null}
                    {daysOfWeek.wednesday ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <label style={{ width: "60px" }}>Wednesday</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="wednesday_am"
                            checked={customAvai.wednesday_am}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.wednesday_pm ||
                              customAvai.wednesday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="wednesday_pm"
                            checked={customAvai.wednesday_pm}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.wednesday_am ||
                              customAvai.wednesday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="wednesday_allday"
                            checked={customAvai.wednesday_allday}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.wednesday_am || customAvai.wednesday_pm
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ) : null}
                    {daysOfWeek.thursday ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <label style={{ width: "60px" }}>Thursday</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="thursday_am"
                            checked={customAvai.thursday_am}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.thursday_pm ||
                              customAvai.thursday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="thursday_pm"
                            checked={customAvai.thursday_pm}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.thursday_am ||
                              customAvai.thursday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="thursday_allday"
                            checked={customAvai.thursday_allday}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.thursday_am || customAvai.thursday_pm
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ) : null}
                    {daysOfWeek.friday ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <label style={{ width: "60px" }}>Friday</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="friday_am"
                            checked={customAvai.friday_am}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.friday_pm || customAvai.friday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="friday_pm"
                            checked={customAvai.friday_pm}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.friday_am || customAvai.friday_allday
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            name="friday_allday"
                            checked={customAvai.friday_allday}
                            onChange={(e) => handleAvailability(e)}
                            disabled={
                              customAvai.friday_am || customAvai.friday_pm
                                ? true
                                : false
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
              {error ? (
                // <Error message={ errorEmail ? 'Please introduce a valid email address' : 'All fields are required, please check'} />
                <Error message={errorMessage.message} />
              ) : null}

              {/* Buttons */}
              <div className="form-details-btn-container">
                <button
                  className="form-details-btn btn-back"
                  onClick={(e) => goToBoilerInfo(e)}
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
                  className="form-details-btn btn-next"
                  onClick={(e) => e.preventDefault(handlePay())}
                  disabled={payment}
                >
                  Go to Pay
                  <IconContext.Provider value={{ color: "#FFF", size: "35px" }}>
                    <IoMdArrowDropright className="icon-next" />
                  </IconContext.Provider>
                </button>
                <button
                  data-cy="addrtyped-continue"
                  className="form-details-btn btn-next"
                  onClick={(e) => {
                    e.preventDefault(goNext());
                  }}
                  disabled={!payment}
                >
                  Continue
                  <IconContext.Provider value={{ color: "#FFF", size: "35px" }}>
                    <IoMdArrowDropright className="icon-next" />
                  </IconContext.Provider>
                </button>
              </div>
            </form>
          </div>

          {/* Summary */}
          <div className="form-summary-container">
            <h1>Summary</h1>

            <div className="form-summary-section">
              <h2>Customer Information</h2>

              <div className="form-summary-content">
                <div className="form-summary-element">
                  <p>
                    <span>Door number:</span>
                  </p>
                  <p className="text-end">{doornumber}</p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Address line 1:</span>
                  </p>
                  <p className="text-end">{addressline1}</p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Address line 2:</span>
                  </p>
                  <p className="text-end">{addressline2}</p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>City:</span>
                  </p>
                  <p className="text-end">{city}</p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Postcode:</span>
                  </p>
                  <p className="text-end">{postcode}</p>
                </div>
              </div>
            </div>

            <hr />

            <div className="form-summary-section">
              <h2>About your chosen plan</h2>

              <div className="form-summary-content">
                <div className="form-summary-element">
                  <p>
                    <span>Plan name:</span>
                  </p>
                  <p className="text-end">{""}</p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Annual saving:</span>
                  </p>
                  <p className="text-end">
                    <span>£</span>
                    {148}
                  </p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Early exit fee:</span>
                  </p>
                  <p className="text-end">
                    <span>£</span>
                    {0}
                  </p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Contract length:</span>
                  </p>
                  <p className="text-end">{24} months</p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Monthly direct debit:</span>
                  </p>
                  <p className="text-end">
                    <span>£</span>
                    {0}
                  </p>
                </div>

                <div className="form-summary-element">
                  <p>
                    <span>Existing debt:</span>
                  </p>
                  <p className="text-end">{"N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormDetails;
