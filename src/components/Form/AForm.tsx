import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  childern: React.ReactNode;
  onSubmit: (data: any) => void;
}

const AForm = ({ childern, onSubmit }: IProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{childern}</form>
    </FormProvider>
  );
};

export default AForm;
