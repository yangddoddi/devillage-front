import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Root = () => {
  const useNavigate = useNavigate();

  useEffect(() => {
    useNavigate("/board/all");
  }, []);

  return (
    <div>
      <h1>Root</h1>
    </div>
  );
};
