import React, { useState, useEffect } from "react";
// Styles
import "./FormFuelType.css";

// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { GiElectric } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { FaCheckSquare, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

// Components
import FormAssistant from "../FormAssistant/FormAssistant";
import FormScript from "../FormScript/FormScript";
import Error from "../Error/Error";

function FormFuelType({
  customerInformation,
  showScript,
  customerAddres,
  progressBar,
  updateCustomerInformation,
  updateCustomerAddress,
  updateShowFormAddres,
  updateShowFormFuelType,
  updateShowFormSelectService,
  updateProgressBar,
}) {
  /* STATES */
  const [isActive, updateIsActive] = useState({
    gas_only: false,
    elec_only: false,
  });
  const [radioActive, updateRadioActive] = useState({
    hot_yes: false,
    hot_no: false,
    heat_yes: false,
    heat_no: false,
  });

  // Active class for fuel type
  const active_gas = isActive.gas_only;
  const active_elec = isActive.elec_only;

  // Active class for radio buttons (Hot Water)
  const active_rb_hotwater_yes = radioActive.hot_yes;
  const active_rb_hotwater_no = radioActive.hot_no;

  // Active class for radio buttons (Heating)
  const active_rb_heat_yes = radioActive.heat_yes;
  const active_rb_heat_no = radioActive.heat_no;

  // Error State
  const [error_fuel, update_error_fuel] = useState(false);
  const [error_dual, update_error_dual] = useState(false);

  // Error smooth scroll
  useEffect(() => {
    if (error_fuel) {
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

    if (error_dual) {
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
  }, [error_fuel, error_dual]);

  /**-- Functions --*/

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle Click Gas only
  const handleClickGas = (e) => {
    e.preventDefault();
    // Update state
    updateRadioActive({
      ...radioActive,
      hot_yes: false,
      hot_no: false,
      heat_yes: false,
      heat_no: false,
    });
    // Update Error
    update_error_fuel(false);
    update_error_dual(false);

    // Udpate state
    updateIsActive({
      ...isActive,
      gas_only: true,
      elec_only: false,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      fuel: {
        gas_only: true,
        elec_only: false,
      },
    });
  };

  // Handle Click Electricity only
  const handleClickElec = (e) => {
    e.preventDefault();
    // Update state
    updateRadioActive({
      ...radioActive,
      hot_yes: false,
      hot_no: false,
      heat_yes: false,
      heat_no: false,
    });
    // Update Error
    update_error_fuel(false);
    update_error_dual(false);

    // Udpate state
    updateIsActive({
      ...isActive,
      gas_only: false,
      elec_only: true,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      fuel: {
        gas_only: false,
        elec_only: true,
      },
    });
  };

  // Handle Click Radio button - Yes
  const handleClickRB_hotwater_yes = () => {
    // Update Error
    update_error_dual(false);

    // Checkbox
    const hot_yes = document.getElementById("hot_yes");
    hot_yes.checked = true;
    // Update state
    updateRadioActive({
      ...radioActive,
      hot_yes: true,
      hot_no: false,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      hotwater: {
        hot_yes: true,
        hot_no: false,
      },
    });
  };
  // Handle Click Radio button Heat - Yes
  const handleClickRB_heat_yes = () => {
    // Update Error
    update_error_dual(false);

    // Checkbox
    const heat_yes = document.getElementById("heat_yes");
    heat_yes.checked = true;
    // Update state
    updateRadioActive({
      ...radioActive,
      heat_yes: true,
      heat_no: false,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      heating: {
        heat_yes: true,
        heat_no: false,
      },
    });
  };

  // Handle Click Radio button - No
  const handleClickRB_hotwater_no = () => {
    // Update Error
    update_error_dual(false);

    // Checkbox
    const hot_no = document.getElementById("dual_no");
    hot_no.checked = true;
    // Update state
    updateRadioActive({
      ...radioActive,
      hot_yes: false,
      hot_no: true,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      hotwater: {
        hot_yes: false,
        hot_no: true,
      },
    });
  };
  // Handle Click Radio button - No
  const handleClickRB_heat_no = () => {
    // Update Error
    update_error_dual(false);

    // Checkbox
    const heat_no = document.getElementById("heat_no");
    heat_no.checked = true;
    // Update state
    updateRadioActive({
      ...radioActive,
      heat_yes: false,
      heat_no: true,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      heating: {
        heat_yes: false,
        heat_no: true,
      },
    });
  };

  // Send Fuel type - Continue
  const sendFuelType = async (e) => {
    e.preventDefault();
    console.log(customerInformation);
    // Validation
    if (active_gas === false && active_elec === false) {
      update_error_fuel(true);
      return;
    }

    if (active_rb_hotwater_yes === false && active_rb_hotwater_no === false) {
      update_error_dual(true);
      return;
    }
    if (active_rb_heat_yes === false && active_rb_heat_no === false) {
      update_error_dual(true);
      return;
    }

    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 3,
    });

    // Hidde Fuel Type
    updateShowFormFuelType(false);
    // Show SelectService
    updateShowFormSelectService(true);

    return;
  };

  // Go back
  const goBack = async (e) => {
    e.preventDefault();

    // Update error
    update_error_fuel(false);
    update_error_dual(false);

    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 2,
    });

    // Hidde Fuel type
    updateShowFormFuelType(false);
    // Show FormAddress
    updateShowFormAddres(true);

    // Update Customer Information
    let newCustomerInformation = { ...customerInformation };
    delete newCustomerInformation["heating"];
    delete newCustomerInformation["hotwater"];
    delete newCustomerInformation["fuel"];
    updateCustomerInformation({
      ...newCustomerInformation,
    });

    return;
  };

  return (
    <section className="form-ft-section">
      <div className="form-ft-container">
        <div className="form-ft-content">
          <div className="form-ft-compare">
            <h1>Fuel type of boiler?</h1>

            {/* Fuel type */}
            <form className="form-ft-btn-selection-container">
              <div className="form-ft-blocks">
                <button
                  data-cy="gas-only"
                  type="submit"
                  className={
                    active_gas
                      ? "form-ft-btn-selection-content active"
                      : "form-ft-btn-selection-content"
                  }
                  onClick={(e) => handleClickGas(e)}
                >
                  <div className="form-ft-cb-container">
                    <IconContext.Provider
                      value={{ color: "#31145B", size: "30px" }}
                    >
                      <FaCheckSquare className="form-ft-cb" />
                    </IconContext.Provider>
                  </div>

                  <div className="form-ft-btn-selection">
                    <IconContext.Provider
                      value={{ color: "#31145B", size: "35px" }}
                    >
                      <ImFire className="fuel-icon" />
                    </IconContext.Provider>
                  </div>
                  <p>Gas</p>
                </button>
              </div>

              <div className="form-ft-blocks">
                <button
                  data-cy="elec-only"
                  type="submit"
                  className={
                    active_elec
                      ? "form-ft-btn-selection-content active"
                      : "form-ft-btn-selection-content"
                  }
                  onClick={(e) => handleClickElec(e)}
                >
                  <div className="form-ft-cb-container">
                    <IconContext.Provider
                      value={{ color: "#31145B", size: "30px" }}
                    >
                      <FaCheckSquare className="form-ft-cb" />
                    </IconContext.Provider>
                  </div>

                  <div className="form-ft-btn-selection">
                    <IconContext.Provider
                      value={{ color: "#31145B", size: "35px" }}
                    >
                      <GiElectric className="fuel-icon" />
                    </IconContext.Provider>
                  </div>
                  <p>LPG</p>
                </button>
              </div>
            </form>
            {/* Error */}
            {error_fuel === true ? (
              <Error message={"Please select one"} />
            ) : null}

            {active_gas || active_elec ? (
              <>
                <h2>Do you have hot water?</h2>

                {/* If is dual */}
                <form className="form-ft-btn-selection-container">
                  <div data-cy="dual-yes" className="form-ft-blocks-dual">
                    <div
                      style={{ height: "4.5rem" }}
                      className={
                        active_rb_hotwater_yes
                          ? "form-ft-btn-selection-content isDual active"
                          : "form-ft-btn-selection-content isDual"
                      }
                      id="yes_selected"
                      onClick={() => handleClickRB_hotwater_yes()}
                    >
                      <input
                        className="d-none"
                        type="radio"
                        name="dual-type"
                        id="hot_yes"
                      />
                      <div className="form-ft-cb-container">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "30px" }}
                        >
                          <FaCheckSquare className="form-ft-cb" />
                        </IconContext.Provider>
                      </div>

                      <div className="form-ft-btn-selection-dual">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "35px" }}
                        >
                          <FaRegThumbsUp className="fuel-icon" />
                        </IconContext.Provider>
                      </div>
                      <p>Yes</p>
                    </div>
                  </div>

                  <div data-cy="dual-no" className="form-ft-blocks-dual">
                    <div
                      style={{ height: "4.5rem" }}
                      className={
                        active_rb_hotwater_no
                          ? "form-ft-btn-selection-content isDual active"
                          : "form-ft-btn-selection-content isDual"
                      }
                      id="no_selected"
                      onClick={() => handleClickRB_hotwater_no()}
                    >
                      <input
                        className="d-none"
                        type="radio"
                        name="dual-type"
                        id="dual_no"
                      />
                      <div className="form-ft-cb-container">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "30px" }}
                        >
                          <FaCheckSquare className="form-ft-cb" />
                        </IconContext.Provider>
                      </div>

                      <div className="form-ft-btn-selection-dual">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "35px" }}
                        >
                          <FaRegThumbsDown className="fuel-icon" />
                        </IconContext.Provider>
                      </div>
                      <p>No</p>
                    </div>
                  </div>
                </form>
                {/* Error */}
                {error_dual === true ? (
                  <div className="error-center mt-2">
                    <Error message={"Please select one"} />
                  </div>
                ) : null}
              </>
            ) : null}

            {active_rb_hotwater_yes || active_rb_hotwater_no ? (
              <>
                <h2>Do you have Central Heating?</h2>

                {/* If is dual */}
                <form className="form-ft-btn-selection-container">
                  <div data-cy="dual-yes" className="form-ft-blocks-dual">
                    <div
                      style={{ height: "4.5rem" }}
                      className={
                        active_rb_heat_yes
                          ? "form-ft-btn-selection-content isDual active"
                          : "form-ft-btn-selection-content isDual"
                      }
                      id="yes_selected"
                      onClick={() => handleClickRB_heat_yes()}
                    >
                      <input
                        className="d-none"
                        type="radio"
                        name="dual-type"
                        id="heat_yes"
                      />
                      <div className="form-ft-cb-container">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "30px" }}
                        >
                          <FaCheckSquare className="form-ft-cb" />
                        </IconContext.Provider>
                      </div>

                      <div className="form-ft-btn-selection-dual">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "35px" }}
                        >
                          <FaRegThumbsUp className="fuel-icon" />
                        </IconContext.Provider>
                      </div>
                      <p>Yes</p>
                    </div>
                  </div>

                  <div data-cy="dual-no" className="form-ft-blocks-dual">
                    <div
                      style={{ height: "4.5rem" }}
                      className={
                        active_rb_heat_no
                          ? "form-ft-btn-selection-content isDual active"
                          : "form-ft-btn-selection-content isDual"
                      }
                      id="no_selected"
                      onClick={() => handleClickRB_heat_no()}
                    >
                      <input
                        className="d-none"
                        type="radio"
                        name="dual-type"
                        id="heat_no"
                      />
                      <div className="form-ft-cb-container">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "30px" }}
                        >
                          <FaCheckSquare className="form-ft-cb" />
                        </IconContext.Provider>
                      </div>

                      <div className="form-ft-btn-selection-dual">
                        <IconContext.Provider
                          value={{ color: "#31145B", size: "35px" }}
                        >
                          <FaRegThumbsDown className="fuel-icon" />
                        </IconContext.Provider>
                      </div>
                      <p>No</p>
                    </div>
                  </div>
                </form>
                {/* Error */}
                {error_dual === true ? (
                  <div className="error-center mt-2">
                    <Error message={"Please select one"} />
                  </div>
                ) : null}
              </>
            ) : null}
          </div>

          {/* Buttons */}
          <div className="form-ft-btn-container">
            <button className="form-ft-btn btn-back" onClick={(e) => goBack(e)}>
              <IconContext.Provider value={{ color: "#D338AE", size: "35px" }}>
                <IoMdArrowDropleft className="icon-back" />
              </IconContext.Provider>
              Go back
            </button>

            <button
              data-cy="ft-continue"
              className="form-ft-btn btn-next"
              onClick={(e) => sendFuelType(e)}
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

export default FormFuelType;
