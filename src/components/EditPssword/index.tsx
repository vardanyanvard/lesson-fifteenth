import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IUpdatePassword } from "../../lib/types";
import { handleUpdatePassword } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object({
  old: yup
    .string()
    .required("Login is required")
    .min(5, "Login must be at least 5 characters long"),
  newpwd: yup
    .string()
    .required("Login is required")
    .min(5, "Login must be at least 5 characters long"),
});

export const EditPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [editPass, setEditPass] = useState<IUpdatePassword>({
    old: "",
    newpwd: "",
  });

  const onSubmit = () => {
    handleUpdatePassword(editPass).then((response) => {
      toast("success");
      reset({
        old: "",
        newpwd: "",
      });
    });
  };

  return (
    <div className="editPasswordComponenet">
      <p>Edit Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.old && <p>{errors.old.message}</p>}
        <input
          type="text"
          placeholder="old password"
          value={editPass.old}
          {...register("old")}
          onChange={(e) => setEditPass({ ...editPass, old: e.target.value })}
        />
        {errors.newpwd && <p>{errors.newpwd.message}</p>}

        <input
          type="text"
          placeholder="new password"
          value={editPass.newpwd}
          {...register("newpwd")}
          onChange={(e) => setEditPass({ ...editPass, newpwd: e.target.value })}
        />
        <button>Save</button>
      </form>
    </div>
  );
};
