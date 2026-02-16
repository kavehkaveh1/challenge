import DataTable from "./Pages/DataTable";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

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
        <DataTable />

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
