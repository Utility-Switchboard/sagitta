import React, { useState, useEffect, lazy } from "react";
// CSS
import "./FormBankDetailsCP.css";
import { IconContext } from "react-icons";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
// Components
import Error from "../Error/Error";
// Images
import BankDetails from "../../assets/img/bank_details.svg";

const FormBankDetailsCP = ({
  customerInformation,
  progressBar,
  updateCustomerInformation,
  updateShowFormDetails,
  updateShowFormBankDetails,
  updateShowCP,
  updateProgressBar,
  updateShowSuccessFul,
  updateShowOverlay,
}) => {
  /** STATES */
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  console.log(`customInfor Bank: ${JSON.stringify(customerInformation)}`);
  // Error State
  const [error, updateError] = useState(false);
  const [bankDetails, updateBankDetails] = useState({
    account_holder: "",
    account_number: "",
    sort_code: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });
  // let accountDetails = false;
  // accountDetails =
  // Variables
  const { doornumber, addressline1, addressline2, city, postcode } =
    customerInformation.address;
  const { first_name, last_name, email, phone } =
    customerInformation.customerDetails;

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
    console.log(e.target.name);
    if (e.target.name === "account_holder") {
      updateBankDetails({
        ...bankDetails,
        [e.target.name]: e.target.value
          .replace(/[^a-zA-Z ]/g, "")
          .toUpperCase(),
      });
    } else {
      updateBankDetails({
        ...bankDetails,
        [e.target.name]: e.target.value.replace(/[^0-9.]/g, ""),
      });
    }
  };
  // Send Bank Details
  const sendBankDetails = (e) => {
    console.log(customerInformation);
    e.preventDefault();
    updateCustomerInformation({
      ...customerInformation,
      bankDetails: bankDetails,
    });
    console.log("submit");
    updateProgressBar({ ...progressBar, step: 7 });
    updateShowSuccessFul(true);
    // Hide Bank details
    updateShowFormBankDetails(false);
  };
  // goToCustomerDetails
  const goToCustomerDetails = (e) => {
    e.preventDefault();

    // Delete Switching details
    const copy_customer_switching = { ...customerInformation };
    delete copy_customer_switching["bankDetails"];
    // Update customer information
    updateCustomerInformation({ ...copy_customer_switching });
    // Update Error
    updateError(false);
    // Hide Bank details
    updateShowFormBankDetails(false);
    // Show Customer Details
    updateShowFormDetails(true);
    // Update Progress Bar
    updateProgressBar({ ...progressBar, step: 5 });

    console.log("goToCustomerDetails");
  };

  return (
    <>
      <section className="form-bank-details-section">
        <div className="form-bank-details-container">
          {/* Content */}
          <div className="form-bank-details-content">
            <div className="form-bank-details">
              <h1>Bank Details</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                dicta libero tenetur commodi id? Eius aperiam illo voluptatem
                fuga nobis nulla vitae obcaecati. Rerum doloribus veniam
                accusamus ad quibusdam sequi!
              </p>
            </div>

            {/* Inputs */}
            <form
              className="form-bank-details-input-container"
              onSubmit={(e) => sendBankDetails(e)}
            >
              <div className="form-bank-details-split-content">
                <div
                  className="form-bank-details-input-content"
                  style={error ? { marginBottom: "1rem" } : null}
                >
                  {/* Bank Details */}
                  <div className="form-bank-details-input-element">
                    <label htmlFor="acch">
                      Card holder<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="acch"
                      name="account_holder"
                      onChange={(e) => handleChange(e)}
                      required
                      maxLength="18"
                      placeholder="Introduce account holder"
                      value={bankDetails.account_holder || ""}
                    />
                    <p>18 characters max</p>
                  </div>
                  <div className="form-bank-details-input-element">
                    <label htmlFor="accn">
                      Account number<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="accn"
                      name="account_number"
                      onChange={(e) => handleChange(e)}
                      required
                      maxLength="8"
                      placeholder="12345678"
                      value={bankDetails.account_number || ""}
                    />
                  </div>

                  <div
                    className="form-bank-details-input-element"
                    style={error ? { marginBottom: "0" } : null}
                  >
                    <label htmlFor="sc">
                      Sort code<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="sc"
                      name="sort_code"
                      onChange={(e) => handleChange(e)}
                      required
                      maxLength="6"
                      placeholder="123456"
                      value={bankDetails.sort_code || ""}
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="form-bank-details-img-content">
                  <img src={BankDetails} alt="Bank Details" />
                </div>
              </div>

              {error ? (
                // <Error message={ errorEmail ? 'Please introduce a valid email address' : 'All fields are required, please check'} />
                <Error message={errorMessage.message} />
              ) : null}

              {/* Buttons */}
              <div className="form-bank-details-btn-container">
                <button
                  className="form-bank-details-btn btn-back"
                  onClick={(e) => goToCustomerDetails(e)}
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
                  className="form-bank-details-btn btn-next"
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
          <div className="form-summary-bank-container">
            <h1>Summary</h1>

            <div className="form-summary-bank-section">
              <h2>Customer Information</h2>

              <div className="form-summary-bank-content">
                <div className="form-summary-bank-element">
                  <p>
                    <span>Full name:</span>
                  </p>
                  <p className="text-end">{`${first_name} ${last_name}`}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Email:</span>
                  </p>
                  <p className="text-end">{email}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Phone:</span>
                  </p>
                  <p className="text-end">{phone}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Door number:</span>
                  </p>
                  <p className="text-end">{doornumber}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Address line 1:</span>
                  </p>
                  <p className="text-end">{addressline1}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Address line 2:</span>
                  </p>
                  <p className="text-end">{addressline2}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>City:</span>
                  </p>
                  <p className="text-end">{city}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Postcode:</span>
                  </p>
                  <p className="text-end">{postcode}</p>
                </div>
              </div>
            </div>

            <hr />

            <div className="form-summary-bank-section">
              <h2>About your chosen plan</h2>

              <div className="form-summary-bank-content">
                <div className="form-summary-bank-element">
                  <p>
                    <span>Plan name:</span>
                  </p>
                  <p className="text-end">{0}</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Annual saving:</span>
                  </p>
                  <p className="text-end">
                    <span>£</span>
                    {148}
                  </p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Early exit fee:</span>
                  </p>
                  <p className="text-end">
                    <span>£</span>
                    {100}
                  </p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Contract lenght:</span>
                  </p>
                  <p className="text-end">{24} months</p>
                </div>

                <div className="form-summary-bank-element">
                  <p>
                    <span>Monthly direct debit:</span>
                  </p>
                  <p className="text-end">
                    <span>£</span>
                    {"31.76"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormBankDetailsCP;
