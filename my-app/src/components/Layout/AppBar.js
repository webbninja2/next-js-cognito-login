import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { successMsg } from "../shared/toastermsg";
import { Button } from "@mui/material";

function HeaderTopBar() {
  const [signOut, setSignOut] = React.useState(true);
  const [userName, setUserName] = React.useState();
  const router = useRouter();

  React.useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userData") || "{}");

    if (Object.keys(userDetails).length > 0) {
      setUserName(userDetails.attributes.email);
    } else {
      setSignOut(false);
    }
  }, [userName, router]);

  console.log("userName", userName);

  ///sign out Handler
  const signOutHandler = () => {
    setTimeout(() => {
      localStorage.removeItem("userData");
      successMsg("You have signed out successfully!");
    }, 1000),
      router.push("/login");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" className="px-9 py-2	">
        <Box
          className="topBarOuter flex py-0.5"
          sx={{ display: "flex", justifyContent: "space-between" }} // Add this line
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href="/"> Cognito</Link>
          </Typography>

          {signOut ? (
            <>
              <Typography
                variant="h6"
                component="div"
                className="text-right"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  marginLeft: "auto", // Align to the right
                }}
              >
                Welcome:{userName}
                <Button variant="contained" onClick={signOutHandler}>
                  Sign Out
                </Button>
              </Typography>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}

export default HeaderTopBar;
