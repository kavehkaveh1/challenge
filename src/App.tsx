import Form from "./components/Form";
import "./style.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DataTable from "./components/DataTable";
import NotFound from "./components/notFound";
import { Box } from "@mui/material";

const App = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f9f6f6f0",
          minWidth: "100vw",
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/form/create" />} />
          <Route path="/form/:mode/:id?" element={<Form />} />
          <Route path="/dataTable" element={<DataTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
