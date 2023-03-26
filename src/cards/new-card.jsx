import React, { useState } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { fetchWrapper } from "_helpers";
import cogoToast from "cogo-toast";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";

export default function NewCard() {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
  });

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState((prev) => ({ ...prev, issuer }));
    }
  };
  const handleInputFocus = ({ target }) => {
    setState((prev) => ({ ...prev, focused: target.name }));
  };
  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

    const response = await fetchWrapper.post(baseUrl, {
      name: formData.name,
      cardExpiration: formData.expiry,
      cardHolder: formData.name,
      cardNumber: formData.number,
      category: getRandomItem(["MC", "VISA", "AE"]),
    });
    if (response?.id) {
      setState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
      });
      cogoToast.success("Successfully Card Created", {
        position: "top-right",
      });
    } else
      cogoToast.error("Something Went Wrong", {
        position: "top-right",
      });
  };
  return (
    <div>
      <Card
        number={state.number}
        name={state.name}
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focused}
        callback={handleCallback}
      />
      <br />
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <input
            type="tel"
            name="number"
            className="form-control"
            placeholder="Card Number"
            pattern="[\d| ]{16,22}"
            value={state.number}
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={state.name}
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              value={state.expiry}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="col-6">
            <input
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              pattern="\d{3,4}"
              value={state.cvc}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
        <br />
        <input type="hidden" name="issuer" value={state.issuer} />
        <div className="form-actions">
          <button className="btn btn-primary btn-block" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
