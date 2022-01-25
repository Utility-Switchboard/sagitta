import React, { useState, useEffect } from "react";
// Styles
// import "./FormSelectService.css";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { GiElectric } from "react-icons/gi";
// import { ImFire } from "react-icons/im";
import { FaCheckSquare, FaBriefcaseMedical, FaCogs } from "react-icons/fa";

// Components
import FormAssistant from "../FormAssistant/FormAssistant";
import FormScript from "../FormScript/FormScript";
import Error from "../Error/Error";

function FormSelectService({
  customerInformation,
  showScript,
  progressBar,
  updateCustomerInformation,
  updateShowFormFuelType,
  updateProgressBar,
  updateShowFormCustomer,
  updateShowFormSelectService,
}) {
  /* STATES */

  const [isActive, updateIsActive] = useState({
    service: false,
    repair: false,
  });
  let servActive = true;
  const hotwater = customerInformation.hotwater.hot_yes;
  const heating = customerInformation.heating.heat_yes;
  if (hotwater && heating) {
    servActive = false;
  }
  //   const [radioActive, updateRadioActive] = useState({
  //     repair: false,
  //     service: false,
  //   });

  // Active class for fuel type
  const repair = isActive.repair;
  const service = isActive.service;

  // Active class for radio buttons (Hot Water)
  //   const active_rb_hotwater_yes = radioActive.hot_yes;
  //   const active_rb_hotwater_no = radioActive.hot_no;

  // Active class for radio buttons (Heating)
  //   const active_rb_heat_yes = radioActive.heat_yes;
  //   const active_rb_heat_no = radioActive.heat_no;

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
  const handleClickRepair = (e) => {
    e.preventDefault();

    // Update Error
    update_error_fuel(false);
    update_error_dual(false);

    // Udpate state
    updateIsActive({
      ...isActive,
      repair: true,
      service: false,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      servOption: {
        repair: true,
        service: false,
      },
    });
  };

  // Handle Click Electricity only
  const handleClickService = (e) => {
    e.preventDefault();
    // Update Error
    update_error_fuel(false);
    update_error_dual(false);

    // Udpate state
    updateIsActive({
      ...isActive,
      repair: false,
      service: true,
    });

    // Update Customer
    updateCustomerInformation({
      ...customerInformation,
      servOption: {
        repair: false,
        service: true,
      },
    });
  };

  // Send Fuel type - Continue
  const sendFuelType = async (e) => {
    e.preventDefault();

    // Validation
    if (repair === false && service === false) {
      update_error_fuel(true);
      return;
    }

    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 4,
    });

    // Hidde Fuel Type
    updateShowFormSelectService(false);
    // Show MPAN/MPRN
    updateShowFormCustomer(true);

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
      step: 3,
    });
    // Update Customer Information
    let newCustomerInformation = { ...customerInformation };
    delete newCustomerInformation["servOption"];
    updateCustomerInformation({
      ...newCustomerInformation,
    });
    // Hidde Fuel type
    updateShowFormFuelType(true);
    // Show FormAddress
    updateShowFormSelectService(false);

    // Update Customer Information
    // updateCustomerInformation({ ...copy_customerInformation });

    return;
  };

  return (
    <section className="form-ft-section">
      <div className="form-ft-container">
        <div className="form-ft-content">
          <div className="form-ft-compare">
            <h1>Choose the type of service</h1>

            {/* Fuel type */}
            <form className="form-ft-btn-selection-container">
              <div className="form-ft-blocks">
                <button
                  data-cy="gas-only"
                  type="submit"
                  className={
                    repair
                      ? "form-ft-btn-selection-content active"
                      : "form-ft-btn-selection-content"
                  }
                  onClick={(e) => handleClickRepair(e)}
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
                      <FaCogs className="fuel-icon" />
                    </IconContext.Provider>
                  </div>
                  <p>Repair</p>
                </button>
              </div>

              <div className="form-ft-blocks">
                <button
                  data-cy="elec-only"
                  type="button"
                  disabled={servActive}
                  className={
                    service
                      ? "form-ft-btn-selection-content active"
                      : "form-ft-btn-selection-content"
                  }
                  onClick={(e) => e.preventDefault(handleClickService(e))}
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
                      <FaBriefcaseMedical className="fuel-icon" />
                    </IconContext.Provider>
                  </div>
                  <p>Service</p>
                </button>
              </div>
            </form>
            {/* Error */}
            {error_fuel === true ? (
              <Error message={"Please select one"} />
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

export default FormSelectService;
