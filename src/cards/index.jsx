import React from "react";
import { history } from "_helpers";

export default function Cards() {
  return (
    <div>
      <div className="text-center">
        <button
          onClick={() => {
            history.navigate("/cards/new");
          }}
          className="btn btn-secondary"
        >
          Create New Card
        </button>
      </div>
    </div>
  );
}
