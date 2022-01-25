import React, { useEffect } from "react";
// CSS
import "./FormSuccessful.css";
// Icons
// import { BsStarFill, BsStar } from 'react-icons/bs';
// Images
import Successful from "../../assets/img/successful.svg";

const FormSuccessful = ({ customerInformation }) => {
  /** STATES */

  // Scroll to middle
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(customerInformation);
    let deal = {};
  }, []);

  const newDeal = (e) => {
    e.preventDefault();
    let monday = customerInformation.customAvai.monday_am
      ? "AM"
      : customerInformation.customAvai.monday_pm
      ? "PM"
      : customerInformation.customAvai.monday_allday
      ? "All Day"
      : "None";
    let tuesday = customerInformation.customAvai.tuesday_am
      ? "AM"
      : customerInformation.customAvai.tuesday_pm
      ? "PM"
      : customerInformation.customAvai.tuesday_allday
      ? "All Day"
      : "None";
    let wednesday = customerInformation.customAvai.wednesday_am
      ? "AM"
      : customerInformation.customAvai.wednesday_pm
      ? "PM"
      : customerInformation.customAvai.wednesday_allday
      ? "All Day"
      : "None";
    let thursday = customerInformation.customAvai.thursday_am
      ? "AM"
      : customerInformation.customAvai.thursday_pm
      ? "PM"
      : customerInformation.customAvai.thursday_allday
      ? "All Day"
      : "None";
    let friday = customerInformation.customAvai.friday_am
      ? "AM"
      : customerInformation.customAvai.friday_pm
      ? "PM"
      : customerInformation.customAvai.friday_allday
      ? "All Day"
      : "None";
    let issue_type = customerInformation.boiler.boiler_issue
      ? "Non Boiler"
      : customerInformation.boiler.boiler_control_issue
      ? "Boiler & Controls"
      : customerInformation.boiler.unknown_issue
      ? "Don't Know"
      : "None";
    let obj = {
      service_number: customerInformation.service_number,
      customer_info: {
        email: customerInformation.customerDetails.email,
        Salutation: "",
        Last_Name: customerInformation.customerDetails.last_name,
        Full_Name: customerInformation.customerDetails.first_name,
        Mobile: customerInformation.customerDetails.phone,
        Phone: "",
      },
      address: {
        address_1: customerInformation.address.addressline1,
        address_2: customerInformation.address.addressline2,
        city: customerInformation.address.city,
        postcode: customerInformation.address.postcode,
        door_number: customerInformation.address.doornumber,
        layout: "",
      },
      price: customerInformation.service_price,
      policy_type: customerInformation.service_type,
      payment_date: "",
      payment_type: "",
      worldpay_auth_code: customerInformation.payment_ref,
      company: "Smart Plan",
      create_date: "",
      one_off_stage: "",
      boiler_type: customerInformation.fuel.gas_only ? "Gas" : "LGP",
      has_hot_water: customerInformation.hotwater.hot_yes ? "Yes" : "No",
      has_central_heating: customerInformation.heating.heat_yes ? "Yes" : "No",
      boiler_fault_code: customerInformation.boiler.fault_code,
      boiler_manufacturer: "",
      boiler_model: customerInformation.boiler.model,
      boiler_age: customerInformation.boiler.bage,
      boiler_issue_type: issue_type,
      customer_unavailability: "",
      date_booked_in: "",
      engineer_s_name: "",
      engineer_cost: "",
      net_profit: "",
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
    };

    if (customerInformation.boiler.cover_plan) {
      obj = {
        ...obj,
        account: {
          account_name: "",
          account_number: customerInformation.bankDetails.account_number,
          sort_code: customerInformation.bankDetails.sort_code,
          service_number: customerInformation.service_number,
          address: "",
          payment_reference: "",
        },
      };
    }

    console.log(obj);
    // Reload page
    // window.location.reload();
  };

  return (
    <>
      <section className="successful-section">
        <div className="successful-container">
          <div className="successful-img-container">
            <img src={Successful} alt="Successful image" />
          </div>

          <div className="successful-message">
            <h1>All data has now been submitted successfully.</h1>

            <h2>Zoho contact has now been updated with new deal</h2>
          </div>

          <div className="successful-done-btn-container">
            <button
              className="successful-done-btn"
              type="button"
              onClick={(e) => newDeal(e)}
            >
              Start a new deal
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormSuccessful;
