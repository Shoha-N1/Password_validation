import React, { useState } from "react";
import "./PasswordValid.scss";
import OpenEye from "./../../assets/open_eye.svg";
import CloseEye from "./../../assets/close_eye.png";

export default function PasswordValid() {
  const [type, setType] = useState("password");

  const [values, setValues] = useState({
    password_input:'',
    confirm_password: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setValues({...values, [e.target.name] : [e.target.value]})
  };

  function handleValidation(e) {
    e.preventDefault()
    setErrors(Validations(values))
  }

  function Validations(values) {
     let error = {} 
     const password_RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

     if (values.password_input === "") {
        error.password_input = "Password should not be empty"
     }
     else if (!password_RegExp.test(values.password_input)) {
        const erdet = <details><summary>Password didn't match</summary> "If an error occurs, one of the following steps was not performed: 1. Must be at least 8 letters  2. At least 1 capital letter must be used  3. at least 1 lowercase letter must be used   4. must be at least 1 character"</details>
  
        error.password_input = erdet
     }
      if (values.confirm_password === "" ||String(values.confirm_password) !== String(values.password_input)) {
        error.confirm_password = "Password not matched"
     }

     return error
    }

  return (
    <div className="wrapper bg-blue">
      <div className="box">
        <div className="icon-div form-control">
          <form onSubmit={handleValidation}>
            <label>Password</label>
            <input name="password_input" onChange={handleChange} type={type} placeholder="Enter password" className="custom-input" />
            {errors.password_input && <p style={{color: "red"}}>{errors.password_input}</p>}

            <label>Confirm Password</label>
            <input name="confirm_password" onChange={handleChange} type={type} placeholder="Confirm password" className="custom-input" />
            {errors.confirm_password && <p style={{color: "red"}}>{errors.confirm_password}</p>}

            <div className="mt-4 mb-2 ">
                <button className="btn btn-danger me-2" >Cancel</button>
                <button className="btn btn-success ">Sign Up</button>
            </div>
          </form>

          {type === "password" ? (
            <span className="icon-span" onClick={() => setType("text")}>
              <img src={CloseEye} />
            </span>
          ) : (
            <span className="icon-span" onClick={() => setType("password")}>
              <img src={OpenEye} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
