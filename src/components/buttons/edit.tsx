import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
type PropsType = {
  id: number;
};
const Edit = ({ id }: PropsType) => {
  const navigate = useNavigate();
  const handle = () => {
    navigate(`/form/edit/${id}`);
  };
  return (
    <Button
      variant="contained"
      startIcon={<EditIcon />}
      size="small"
      onClick={handle}
    >
      Edit
    </Button>
  );
};

export default Edit;
