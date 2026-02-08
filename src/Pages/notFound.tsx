import { Box } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import BlockIcon from "@mui/icons-material/Block";
const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "darkgray",
        }}
      >
        <Box
          sx={{
            fontSize: "2.7em",
            color: "darkred",
            fontFamily: "monospace",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap:"1rem"
          }}
        >
          <Box>
            <BlockIcon />
          </Box>
          <Box sx={{ color: "#ff0c0b" }}> Not Found 404 !!!</Box>
          <Box>
            <NewReleasesIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
