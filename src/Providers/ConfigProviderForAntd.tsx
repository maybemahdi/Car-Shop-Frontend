import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const ConfigProviderForAntd = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E53E29", // Set your primary color here
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderForAntd;
