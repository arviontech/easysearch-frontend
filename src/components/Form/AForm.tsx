import type React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps<T = Record<string, unknown>> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
}

const AForm = <T extends Record<string, unknown> = Record<string, unknown>>({
  children,
  onSubmit,
}: IProps<T>) => {
  const methods = useForm<T>();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default AForm;
