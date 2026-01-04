import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const Add = () => {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/form/create");
  };
  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<AddIcon />}
      onClick={handle}
    >
      Add
    </Button>
  );
};

export default Add;
