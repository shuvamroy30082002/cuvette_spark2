import React, { useContext, useEffect, useState } from "react";
import styles from "../PageStyles/register.module.css";
import Cover from "../assets/CoverImg.png";

import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const Register = () => {

  
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    checkbox: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newError = {};
    if (!formData.firstName.trim()) newError.firstName = "First name required*";
    if (!formData.lastName.trim()) newError.lastName = "Last name required*";
    if (!formData.email.trim()) newError.email = "Email required*";
    if (!formData.password.trim()) {
      newError.password = "Password required*";
    } else if (formData.password.length < 8) {
      newError.password = "The password must be at least 8 characters long*";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)
    ) {
 ;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handelRegister = async () => {
    if (!validateForm()) {
      return console.log("fields required");
    }
    try {
      const formattedData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
      
        email: "",
        password: "",
        confirmPass: "",
        checkbox: false,
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.register}>
        <div className={styles.logo}>
          <img src={Sparklogo} alt="logo" />
          <h2>
            SPARK<span>&trade;</span>
       
            </div>
            <div className={styles.   <div className={styles.uInput}>
                <p>First name</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  required
                  onChange={(e) =>              ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <p
                  style={{
                    visibility: errors.firstName ? "visible" : "hidden",
                  }}
                  className={styles.inpurError}
                >
                  {errors.firstName || "Field is required"}
                </p>
              </div>
              <div className={styles.uInput}>
                <p>Last name</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
        />
                <p
                  style={{
                    v
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <p
                  style={{
                    visibility: errors.email ? "visible" : "hidden",
                  }}
                  className={styles.inpurError}
                >
                  {errors.email || "Field is required"}
                </p>
              </div>
              <div className={styles.uInput}>
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <p
                  style={{
                    visibility: errors.password ? "visible" : "hidden",
                  }}
                  className={styles.inpurError}
                >
                  {errors.password || "Field is required"}
                </p>
              </div>
              <div className={styles.uInput}>
                <p>Confirm Password</p>
                <input
                  type="password"
                  name="confirmPass"
                  value={formData.confirmPass}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <p
                  style={{
                    visibility: errors.confirmPass ? "visible" : "hidden",
                  }}
                  className={styles.inpurError}
                >
                  {errors.confirmPass || "Field is required"}
                </p>
              </div>
              <div className={styles.uInputcheck}>
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={formData.checkbox}
                  onChange={handleChange}
                />
                <p
                  style={{
                    color: errors.checkbox ? "red" : "",
                  }}
                >
                  By creating an account, I agree to our
                  <span>Terms of use</span>
                  and <span>Privacy Policy</span>
                </p>
              </div>
              <button className={styles.createBtn} onClick={handelRegister}>
                Create an account
              </button>
            </div>
          </div>
          <div className={styles.footerMsg}>
            <p>
              This is protected by reCAPTCHA and the{" "}
              <span>Google Privacy Policy</span> and
              <span>Terms of Service</span> apply.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cover}>
        <div className={styles.imageSection}>
          <img src={Cover} alt="cover image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
