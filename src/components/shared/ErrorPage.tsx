import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  message: string;
};

function ErrorPage({ message }: Props) {
  const navigate = useNavigate();
  const [timerCount, setTimerCount] = useState(5);
  useEffect(() => {
    const counterID = setInterval(() => {
      setTimerCount((x) => x - 1);
    }, 1000);
    const redirectID = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => {
      clearTimeout(redirectID);
      clearInterval(counterID);
    };
  }, []);
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <p className="text-3xl font-bold">{message}</p>
      <p className="text-xl">
        Redirecting You Back To The Home Page In {timerCount}...
      </p>
    </div>
  );
}

export default ErrorPage;
