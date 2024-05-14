"use client";

import React from "react";
import Sheet from "@mui/joy/Sheet";
import { Box, Button, Typography } from "@mui/material";
import { FormInputText } from "../shared/formInputs/FormInputText";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { errorMsg, successMsg } from "../toastermsg";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  sendCodeforgotPasswordAWS,
} from "../../app/store/action/loginAction";

const NewPassword = ({ userEmail }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const ForgotPasswordFormValidation = yup.object().shape({
    code: yup.string().required("You must enter a code"),
    newPassword: yup
      .string()
      .required("New Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
      ),
    confirmNewPassword: yup
      .string()
      .label("confirm password")
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });
  const defaultValues = {
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const { control, formState, handleSubmit } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(ForgotPasswordFormValidation),
  });

  const { errors } = formState;

  /// change password
  const onSubmit = async (data) => {
    const { code, confirmNewPassword } = data;
    try {
      const response = await dispatch(
        forgetPassword({
          email: userEmail,
          code,
          newPassword: confirmNewPassword,
        }),
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        setTimeout(() => {
          router.push("/login");
          successMsg("Password Updated Successfully");
        }, 1000);
      } else {
        errorMsg(error);
      }
    } catch (e) {
      errorMsg(e.message);
    }
  };

  const sendOTPHandler = async () => {
    try {
      const response = await dispatch(
        sendCodeforgotPasswordAWS({ email: userEmail }),
      );

      if (response?.meta?.requestStatus === "fulfilled") {
        successMsg(`Code has been sent to email ${userEmail}`);
      } else {
        errorMsg(error);
      }
    } catch (error) {
      errorMsg(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form flex">
        <Sheet
          className="login-form-wrapper bg-white !bg-transparent w-2/4 mx-auto my-10 py-0.5 px-0.5 border-0 flex flex-col gap-3"
          variant="outlined"
        >
          <FormInputText
            name="code"
            label=""
            control={control}
            errors={errors}
            adornmentTextStart={"Code*"}
            adornmentTextStartClassName="sup-input-name reset-sup"
            placeholder="Enter Code"
          />

          <FormInputText
            name="newPassword"
            label=""
            control={control}
            errors={errors}
            adornmentTextStart={"New Password*"}
            adornmentTextStartClassName="sup-input-name reset-sup"
            placeholder="Enter New Password"
            inputType={"password"}
          />

          <FormInputText
            name="confirmNewPassword"
            label=""
            control={control}
            errors={errors}
            adornmentTextStart={"Confirm Password*"}
            adornmentTextStartClassName="sup-input-name reset-sup"
            placeholder="Enter Confirm Password"
            inputType={"password"}
          />
          <Box className="flex justify-between">
            <Box className="flex justify-between w-1/3">
              <Button
                type="submit"
                variant="contained"
                className="bg-sky-800 !cursor-pointer"
              >
                Submit
              </Button>
              <Typography
                onClick={sendOTPHandler}
                className="text-sky-900 cursor-pointer hover:underline pt-1.5 font-semibold"
              >
                Resed Code
              </Typography>
            </Box>

            <Typography
              className="text-sky-900 cursor-pointer hover:underline font-semibold"
              onClick={() => router.push("/login")}
            >
              Go to Sign-in
            </Typography>
          </Box>
        </Sheet>
      </form>
    </div>
  );
};

export default NewPassword;
