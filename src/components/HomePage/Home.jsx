import React, { useState, lazy, Suspense } from "react";

// Components
import { Navigation } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Overlay from "../Overlay/Overlay";
import "./styles.css";
const FormPostCode = lazy(() => import("../FormPostCode/FormPostCode"));
const FormAddress = lazy(() => import("../FormAddress/FormAddress"));
const FormFuelType = lazy(() => import("../FormFuelType/FormFuelType"));
const FormCustomer = lazy(() => import("../FormCustomer/FormCustomer"));
const FormSelectService = lazy(() =>
  import("../FormSelectService/FormSelectService")
);

const FormDetails = lazy(() => import("../FormDetails/FormDetails"));
const FormBankDetailsCP = lazy(() =>
  import("../FormBankDetailsCP/FormBankDetailsCP")
);
const FormSuccessful = lazy(() => import("../FormSuccessful/FormSuccessful"));

function Home() {
  /* -- STATES -- */
  // Progress bar
  const [progressBar, updateProgressBar] = useState({ step: 0 });

  // Script
  const [showScript, updateShowScript] = useState(true);

  // Customer Postcode State
  const [customerPostCode, updateCustomerPostCode] = useState({
    postcode: "",
  });

  // Customer Address
  const [customerAddres, updateCustomerAddress] = useState({});

  // Customer Information
  const [customerInformation, updateCustomerInformation] = useState({});

  /** -- VIEWS states -- */

  // Show Overlay
  const [showOverlay, updateShowOverlay] = useState(false);

  // Show Form PostCode
  const [showFormPostCode, updateShowFormPostCode] = useState(true);

  // Show Form Address
  const [showFormAddres, updateShowFormAddres] = useState(false);

  // Show Form Customer
  const [showFormCustomer, updateShowFormCustomer] = useState(false);

  // Show form Fuel type
  const [showFormFuelType, updateShowFormFuelType] = useState(false);

  // Show form Select Service
  const [showFormSelectService, updateShowFormSelectService] = useState(false);

  // Show Form Details
  const [showFormDetails, updateShowFormDetails] = useState(false);

  // Show Form Bank Details
  const [showFormBankDetails, updateShowFormBankDetails] = useState(false);

  // Show rating
  const [showFormRating, updateShowFormRating] = useState(false);

  // Show Successful
  const [showSuccessFul, updateShowSuccessFul] = useState(false);

  // Add postcode to customer
  const addPostCodeData = (postcode) => {
    const postCodeData = postcode;
    updateCustomerPostCode({
      postcode: postCodeData.toUpperCase(),
    });
  };

  return (
    <>
      {/* Navbar */}
      <Navigation progressBar={progressBar} />

      {/* Overlay */}
      {showOverlay ? (
        <Overlay text={"Loading data, please wait..."} spinner={true} />
      ) : null}
      {showFormPostCode ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormPostCode
            addPostCodeData={addPostCodeData}
            progressBar={progressBar}
            showScript={showScript}
            updateShowFormPostCode={updateShowFormPostCode}
            updateShowFormAddres={updateShowFormAddres}
            updateProgressBar={updateProgressBar}
            updateShowScript={updateShowScript}
          />
        </Suspense>
      ) : null}
      {/* Address form*/}
      {showFormAddres ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormAddress
            postcodeValue={customerPostCode.postcode}
            progressBar={progressBar}
            showScript={showScript}
            customerInformation={customerInformation}
            updateCustomerAddress={updateCustomerAddress}
            updateShowFormPostCode={updateShowFormPostCode}
            updateShowFormAddres={updateShowFormAddres}
            updateShowFormFuelType={updateShowFormFuelType}
            updateShowOverlay={updateShowOverlay}
            updateProgressBar={updateProgressBar}
            updateShowScript={updateShowScript}
            updateCustomerInformation={updateCustomerInformation}
          />
        </Suspense>
      ) : null}
      {/* Fuel type */}
      {showFormFuelType ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormFuelType
            customerInformation={customerInformation}
            showScript={showScript}
            customerAddres={customerAddres}
            progressBar={progressBar}
            updateCustomerInformation={updateCustomerInformation}
            updateCustomerAddress={updateCustomerAddress}
            updateShowFormAddres={updateShowFormAddres}
            updateShowFormFuelType={updateShowFormFuelType}
            updateShowFormSelectService={updateShowFormSelectService}
            updateProgressBar={updateProgressBar}
          />
        </Suspense>
      ) : null}
      {/* Fuel type */}
      {showFormSelectService ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormSelectService
            customerInformation={customerInformation}
            showScript={showScript}
            progressBar={progressBar}
            updateCustomerInformation={updateCustomerInformation}
            updateShowFormFuelType={updateShowFormFuelType}
            updateShowFormSelectService={updateShowFormSelectService}
            updateShowFormCustomer={updateShowFormCustomer}
            updateProgressBar={updateProgressBar}
          />
        </Suspense>
      ) : null}
      {/* Customer form*/}
      {showFormCustomer ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormCustomer
            customerInformation={customerInformation}
            showScript={showScript}
            progressBar={progressBar}
            updateShowOverlay={updateShowOverlay}
            updateCustomerInformation={updateCustomerInformation}
            updateShowFormSelectService={updateShowFormSelectService}
            updateShowFormCustomer={updateShowFormCustomer}
            updateShowFormDetails={updateShowFormDetails}
            updateProgressBar={updateProgressBar}
          />
        </Suspense>
      ) : null}
      {/* Form Details */}
      {showFormDetails ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormDetails
            customerInformation={customerInformation}
            progressBar={progressBar}
            updateCustomerInformation={updateCustomerInformation}
            updateProgressBar={updateProgressBar}
            updateShowFormCustomer={updateShowFormCustomer}
            updateShowFormDetails={updateShowFormDetails}
            updateShowFormBankDetails={updateShowFormBankDetails}
            updateShowOverlay={updateShowOverlay}
            updateShowSuccessFul={updateShowSuccessFul}
          />
        </Suspense>
      ) : null}
      {/* Form Bank Details */}
      {showFormBankDetails ? (
        <Suspense
          fallback={
            <Overlay text={"Loading data, please wait..."} spinner={true} />
          }
        >
          <FormBankDetailsCP
            customerInformation={customerInformation}
            progressBar={progressBar}
            updateCustomerInformation={updateCustomerInformation}
            updateProgressBar={updateProgressBar}
            updateShowFormDetails={updateShowFormDetails}
            updateShowFormBankDetails={updateShowFormBankDetails}
            updateShowFormRating={updateShowFormRating}
            updateShowOverlay={updateShowOverlay}
            updateShowSuccessFul={updateShowSuccessFul}
          />
        </Suspense>
      ) : null}
      {/* Form successful */}
      {showSuccessFul ? (
        <FormSuccessful customerInformation={customerInformation} />
      ) : null}
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
