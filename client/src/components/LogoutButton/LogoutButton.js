import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <LogoutIcon
      variant="contained"
      color="primary"
      fontSize="large"
      onClick={() => logout({ returnTo: window.location.origin })}
    />
  );
};

export default LogOutButton;
