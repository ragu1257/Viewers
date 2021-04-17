import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';

export const QuestionRound = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) =>{
    console.log("data after form submit",data);
  }
  return (
    <div>
      <form onSubmit= {handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor='username' id="usernameLabel">Username</label>
          <TextField
            className="form-control"
            type="text"
            name="username"
            {...register("username")}
            required
          />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <label htmlFor='password' id="passwordLabel">Password</label>
          <TextField
            className="form-control"
            type="password"
            name="password"

            {...register("password")}
            required
          />
          <div className="error" id="passwordError" />
        </div>
        <div className="form-group">
          <label htmlFor='passwordConfirm' id="passwordConfirmLabel">Confirm Password</label>
          <TextField
            className="form-control"
            type="password"
            name="passwordConfirm"

            {...register("confirmusername")}
            required
          />
          <div className="error" id="passwordConfirmError" />
        </div>
        <button type="submit" className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};
