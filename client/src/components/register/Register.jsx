import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import { useContext } from "react";

const registerFormKeys = {
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirm-password",
};
export default function Register() {
  const { registerSubmitHandler } = useContext(AuthContext);

  const { formValues, onChange, onSubmit } = useForm(registerSubmitHandler, {
    [registerFormKeys.Email]: "",
    [registerFormKeys.Password]: "",
    [registerFormKeys.ConfirmPassword]: "",
  });

  return (
    <section id="register-page" className="content auth">
      <form id="register" onSubmit={onSubmit}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@email.com"
            onChange={onChange}
            values={formValues[registerFormKeys.Email]}
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            onChange={onChange}
            values={formValues[registerFormKeys.Password]}
          />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={onChange}
            values={formValues[registerFormKeys.ConfirmPassword]}
          />

          <input className="btn submit" type="submit" value="Register" />

          <p className="field">
            <span>
              If you already have profile click <a href="#">here</a>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
