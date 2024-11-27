import { useContext } from "react";
import CallingContext from "./CallingContext";

const useCalling = () => {
  const context = useContext(CallingContext);

  if (!context) {
    throw new Error("useCalling must be used within an AuthProvider");
  }

  return context;
};

export default useCalling;
