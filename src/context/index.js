import CallingProvider from "./CallingContext/CallingProvider";

const AppProviders = ({ children }) => {
  return <CallingProvider>{children}</CallingProvider>;
};

export default AppProviders;
