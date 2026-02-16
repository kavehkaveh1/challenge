import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import type { FormItem } from "../../Pages/DataTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";

type PropsType = {
  item: FormItem;
};

const ViewModal = ({ item }: PropsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="small"
        startIcon={<VisibilityIcon />}
      >
        View
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: {
              xs: "1.5rem",
              sm: "3rem",
              md: "4.5rem",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "300px",
                sm: "400px",
                md: "450px",
              },
              height: "170px",
              border: "2px solid gray",
              borderRadius: "15px",
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingLeft: "10px",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ display: "flex", gap: "2.9rem" }}>
              <Box fontWeight={"bold"}>FirstName : </Box>
              <Box>{item.FirstName}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "3rem" }}>
              <Box fontWeight={"bold"}>LastName :</Box>
              <Box>{item.LastName}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "5.8rem" }}>
              <Box fontWeight={"bold"}>age :</Box> <Box>{item.age}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "4.5rem" }}>
              <Box fontWeight={"bold"}>gender :</Box> <Box>{item.gender}</Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: {
                xs: "300px",
                sm: "400px",
                md: "450px",
              },
              height: "170px",
              border: "2px solid gray",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingLeft: "10px",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ display: "flex", gap: "3.5rem" }}>
              <Box fontWeight={"bold"}>birthdate :</Box>
              <Box>{item.birthdate}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "4.3rem" }}>
              <Box fontWeight={"bold"}>country :</Box> <Box>{item.country}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "6rem" }}>
              <Box fontWeight={"bold"}>city :</Box> <Box>{item.city} </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "6.1rem" }}>
              <Box fontWeight={"bold"}>job :</Box> <Box>{item.job}</Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: {
                xs: "300px",
                sm: "400px",
                md: "450px",
              },
              height: "140px",
              border: "2px solid gray",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingLeft: "10px",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ display: "flex", gap: "1.6rem" }}>
              <Box fontWeight={"bold"}>PhoneNumber :</Box>
              <Box>{item.PhoneNumber}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "3.7rem" }}>
              <Box fontWeight={"bold"}>workType :</Box>
              <Box>{item.workType}</Box>
            </Box>
            <Box sx={{ display: "flex", gap: "3.3rem" }}>
              <Box fontWeight={"bold"}>description :</Box>
              <Box>{item.description}</Box>
            </Box>
          </Box>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            size="small"
            onClick={handleClose}
          >
            Back
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewModal;
