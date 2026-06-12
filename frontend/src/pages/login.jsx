import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  navigate("/dashboard");
};

  return (
    <div>
      <h1>Login Page</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
       Login</button>

      <h3>Email: {email}</h3>
      <h3>Password: {password}</h3>
    </div>
  );
}

export default Login;