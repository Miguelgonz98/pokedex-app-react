import React from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label
      className="custom-checkbox"
      htmlFor="custom-checkbox__input"
    >
      <input
        type="checkbox"
        className="custom-checkbox__input"
        id="custom-checkbox__input"
        checked={checked}
        onChange={onChange}
        aria-label={checked ? "Mark checkbox" : "Unmark checkbox"}
      />
      <span className="custom-checkbox__checkmark">
        <img
          src={
            checked
              ? "src/assets/icons/checkedIcon.svg"
              : "src/assets/icons/uncheckedIcon.svg"
          }
          alt={checked ? "Checked" : "Unchecked"}
        />
      </span>
    </label>
  );
};
