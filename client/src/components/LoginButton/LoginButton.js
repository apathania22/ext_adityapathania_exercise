import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <LoginIcon
      variant="contained"
      color="primary"
      fontSize="large"
      onClick={() => loginWithRedirect()}
    />
  );
};

export default LoginButton;
