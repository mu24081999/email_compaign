import CallingProvider from "./CallingContext/CallingProvider";
import MainProvider from "./Main/MainProvider";
import SocketProvider from "./SocketContext/SocketProvider";

const AppProviders = ({ children }) => {
  return (
    <MainProvider>
      <CallingProvider>
        <SocketProvider>{children}</SocketProvider>
      </CallingProvider>
    </MainProvider>
  );
};

export default AppProviders;
