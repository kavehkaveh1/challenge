import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
type PropsType = {
  id: number;
};
const View = ({ id }: PropsType) => {
  const navigate = useNavigate();
  const handle = () => {
    navigate(`/form/view/${id}`);
  };
  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<VisibilityIcon />}
      onClick={handle}
    >
      View
    </Button>
  );
};

export default View;
