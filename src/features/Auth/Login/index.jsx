import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, Typography, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputField from "../../../components/FormControls/InputField";
import PasswordField from "../../../components/FormControls/PasswordField";
import useWindowDimensions from "../../../customHook/WindowDimensions";
import { login } from "../userSlice";

import jwtDecode from "jwt-decode";
import StorageKeys from "../../../constants/storage-keys";
import { useNavigate,useLocation } from "react-router-dom";
import "./index.scss";
import images from "../../../assets/images";
import axios from 'axios'

Login.propTypes = {};

function Login(props) {
  const location = useLocation();
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup
    .object()
    .shape({
      user_name: yup
        .string()
        .required("Please enter your username")
        .test(
          "should has at least 5 characters",
          "Please enter at least 5 characters ",
          (values) => {
            return values.length >= 5;
          }
        ),
      password: yup
        .string()
        .required("Please enter your password")
        .min(6, "Please enter at least 6 characters"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      user_name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      
      const resultAction = dispatch(action);
      console.log(resultAction);
      unwrapResult(resultAction);

      enqueueSnackbar("Logged in successfully", { variant: "success" });
      setTimeout(() => {
        if (location.pathname === "/login") navigate("/home");
        else document.location.reload();
      }, 1000);
    } catch (e) {

      enqueueSnackbar(e.message, { variant: "error" });
    }
  };
  const handleSuccess = (credentialResponse) => {
    // Xử lý kết quả đăng nhập thành công

    localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(credentialResponse.credential));
    let tok = localStorage.getItem(StorageKeys.TOKEN);
    const UserGoogle = jwtDecode(credentialResponse.credential);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(UserGoogle));
    if (!tok) {
      return;
    }
    enqueueSnackbar("Logged in successfully", { variant: "success" });
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const handleFailure = (response) => {
    console.log(response);
    // Xử lý kết quả đăng nhập thất bại ở đây
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: "1 1",
          padding: "0 10px 0 15px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <InputField label='User name or gmail ' name='user_name' form={form} />
          <PasswordField label='Password' form={form} name='password' />

          <Button
            size='large'
            sx={{ marginTop: 1, color: "#fff", backgroundColor: "#3A4BE0" }}
            type='submit'
          >
            Log in
          </Button>
        </form>

        <Box sx={{ textAlign: "center", marginTop: "26px" }}>
          <Link href='/forgot' underline='hover' color='#000' fontWeight='600'>
            Forgotten password?
          </Link>
          <Link href='/register'>
            <Button
              size='large'
              sx={{
                marginTop: 1,
                color: "#fff",
                backgroundColor: "#7BD15D",
                width: "100%",
              }}
              type='submit'
            >
              Create a new account
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
