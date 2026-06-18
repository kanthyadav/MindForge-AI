import { useState } from "react";
import API from "../services/api";

function Register({
  setToken,
  setIsLogin,
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.post(
            "/auth/register",
            {
              name,
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        setToken(
          res.data.token
        );

        alert(
          "Registration Successful"
        );
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <form
          onSubmit={
            handleRegister
          }
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
          >
            Register
          </button>
        </form>

        <p>
          Already have an
          account?{" "}
          <span
            onClick={() =>
              setIsLogin(
                true
              )
            }
            style={{
              cursor:
                "pointer",
              color:
                "#60a5fa",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;