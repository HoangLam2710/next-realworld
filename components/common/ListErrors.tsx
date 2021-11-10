import React from "react";

const ListErrors = ({ errors }: any) => {
  return (
    <ul className="error-message">
      {Object.keys(errors).map((key) => (
        <li key={key}>
          {key} {errors[key]}
        </li>
      ))}
    </ul>
  );
};

export default ListErrors;
