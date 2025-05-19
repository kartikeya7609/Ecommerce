import { useState } from "react";
import "../App.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password must contain at least one non-numeric character
    if (/^\d+$/.test(formData.password)) {
      alert("Password must contain at least one character other than numbers");
      return;
    }

    // Password must be at least 8 characters
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ✅ All validations passed
    alert("✅ Your details are saved and a confirmation email has been sent.");

    // Create and log the user object (excluding confirmPassword)
    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    console.log("✅ Registered User:", user);

    // Clear the form fields
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center register-bg">
      <div className="register-card p-5 rounded-4 shadow-lg">
        <h2 className="text-center mb-4 text-white fw-bold">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <div className="form-floating mb-3" key={field}>
              <input
                type={field.includes("password") ? "password" : "text"}
                className="form-control bg-transparent text-white border-light"
                id={field}
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
              <label htmlFor={field} className="text-white">
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())}
              </label>
            </div>
          ))}

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-outline-light btn-lg fw-semibold"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
