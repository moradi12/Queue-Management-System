import { useNavigate } from "react-router-dom";
import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginAction } from "../../../Redux/AuthReducer";
import { notify } from "../../../Utils/notif";
import { Button, ButtonGroup, Checkbox, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Store } from "../../../Redux/Store";
import { UserType } from "../../../Models/UserType"; // Importing the UserType enum
import axiosJWT from "../../../Utils/axiosJWT";
import { jwtDecode } from "jwt-decode"; // Corrected import

type userLoginData = {
    userEmail: string;
    userPass: string;
    userType: UserType;
    userRemember: boolean;
}

type jwtData = {
    id: number;
    userType: UserType;
    userName: string;
    sub: string;
    iat: number;
    exp: number;
}

export function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<userLoginData>();

    const makeLogin: SubmitHandler<userLoginData> = async (data) => {
        try {
            const userDetails = {
                email: data.userEmail,
                password: data.userPass,
                userType: data.userType.toUpperCase()
            };

            console.log("Attempting login with user details:", userDetails);

            const res = await axiosJWT.post("http://localhost:8080/auth/login", userDetails);
            const JWT = res.headers["authorization"].split(" ")[1];

            console.log("Received JWT:", JWT);

            const decoded_jwt = jwtDecode<jwtData>(JWT);
            console.log("Decoded JWT:", decoded_jwt);

            const myAuth = {
                id: decoded_jwt.id,
                name: decoded_jwt.userName,
                email: decoded_jwt.sub,
                token: JWT,
                userType: decoded_jwt.userType,
                isLogged: true
            };

            Store.dispatch(loginAction(myAuth));

            // Save token to sessionStorage or localStorage based on userRemember
            if (data.userRemember) {
                localStorage.setItem("jwt", JWT);
                console.log("JWT saved to localStorage");
            } else {
                sessionStorage.setItem("jwt", JWT);
                console.log("JWT saved to sessionStorage");
            }

            notify.success("Welcome back");
            navigate("/add"); // Use relative path for redirection
        } catch (err) {
            console.error("Login error:", err);
            notify.error("Bad user or password!");
        }
    };

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(makeLogin)}>
                <Typography variant="h4" className="HeadLine">User Login</Typography>
                <hr />
                <TextField
                    label="User Email"
                    variant="outlined"
                    {...register("userEmail", { required: "Email is required" })}
                    error={!!errors.userEmail}
                    helperText={errors.userEmail?.message}
                /><br /><br />
                <TextField
                    label="User Password"
                    variant="outlined"
                    type="password"
                    {...register("userPass", { required: "Password is required" })}
                    error={!!errors.userPass}
                    helperText={errors.userPass?.message}
                /><br /><br />
                <Select fullWidth {...register("userType")} defaultValue={UserType.PATIENT}>
                    <MenuItem value={UserType.PATIENT}>Patient</MenuItem>
                    <MenuItem value={UserType.ADMIN}>Admin</MenuItem>
                </Select>
                <br />
                <Checkbox {...register("userRemember")} /> Remember me
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="success" style={{ marginRight: 10 }}>Login</Button>
                    <Button color="error" onClick={() => navigate("/")}>Cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
