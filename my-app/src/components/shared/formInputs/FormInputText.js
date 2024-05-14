"use client";
import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const FormInputText = ({
  name,
  control,
  label,
  className,
  errors,
  inputType,
  required,

  placeholder,
  disable,
}) => {
  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            required={required}
            className={`${className} inputOuter`}
            error={!!errors?.[name]}
            type={inputType ? inputType : "text"}
            helperText={errors?.[name]?.message}
            fullWidth
            label={label}
            variant="outlined"
            placeholder={placeholder}
            disabled={disable ? disable : false}
            inputlabelprops={{ shrink: true }}
          />
        )}
      />
    </div>
  );
};
