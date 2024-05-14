import React from "react";
import Sheet from "@mui/joy/Sheet";
import { Box, Button } from "@mui/material";
import { FormInputText } from "../../components/shared/formInputs/FormInputText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "aws-amplify";
import { NewPasswordFormValidation } from "../auth/validations/NewPassword";
import { useRouter } from "next/navigation";
import { errorMsg, successMsg } from "../shared/toastermsg";
const NewPassword = ({ userData }) => {
  const defaultValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const { control, formState, handleSubmit } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(
      NewPasswordFormValidation
    ) /*validation configure with  yup */,
  });

  const { errors } = formState;
  const router = useRouter();

  /*   Handle Submit */
  const onSubmit = async (data) => {
    const { confirmNewPassword: newPassword } = data;
    try {
      const setNewPassword = await Auth.completeNewPassword(
        userData,
        newPassword
      );

      if (setNewPassword.err) {
        errorMsg("Password not long enoug");
      } else {
        setTimeout(() => {
          router.push("/home");
        }, 1000);
        successMsg("you are successfully login");
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Sheet
          className=" border-stone-300 bg-white !bg-transparent mx-auto py-0.5 px-0.5 border-0 flex flex-col gap-3"
          variant="outlined"
        >
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
          <Box className="flex justify-between ">
            <Button
              type="submit"
              variant="contained"
              className="!bg-sky-800 !cursor-pointer"
            >
              Submit
            </Button>
          </Box>
        </Sheet>
      </form>
    </div>
  );
};

export default NewPassword;
