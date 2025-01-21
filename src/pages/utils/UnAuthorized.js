import React from "react";
import img from "./img.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
const UnAuthorized = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-12 py-8">
        <img src={img} alt="unauth" className="w-[20%]" />

        <div class="flex flex-col items-center gap-4">
          <h1 class="text-3xl font-medium text-center">
            You are not authorized
          </h1>
          <p class="text-xl text-center ">
            You tried to access a page you did not have prior authorization for.
          </p>
        </div>
        <Button className="py-2" onClick={() => navigateTo("/sign-in")}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default UnAuthorized;
