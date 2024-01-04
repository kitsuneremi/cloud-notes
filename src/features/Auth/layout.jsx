import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, Typography, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputField from "./../../components/FormControls/InputField";
import PasswordField from "./../../components/FormControls/PasswordField";
import useWindowDimensions from "./../../customHook/WindowDimensions";
import { login } from "./userSlice";

import jwtDecode from "jwt-decode";
import StorageKeys from "./../../constants/storage-keys";
import { useNavigate,useLocation } from "react-router-dom";
import "./Login/index.scss";
import images from "./../../assets/images";
import Login from './Login'
import Register from './Register';
import Forgot from './Forgot';
export default function AuthLayout() {
    const location = useLocation();
    
    return (
        <>
            <div className='container'>
                <div className='navbar'>
                    <a href='' style={{ display: "flex" }}>
                        <img className='logo' src={images.logo} />
                        <h2>SAMNOTE</h2>
                    </a>
                    <ul className='navbar-list-item'>
                        <li>
                            <a href=''>ABOUT SAMNOTE</a>
                        </li>
                        <li>
                            <a href='/feature'>FEATURE</a>
                        </li>
                        <li>
                            <a href=''>FOR INDIVIDUAL</a>
                        </li>
                        <li>
                            <a href=''>FOR GROUP</a>{" "}
                        </li>
                        <li>
                            <a href='/help'>HELP</a>
                        </li>
                    </ul>
                    <Button
                        sx={{
                            color: "#000",
                            fontSize: "0.9rem",
                            marginLeft: "2px",
                            ml: "1.8rem",
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                    >
                        Sign in
                    </Button>
                    <Button
                        sx={{
                            height: "35px",
                            color: "#3A4BE0",
                            fontSize: "0.9rem",
                            border: "1px solid #3A4BE0",
                            borderRadius: "12px",
                            ml: "1.6rem",
                            mt: "7px",
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                    >
                        Download
                    </Button>
                </div>
            </div>
            <Box
                sx={{
                    height: "600px",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${images.bgrLogin})`,
                }}
            >
                <Box height='100%'>
                    <Grid
                        container
                        item
                        xs={12}
                        spacing={2}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Grid
                            item
                            xs={6}
                            sx={{
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "68%",
                                    display: "flex",
                                }}
                            >
                                <img
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        marginRight: "8px",
                                    }}
                                    src={images.logo}
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontSize: "2rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        SAMNOTE
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontSize: "1.8rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Create Free Notes, Calendar Reminders, Group Chat, Share Notes With AI
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6} direction='row' justifyContent='center' alignItems='stretch'>
                            <Box
                                sx={{
                                    width: "70%",
                                    minWidth: "400px",
                                    maxWidth: "1500px",
                                    maxHeight: "615px",
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "10px 35px",
                                    overflow: "hidden auto",
                                }}
                                className='box-container'
                            >

                                {location.pathname == "/login" ? <Login /> : location.pathname == "/register" ? <Register /> : <Forgot />}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 200px",
                    alignItems: "center",
                }}
            >
                <Box display='flex' alignItems='center'>
                    <img className='logo' src={images.logo} />
                    <Typography
                        sx={{
                            fontSize: "1.3rem",
                            fontWeight: "500",
                        }}
                    >
                        SAMNOTE
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "1.2rem",
                        fontWeight: "550",
                    }}
                >
                    Now we have mobile version for this app
                </Typography>
                <Button
                    sx={{
                        height: "35px",
                        color: "#3A4BE0",
                        fontSize: "0.9rem",
                        border: "1px solid #3A4BE0",
                        borderRadius: "12px",
                        mt: "7px",
                        "&:hover": {
                            background: "transparent",
                        },
                    }}
                >
                    Download
                </Button>
            </Box>
        </>
    )
}