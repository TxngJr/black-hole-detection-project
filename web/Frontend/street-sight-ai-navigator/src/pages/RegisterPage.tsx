import { useEffect, useState } from "react";
import { registerApi } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";
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
import { getGovernmentApi } from "../services/government.service";
import { IGovernment } from "../interfaces/government.interface";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function RegisterPage() {
  const [listGovernments, setListGovernments] = useState<IGovernment[]>();
  const [isNewGovernment, setIsNewGovernment] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let government;
    if (isNewGovernment) {
      if ((data.get("create-government")! as string).length < 10) {
        setMessage("Government must be at least 10 characters");
        setTimeout(() => setMessage(undefined), 3000);
        return;
      }
      government = data.get("create-government")! as string;
    } else {
      government = data.get("government")! as string;
    }
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
    if (data.get("password") !== data.get("confirmPassword")) {
      setMessage("Password not match");
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    const response: ApiResponse<IUser> = await registerApi({
      username: data.get("username")! as string,
      government,
      password: data.get("password")! as string,
    });
    if (!response.status) {
      setMessage(response.message);
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    return navigate("/login");
  };

  const handleChange = (event: SelectChangeEvent) => {
    event.target.value === "create"
      ? setIsNewGovernment(true)
      : setIsNewGovernment(false);
  };

  useEffect(() => {
    const fetchGovernments = async () => {
      const response: ApiResponse<IGovernment> = await getGovernmentApi();
      if (!response.status) {
        return setMessage(response.data.message);
      }
      setListGovernments(response.data);
      setTimeout(fetchGovernments, 3000);
    };
    fetchGovernments();
  }, []);

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
            marginX: 0.5,
            marginY: 1.5,
          },
          "@media (min-width:871px)": {
            marginX: 1,
            marginY: 2,
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
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="government">Government</InputLabel>
                <Select
                  name="government"
                  labelId="government"
                  id="government"
                  label="government"
                  onChange={handleChange}
                >
                  {listGovernments?.map((government: IGovernment) =>
                    government.name === "superAdmin" ? null : (
                      <MenuItem key={government._id} value={government._id}>
                        {government.name}
                      </MenuItem>
                    )
                  )}
                  <MenuItem value={"create"}>create Government</MenuItem>
                </Select>
              </FormControl>
              {isNewGovernment && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="create-government"
                  label="government"
                  name="create-government"
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                Sign up
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
                  Already have an account?
                </Typography>
                <Link href="/login" variant="body2">
                  Sign in
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

export default RegisterPage;
