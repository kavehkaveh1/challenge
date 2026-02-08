import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showError } from "../components/toaster";
import type { FormItem } from "./DataTable";
import Buttons from "../components/buttons/buttons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const View = () => {
  const [items, setItems] = useState<FormItem | null>(null);
  const { id } = useParams<{
    id?: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/information/${id}`);
        const result: FormItem = await response.json();

        setItems(result);
      } catch (err) {
        console.log("Fetch Error :", err);
        showError("Failed to receive the data.");
      }
    };

    fetchData();
  }, []);

  return (
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
          <Box>{items?.FirstName}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "3rem" }}>
          <Box fontWeight={"bold"}>LastName :</Box> <Box>{items?.LastName}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "5.8rem" }}>
          <Box fontWeight={"bold"}>age :</Box> <Box>{items?.age}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "4.5rem" }}>
          <Box fontWeight={"bold"}>gender :</Box> <Box>{items?.gender}</Box>
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
          <Box>{items?.birthdate}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "4.3rem" }}>
          <Box fontWeight={"bold"}>country :</Box> <Box>{items?.country}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "6rem" }}>
          <Box fontWeight={"bold"}>city :</Box> <Box>{items?.city} </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "6.1rem" }}>
          <Box fontWeight={"bold"}>job :</Box> <Box>{items?.job}</Box>
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
          <Box>{items?.PhoneNumber}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "3.7rem" }}>
          <Box fontWeight={"bold"}>workType :</Box>
          <Box>{items?.workType}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "3.3rem" }}>
          <Box fontWeight={"bold"}>description :</Box>
          <Box>{items?.description}</Box>
        </Box>
      </Box>
      <Buttons nav={"/"} text={"Back"} icon={<ArrowBackIcon />} />
    </Box>
  );
};

export default View;
