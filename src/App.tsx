import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";
import DataTable from "./components/DataTable";
import NotFound from "./components/notFound";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

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
          <Route path="/" element={<DataTable />} />
          <Route path="/form/:mode/:id?" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </Box>
    </>
  );
};

export default App;
