import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import { AuthAction, logoutAction } from "../../../Redux/AuthReducer";

export function Header(): JSX.Element {

    const [isLogged, setLogged] = useState(false);
    const [userName, setName] = useState("");
    const navigate = useNavigate();

    function dispatch(arg0: AuthAction) {
        throw new Error("Function not implemented.");
    }

    return (
        <header className="Header">
            <div className="Header-logo">
                logo
            </div>
            <div className="Header-content">
                <h1 className="HeaderTitle">Queue Management System</h1>
                <p className="HeaderSubtitle">Efficiently manage your appointments and patients</p>
            </div>
            <div className="login">
                Hello {userName} <br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color={isLogged ? "error" : "primary"}
                        onClick={() => {
                            if (isLogged) {
                                sessionStorage.removeItem("jwt");
                                dispatch(logoutAction());
                                navigate("/login");
                            } else {
                                navigate("/login");
                            }
                        }}
                    >
                        {isLogged ? "Logout" : "Login"}
                    </Button>
                    {!isLogged && <Button color="success" onClick={() => navigate("/register")}>register</Button>}
                </ButtonGroup>
            </div>
        </header>
    );
}
