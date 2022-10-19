import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Root = () => {
  const navi = useNavigate();

  useEffect(() => {
    navi("/borad/all");
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <div>Loading...</div>
    </div>
  );
};
