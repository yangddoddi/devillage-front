import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Root = () => {
  const useNavigate = useNavigate();

  useEffect(() => {
    useNavigate("/board/all");
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <div>Loading...</div>
    </div>
  );
};
