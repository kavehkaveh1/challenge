import Form from "./Pages/Form";
import { Routes, Route } from "react-router-dom";
import DataTable from "./Pages/DataTable";
import NotFound from "./Pages/notFound";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import View from "./Pages/view";

const App = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f9f6f6f0",
          minWidth: "100vw",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<DataTable />} />
          <Route path="/form/:mode/:id?" element={<Form />} />
          <Route path="/View/:id?" element={<View />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
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
