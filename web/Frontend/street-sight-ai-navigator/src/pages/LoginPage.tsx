import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { loginApi } from "../services/user.service";
import { IUser, UserStatus } from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";
import jivtImage from "../assets/images/jivt.png";
import utcImage from "../assets/images/utc.png";
import ctImage from "../assets/images/ct.png";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

function LoginPage() {
  const { user, saveUser } = useContext(AuthContext);
  const [message, setMessage] = useState<string>();

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if ((data.get("username")! as string).length < 8) {
      setMessage("Username must be at least 8 characters");
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    if ((data.get("password")! as string).length < 8) {
      setMessage("Password must be at least 8 characters");
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    const response: ApiResponse<IUser> = await loginApi({
      username: data.get("username")! as string,
      password: data.get("password")! as string,
    });
    if (!response.status) {
      setMessage(response.data.message);
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    saveUser(response.data.token);
    if (user?.status === UserStatus.INACTIVE) {
      return navigate("/wait-active");
    }
    return navigate("/home");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
      }}
    >
      {message && (
        <Alert
          severity="warning"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          {message}
        </Alert>
      )}
      <Box
        sx={{
          "@media (min-width:0px) and (max-width:870px)": {
            marginX: 1,
            marginY: 5,
          },
          "@media (min-width:871px)": {
            marginX: 2,
            marginY: 10,
          },
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: "bold",
            "@media (min-width:0px) and (max-width:870px)": {
              fontSize: "2.5rem",
            },
            "@media (min-width:871px)": {
              fontSize: "4.5rem",
            },
          }}
        >
          StreetSight AI Navigator
        </Typography>
      </Box>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                Sign In
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 3,
                  mb: 2,
                }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    marginRight: "2%",
                  }}
                >
                  Don't have an account?
                </Typography>
                <Link href="/register" variant="body2">
                  Sign Up
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            padding: "1%",
          }}
        >
          <Avatar
            src={jivtImage}
            alt="../assets/images/jivt.png"
            sx={{
              marginRight: "20px",
              "@media (min-width:0px) and (max-width:600px)": {
                width: 60,
                height: 60,
              },
              "@media (min-width:601px)": {
                width: 100,
                height: 100,
              },
            }}
          />
          <Avatar
            src={utcImage}
            alt="../assets/images/jivt.png"
            sx={{
              marginRight: "20px",
              "@media (min-width:0px) and (max-width:600px)": {
                width: 60,
                height: 60,
              },
              "@media (min-width:601px)": {
                width: 100,
                height: 100,
              },
            }}
          />
          <Avatar
            src={ctImage}
            alt="../assets/images/jivt.png"
            sx={{
              marginRight: "20px",
              "@media (min-width:0px) and (max-width:600px)": {
                width: 60,
                height: 60,
              },
              "@media (min-width:601px)": {
                width: 100,
                height: 100,
              },
            }}
          />
          <Box
            sx={{
              pb: 3,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                width: "100%",
                fontWeight: "bold",
                "@media (min-width:0px) and (max-width:870px)": {
                  fontSize: "1rem",
                },
                "@media (min-width:871px)": {
                  fontSize: "1.8rem",
                },
              }}
            >
              แผนกวิชาเทคโนโลยีคอมพิวเตอร์ วิทยาลัยเทคนิคอุบลราชธานี
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default LoginPage;
