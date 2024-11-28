import CallingProvider from "./CallingContext/CallingProvider";
import MainProvider from "./Main/MainProvider";

const AppProviders = ({ children }) => {
  return (
    <MainProvider>
      <CallingProvider>{children}</CallingProvider>
    </MainProvider>
  );
};

export default AppProviders;
