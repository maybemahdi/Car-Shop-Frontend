/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"; 
import { FormProvider, useForm } from "react-hook-form";

import { ConfigProvider } from "antd";
import { cn } from "../../../../lib/utils";

const MyFormWrapper = ({
  onSubmit,
  className,
  children,
  defaultValues,
  resolver,
}: {
  onSubmit: (data: any, reset: () => void) => void;
  className?: string;
  children: React.ReactNode;
  defaultValues?: any;
  resolver?: import("react-hook-form").Resolver<any, any>;
}) => {
  const formConfig: Record<string, any> = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit = (data: any) => {
    onSubmit(data, reset); // Pass reset function to onSubmit
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            hoverBorderColor: "#2078e0",
            activeBorderColor: "#2078e0",
          },
          Input: {
            hoverBorderColor: "#2078e0",
            activeBorderColor: "#2078e0",
          },
          Checkbox: {
            colorBorder: "#2078e0",
            colorPrimary: "#2078e0",
            colorPrimaryHover: "#2078e0",
          },
          DatePicker: {
            // colorPrimary: "#2078e0",
            // colorPrimaryHover: "#2078e0",
            // colorBorder: "#2078e0",
            // colorText: "#2078e0",
            // colorTextDisabled: "#2078e0",
          },
        },
      }}
    >
      <FormProvider {...methods}>
        <form className={cn("", className)} onSubmit={handleSubmit(submit)}>
          {children}
        </form>
      </FormProvider>
    </ConfigProvider>
  );
};

export default MyFormWrapper;
