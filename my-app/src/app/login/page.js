"use client";
import { Button, Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/shared/formInputs/FormInputText";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "aws-amplify";
import { errorMsg, successMsg } from "@/components/shared/toastermsg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewPasswordModal from "@/components/auth/NewPasswordModal";
const LoginPage = () => {
  const router = useRouter();
  const [newPasswordModal, setNewPasswordModal] = useState(false);
  const [userData, setUserData] = useState();
  const defaultValues = {
    email: "",
    password: "",
  };

  const LoginSchema = yup.object().shape({
    email: yup.string().required(),
  });

  const { control, formState, handleSubmit, errors } = useForm({
    mode: "all",
    defaultValues,
    // resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await Auth.signIn(email, password);
      if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
        alert("new password is required");
        setUserData(response);
        setNewPasswordModal(true);
      } else {
        localStorage.setItem("userData", JSON.stringify(response));
        router.push("/home");
        successMsg("Logged in successfully!");
      }
    } catch (error) {
      console.log("error", error);
      errorMsg(error.message);
      throw error;
    }
  };

  const newPassModalOpenHandlerClose = () => {
    setNewPasswordModal(false);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInputText
                  name="email"
                  label="Email"
                  control={control}
                  errors={errors}
                  placeholder={"joh@example.com"}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputText
                  name="password"
                  label="Password"
                  control={control}
                  errors={errors}
                  inputType={"password"}
                  placeholder={"*******"}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <NewPasswordModal
        open={newPasswordModal}
        close={newPassModalOpenHandlerClose}
        userData={userData}
      />
    </>
  );
};

export default LoginPage;
