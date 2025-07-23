import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";

export default function LoginPage({ loginMode = false }) {
  const [login, setLogin] = useState(loginMode);
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, setAddUser] = useState({
    fullname: "",
    useremail: "",
    userpassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLogin(location.pathname === "/login");
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullname, useremail, userpassword } = addUser;

    if (!fullname || !useremail || !userpassword) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://task-management-backend-two-coral.vercel.app/v1/signup/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addUser)
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccessMessage("Signup successful!");
        setAddUser({ fullname: "", useremail: "", userpassword: "" });
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(result?.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong during signup");
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { useremail, userpassword } = addUser;

    if (!useremail || !userpassword) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://task-management-backend-two-coral.vercel.app/v1/login/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useremail, userpassword })
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccessMessage("Login successful!");
        localStorage.setItem("Login-token", result.token);
        setRedirectToDashboard(true);
      } else {
        setErrorMessage(result?.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong during login");
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setErrorMessage("");
    setSuccessMessage("");
    navigate(login ? "/signup" : "/login");
  };

  if (redirectToDashboard) return <Navigate to="/auth/dashboard" />;

  return (
    <div className="login-page d-flex position-relative overflow-hidden" style={{ minHeight: "100vh" }}>
      <div
        className="bg-dark w-50 py-5 text-light position-absolute transition-side"
        style={{
          minHeight: "100vh",
          transform: login ? "translateX(100%)" : "translateX(0%)",
          borderBottomRightRadius: "0.5rem",
          borderTopLeftRadius: login ? "0.5rem" : "0",
          borderTopRightRadius: login ? "0" : "0.5rem",
          borderBottomLeftRadius: login ? "0.5rem" : "0"
        }}
      >
        {errorMessage && (
          <div className="alert alert-danger mt-3 w-50 mx-auto">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success mt-3 w-50 mx-auto">{successMessage}</div>
        )}

        <div className="text-center position-absolute top-50 start-50 translate-middle w-100">
          <h1>{login ? "Welcome Back" : "Join Us"}</h1>
          <p>{login ? "Login to continue" : "Sign up to continue"}</p>

          <form className="align-items-center mt-4" onSubmit={login ? handleLogin : handleSignup}>
            {!login && (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <img className="loginpage-logo" src="person-fill.svg" alt="name" style={{ width: "24px" }} />
                <input
                  type="text"
                  name="fullname"
                  className="form-control w-50"
                  placeholder="Full Name"
                  value={addUser.fullname}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
              <img className="loginpage-logo" src="envelope-at-fill.svg" alt="email" style={{ width: "24px" }} />
              <input
                type="email"
                name="useremail"
                className="form-control w-50"
                placeholder="Email"
                value={addUser.useremail}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2 mt-3 position-relative">
              <img className="loginpage-logo" src="secure.svg" alt="password" style={{ width: "24px" }} />
              <input
                type={showPassword ? "text" : "password"}
                name="userpassword"
                className="form-control w-50 pe-5"
                placeholder="Password"
                value={addUser.userpassword}
                onChange={handleChange}
              />
              <img
                src={showPassword ? "eye-slash.svg" : "eye.svg"}
                alt="toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  width: "20px",
                  position: "absolute",
                  right: "24%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              />
            </div>

            <button className="btn btn-primary px-5 mt-4" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {login ? "Logging In..." : "Signing Up..."}
                </>
              ) : (
                login ? "Login" : "Sign Up"
              )}
            </button>

            {!login && (
              <p className="fst-italic mt-2" style={{ fontSize: "12px" }}>
                By continuing, you agree to our{" "}
               <Link to="/terms-and-conditions" className="text-light">Terms and Conditions</Link>
              </p>
            )}
          </form>

          <div className="border w-50 mx-auto my-4"></div>

          <p>
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="btn btn-link text-light fw-bold p-0 border-0"
              onClick={handleToggle}
            >
              {login ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
