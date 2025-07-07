import { useState } from "react";

export default function LoginPage() {
    const [login, setLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)
    const [addUser, setAddUser] = useState({
        fullname: "",
        useremail: "",
        userpassword: ""
        });
        
        const handleChange = (e) => {
        const { name, value } = e.target;
        setAddUser((prev) => ({
            ...prev,
            [name]: value
        }));
        };


const handleSignup = async (e) => {
  e.preventDefault();

  const { fullname, useremail, userpassword } = addUser;

  if (!fullname || !useremail || !userpassword) {
    alert("All fields are required");
    return;
  }

  try {
    const response = await fetch(
      "https://task-management-backend-brown.vercel.app/v1/signup/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addUser),
      }
    );

    const result = await response.json();

    if (response.ok) {
  setShowSuccess(true);
  setAddUser({
    fullname: "",
    useremail: "",
    userpassword: ""
  });

  setTimeout(() => setShowSuccess(false), 3000); 
} else {
      alert(result?.error || "Signup failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong during signup");
  }
};


    return (
        <div className="login-page d-flex position-relative overflow-hidden" style={{ minHeight: "100vh" }}>
            <div
                className={`bg-dark w-50 py-5 text-light position-absolute transition-side`}
                style={{
                    minHeight: "100vh",
                    transform: login ? "translateX(100%)" : "translateX(0%)",
                    borderBottomRightRadius: login ? "0.5rem" : "0.5rem",
                    borderTopLeftRadius: login ? "0.5rem" : "0",
                    borderTopRightRadius: login ? "0" : "0.5rem",
                    borderBottomLeftRadius: login ? "0.5rem" : "0"
                }}
            >
                {showSuccess && (
                        <div className="alert alert-success mt-3 w-50 mx-auto">
                            User created successfully!
                        </div>
                        )}
                <div className="text-center position-absolute top-50 start-50 translate-middle w-100">
                    <h1>{login ? "Welcome Back" : "Join Us"}</h1>
                    <p>{login ? "Login to continue" : "Sign up to continue"}</p>

                    <form className="align-items-center mt-4" onSubmit={handleSignup}>

                        {/* Name Field */}
                        {!login && (
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <img className="loginpage-logo"
                                    src="person-fill.svg"
                                    alt="name"
                                    style={{ width: "24px", height: "24px" }}
                                />
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

                        {/* Email Field */}
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                            <img className="loginpage-logo"
                                src="envelope-at-fill.svg"
                                alt="email"
                                style={{ width: "24px", height: "24px" }}
                            />
                            <input
                                type="email"
                                name="useremail"
                                className="form-control w-50"
                                placeholder="Email"
                                value={addUser.useremail}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-3 position-relative">
                            <img className="loginpage-logo"
                                src="secure.svg"
                                alt="password"
                                style={{ width: "24px", height: "24px" }}
                            />
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
                                alt="toggle visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    position: "absolute",
                                    right: "24%",
                                    top: "51%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer"
                                }}
                            />
                        </div>

                        {/* Button */}
                        <button className="btn btn-primary px-5 mt-4" type="submit">
                            {login ? "Login" : "Sign Up"}
                        </button>

                        {/* Terms (only for Sign Up) */}
                        {!login && (
                            <p className="fst-italic mt-2" style={{ fontSize: "12px" }}>
                                By continuing with email, you agree to our{" "}
                                <a className="text-light" href="#">
                                    Terms and Conditions
                                </a>.
                            </p>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="border w-50 mx-auto my-4"></div>

                    {/* Toggle Auth Link */}
                    {login ? (
                        <p>
                            Don't have an account?{" "}
                            <a
                                className="text-light fw-bold"
                                href="#"
                                onClick={() => setLogin(false)}
                            >
                                Sign Up
                            </a>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <a
                                className="text-light fw-bold"
                                href="#"
                                onClick={() => setLogin(true)}
                            >
                                Login
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
