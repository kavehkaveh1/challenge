import { Box, Button, Stack } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "220px",
    sm: "400px",
  },
  bgcolor: "#f6f7f3f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Popup = ({ isOpen, onClose, onConfrim }: Props) => {
  if (!isOpen) return null;
  return (
    <Box sx={style}>
      <Stack direction={"column"} spacing={3}>
        <p>are you sure you want to delete?</p>
        <Stack direction={"row"} spacing={4}>
          <Button
            variant={"contained"}
            size="small"
            onClick={onClose}
            startIcon={<CancelIcon />}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteForeverIcon />}
            size="small"
            onClick={onConfrim}
          >
            Yes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Popup;
