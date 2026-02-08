import { Button } from "@mui/material";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  nav: string;
  text: string;
  icon: JSX.Element;
};
const Buttons = ({ nav, text, icon }: PropsType) => {
  const navigate = useNavigate();
  const handle = () => {
    navigate(nav);
  };
  return (
    <Button variant="contained" startIcon={icon} size="small" onClick={handle}>
      {text}
    </Button>
  );
};
export default Buttons;
