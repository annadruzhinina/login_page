import "./app.css";
import { useState, useEffect, useRef } from "react";
import FormInput from "./components/FormInput";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Use Routes instead of Switch
import FormYup from "./components/FormYup";

function App() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and should`it include any special characters!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validUsername = /^[A-Za-z0-9]{3,16}$/.test(values.username);
    const validPassword =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
        values.password
      );
    const passwordsMatch = values.password === values.confirmPassword;

    setIsValid(validUsername && validPassword && passwordsMatch);
    if (submitButtonRef.current && isValid) {
      submitButtonRef.current.focus();
    }
  }, [values, isValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (isValid) {
      setShowModal(true);
    }
    console.log("Input data: ", Object.fromEntries(data.entries()));
  };

  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitButtonRef = useRef(null);

  // console.log(values);
  return (
    <>
      <Router>
        <div>
          <Link className="link" to="/">
            1st Realisation{" "}
          </Link>
          <Link className="link" to="/dashboard">
            2nd Form&Yup{" "}
          </Link>
        </div>

        <Routes>
          <Route path="/dashboard" element={<FormYup />} />

          <Route
            path="/"
            element={
              <div className="App">
                <form onSubmit={handleSubmit}>
                  <h2>Register_1</h2>
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}
                  <button
                    type="submit"
                    disabled={!isValid}
                    ref={submitButtonRef}
                  >
                    Submit
                  </button>
                </form>
                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <div
                        className="close-button"
                        onClick={() => setShowModal(false)}
                      >
                        &times;
                      </div>
                      <p className="modal-message">Your Form is Submitted 🙌🏻</p>
                    </div>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
