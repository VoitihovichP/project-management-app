import React from 'react';
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { RegistrationFormInputs } from '../../types/types';

export const InputForm: React.FC<{
  control: Control<RegistrationFormInputs>;
  name: string;
  label: string;
  errorMessage: string;
  maxLength: number;
  minLength: number;
  defaultValue: string;
}> = ({ control, name, label, errorMessage, maxLength, minLength, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          id="outlined-basic"
          className="authorization-form__item"
          label={label}
          variant="outlined"
          autoComplete="off"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error && (error.message || errorMessage)}
        />
      )}
      rules={{
        required: 'Поле должно быть заполнено',
        maxLength: maxLength,
        minLength: minLength,
      }}
    />
  );
};
