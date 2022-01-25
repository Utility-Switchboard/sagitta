import React, { useState } from "react";
import "./useAddress.css";

const useAddress = (label, initialState, optionsAddress) => {
  // Custom Hook State
  const [state, updateState] = useState(initialState);
  const Selection = () => (
    <>
      <div className="selection-address-container">
        {/* <label>{label}</label> */}
        <select
          onChange={(e) => updateState(e.target.value)}
          defaultValue={[state]}
          className="select-address"
          id="select"
          multiple
        >
          {/* <option value="">- Select -</option> */}
          {optionsAddress.map((option) => (
            <option key={option.id} value={option.id}>
              {option.formatted_address
                .toString()
                .replace(/,*,/g, ",")
                .replace(/,/g, ", ")}
              {console.log()}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  // State return, interface and fn to modificate the state
  return [state, Selection, updateState];
};

export default useAddress;
