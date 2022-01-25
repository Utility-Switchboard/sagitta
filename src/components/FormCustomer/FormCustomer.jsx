import React, { useState, useEffect } from "react";
// Styles
import "./FormCustomer.css";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

// Components
import FormAssistant from "../FormAssistant/FormAssistant";
import FormScript from "../FormScript/FormScript";
import Error from "../Error/Error";

function FormCustomer({
  customerInformation,
  showScript,
  progressBar,
  updateShowOverlay,
  updateCustomerInformation,
  updateShowFormSelectService,
  updateProgressBar,
  updateShowFormDetails,
  updateShowFormCustomer,
}) {
  /* STATES */
  // Customer JSON
  const [dataCustomer, updateDataCustomer] = useState({
    make: "",
    model: "",
    marketing: false,
    select: "",
    bage: 0,
    boiler_issue: false,
    cover_plan: false,
    boiler_control_issue: false,
    unknown_issue: false,
    fault_code: false,
  });
  // Error State
  const [error, updateError] = useState(false);
  console.log(customerInformation);
  // Button focus animation
  const [focusAnimation, setFocusAnimation] = useState(false);
  let service = customerInformation.servOption.service;
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

  /**-- Functions --*/

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Go back
  const goBack = async (e) => {
    e.preventDefault();

    // Update error
    updateError(false);

    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 4,
    });
    // Update Customer Information
    let newCustomerInformation = { ...customerInformation };
    delete newCustomerInformation["boiler"];
    delete newCustomerInformation["service_number"];
    updateCustomerInformation({
      ...newCustomerInformation,
    });
    // Show FormAddress
    updateShowFormSelectService(true);
    // Hidde Form Address
    updateShowFormCustomer(false);

    return;
  };
  // Function that runs every time the user writes to the input
  const handleChange = (e) => {
    updateDataCustomer({
      ...dataCustomer,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleIssueChange = (e) => {
    if (e.target.value === "1") {
      updateDataCustomer({
        ...dataCustomer,
        boiler_issue: true,
        boiler_control_issue: false,
        unknown_issue: false,
      });
    } else if (e.target.value === "2") {
      updateDataCustomer({
        ...dataCustomer,
        boiler_issue: false,
        boiler_control_issue: true,
        unknown_issue: false,
      });
    } else if (e.target.value === "3") {
      updateDataCustomer({
        ...dataCustomer,
        boiler_issue: false,
        boiler_control_issue: false,
        unknown_issue: true,
      });
    } else {
      updateDataCustomer({
        ...dataCustomer,
        boiler_issue: false,
        boiler_control_issue: false,
        unknown_issue: false,
      });
    }
  };
  const handleAgeChange = (e) => {
    if (e.target.value === "1") {
      updateDataCustomer({
        ...dataCustomer,
        select: e.target.value,
        bage: "< 12 Months",
      });
    } else if (e.target.value === "2") {
      updateDataCustomer({
        ...dataCustomer,
        select: e.target.value,
        bage: "> 12 Months",
      });
    } else {
      updateDataCustomer({
        ...dataCustomer,
        select: "",
      });
    }

    console.log(dataCustomer);
  };
  const handleMarketing = (e) => {
    updateDataCustomer({
      ...dataCustomer,
      marketing: !dataCustomer.marketing,
    });
  };
  const handleCoverPlan = (e) => {
    console.log("coverPlan");
    updateDataCustomer({
      ...dataCustomer,
      cover_plan: !dataCustomer.cover_plan,
    });
  };

  // Send Add address to CustomerData
  const sendCustomer = async () => {
    let codeValue = "";
    let price = 0;
    let service_type = "";
    if (
      customerInformation.servOption.repair &&
      ((dataCustomer.select === "1" && dataCustomer.boiler_issue) ||
        dataCustomer.select === "2")
    ) {
      codeValue = "OOW1";
      price = 125;
      service_type = "Call Out & Diagnosis";
    } else if (
      customerInformation.servOption.repair &&
      dataCustomer.select === "1" &&
      !dataCustomer.boiler_issue
    ) {
      codeValue = "OOW2";
      price = 325;
      service_type = "Fixed Price Repair";
    } else if (
      customerInformation.servOption.service &&
      !dataCustomer.cover_plan
    ) {
      codeValue = "OOW3";
      service_type = "Boiler Service";
      price = 125;
    } else if (
      customerInformation.servOption.service &&
      dataCustomer.cover_plan
    ) {
      codeValue = "SPOOW";
      price = 80;
      service_type = "Boiler Service";
    }
    let servNumber = await fetch("http://51.140.201.189:6001/getMaxService", {
      method: "POST",
      body: JSON.stringify({ code: codeValue }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.message[0].service_number;
        } else {
          return `${codeValue}-1400000`;
        }
      });
    // const make = document.getElementById("make").value;
    // const model = document.getElementById("model").value;
    // const marketing = document.getElementById("marketing").value;
    // const select = document.getElementById("select").value;
    console.log("SERVNUM " + servNumber);
    // Show Overlay
    updateShowOverlay(true);

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      service_number: servNumber.split("-"),
      service_price: price,
      boiler: { ...dataCustomer },
      service_type: service_type,
    });

    // Validation successful
    updateError(false);
    // Update progress bar
    updateProgressBar({ ...progressBar, step: 5 });
    // Hidde Form Address
    updateShowFormCustomer(false);
    // Show Form Fuel type
    updateShowFormDetails(true);
    // Hidde Overlay
    updateShowOverlay(false);
    // End process
    return;
  };

  return (
    <section className="form-ft-section">
      <div className="form-ft-container">
        <div className="form-custom-content">
          {/* Inputs */}
          <form className="form-address-input-container">
            <div className="form-address-input-content">
              <h2>Boiler Information</h2>

              {/* Error */}
              {error === true ? (
                <Error message={"Please enter an Customer Information"} />
              ) : null}

              <div className="form-address-input">
                <label>Make</label>
                <div onClick={() => setFocusAnimation(!focusAnimation)}>
                  <input
                    id="make"
                    name="make"
                    type="text"
                    value={dataCustomer.make || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div
                className="form-address-input"
                style={{ position: "relative" }}
              >
                <label>Model</label>
                <div onClick={() => setFocusAnimation(!focusAnimation)}>
                  <input
                    id="model"
                    name="model"
                    type="text"
                    value={dataCustomer.model || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div
                className="form-address-input-check"
                style={{ position: "relative", marginTop: "10px" }}
              >
                <label>Marketing (opt)</label>
                <label className="switch" style={{ marginLeft: "15px" }}>
                  <input onChange={(e) => handleMarketing(e)} type="checkbox" />
                  <span className="slider"></span>
                </label>
                {service ? (
                  <div style={{ marginTop: "10px" }}>
                    <label>Cover Plan?</label>
                    <label className="switch" style={{ marginLeft: "42px" }}>
                      <input
                        onChange={(e) => handleCoverPlan(e)}
                        type="checkbox"
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                ) : null}
              </div>
              <div>
                <label className="boilAge">Boiler Age</label>
                <select
                  onChange={(e) => handleAgeChange(e)}
                  defaultValue={0}
                  className="form-select-age"
                  id="select"
                >
                  {/* <option value="">- Select -</option> */}

                  <option key="0" value="0">
                    {"Select an option..."}
                  </option>
                  <option key="1" value="1">
                    {"< 12 Months"}
                  </option>
                  <option key="2" value="2">
                    {"> 12 Months"}
                  </option>
                </select>
              </div>
              {dataCustomer.select === "1" ? (
                <div>
                  <div
                    className="form-address-input"
                    style={{ position: "relative" }}
                  >
                    <label>Is there any issue?</label>
                    <select
                      defaultValue={0}
                      onChange={(e) => handleIssueChange(e)}
                      className="form-select-age"
                      id="select"
                    >
                      {/* <option value="">- Select -</option> */}

                      <option key="0" value="0">
                        {"Select an option..."}
                      </option>
                      <option key="1" value="1">
                        {"Non Boiler"}
                      </option>
                      <option key="2" value="2">
                        {"Boiler & Controls"}
                      </option>
                      <option key="3" value="3">
                        {"Don't Know"}
                      </option>
                    </select>
                  </div>
                  <div
                    className="form-address-input"
                    style={{ position: "relative" }}
                  >
                    <label>
                      Is there any fault code showing on your boiler?
                    </label>
                    <div onClick={() => setFocusAnimation(!focusAnimation)}>
                      <input
                        id="fault_code"
                        name="fault_code"
                        type="text"
                        value={dataCustomer.fault_code || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              ) : dataCustomer.select === "2" ? (
                <div
                  className="form-address-input"
                  style={{ position: "relative" }}
                >
                  <label>Is there any fault code showing on your boiler?</label>
                  <div onClick={() => setFocusAnimation(!focusAnimation)}>
                    <input
                      id="fault_code"
                      name="fault_code"
                      type="text"
                      value={dataCustomer.fault_code || ""}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </form>
          {/* Buttons */}
          <div className="form-address-btn-container">
            <button
              className="form-address-btn btn-back"
              onClick={(e) => goBack(e)}
            >
              <IconContext.Provider value={{ color: "#D338AE", size: "35px" }}>
                <IoMdArrowDropleft className="icon-back" />
              </IconContext.Provider>
              Go back
            </button>

            <button
              className="form-address-btn btn-next"
              onClick={(e) => e.preventDefault(sendCustomer(dataCustomer))}
            >
              Continue
              <IconContext.Provider value={{ color: "#FFF", size: "35px" }}>
                <IoMdArrowDropright className="icon-next" />
              </IconContext.Provider>
            </button>
          </div>
        </div>
        {showScript ? (
          <div className="helper-ft">
            <div className="script-ft">
              <FormScript step={3} />
            </div>

            <div className="assistant-ft-custom">
              <FormAssistant tips={2} />
            </div>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <div className="assistant-ft">
              <FormAssistant tips={2} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FormCustomer;
