import { useEffect, useMemo, useState } from "react";
import ShowTableItem from "./ShowTableItem";
import Popup from "./popUp";
import useDelete from "../costumHook/useDelete";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Add from "./buttons/add";
import { showError, showSuccess } from "./toaster";

export interface FormItem {
  id: number;
  FirstName: string;
  LastName: string;
  age: number;
  gender: "female" | "male";
  birthdate: string;
  country: string;
  city: string;
  job: string;
  PhoneNumber: string;
  workType?: string[];
  description: string;
}

const DataTable = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedWorkType, setSelectedWorkType] = useState<string>("");
  const [info, setinfo] = useState<FormItem[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { open, openId, close } = useDelete();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/information");
      if (!response.ok) throw new Error("failed to fetch the data ");
      const result = await response.json();

      setinfo(result);
    } catch (err) {
      setError((err as Error).message);
      showError("Failed to receive the data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfrimDelete = async () => {
    if (openId === null) return;
    try {
      const res = await fetch(`http://localhost:3000/information/${openId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      setIsDelete(true);
      close();
      showSuccess("data deleted successfully");
    } catch (error) {
      console.log("delete failed", error);
      showError("Failed to delete the data");
    }
  };

  useEffect(() => {
    if (isDelete) {
      fetchData();

      setIsDelete(false);
    }
  }, [isDelete]);

  const filteredData = useMemo(() => {
    return info.filter((item) => {
      const fullName = ` ${item.FirstName} ${item.LastName}`.toLowerCase();

      const matchSearch = fullName.includes(search.toLowerCase());

      const matchWorkType =
        !selectedWorkType || item.workType?.includes(selectedWorkType);

      return matchSearch && matchWorkType;
    });
  }, [info, search, selectedWorkType]);

  const showingData = search || selectedWorkType ? filteredData : info;

  if (error) return <div>Error : {error}</div>;

  const thead = (
    <TableHead>
      <TableRow>
        <TableCell>FirstName</TableCell>
        <TableCell>LastName</TableCell>
        <TableCell>age</TableCell>
        <TableCell>gender</TableCell>
        <TableCell>birthdate</TableCell>
        <TableCell>country</TableCell>
        <TableCell>city</TableCell>
        <TableCell>job</TableCell>
        <TableCell>PhoneNumber</TableCell>
        <TableCell>workType</TableCell>
        <TableCell>description</TableCell>
        <TableCell sx={{ textAlign: "center" }}>action</TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <>
      <div>
        <Box
          sx={{
            position: "relative",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              position: "absolute",
              left: "8%",
              top: "3rem",
            }}
          >
            <TextField
              sx={{
                width: "140px",
              }}
              size="small"
              label="Search"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Box sx={{ minWidth: 140 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  filter by work
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="filter"
                  label="filter"
                  value={selectedWorkType}
                  onChange={(e) => setSelectedWorkType(e.target.value)}
                >
                  <MenuItem value="Part time">Part time</MenuItem>
                  <MenuItem value="Full time">Full time</MenuItem>
                  <MenuItem value="Freelance">Freelance</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              right: "8%",
              top: "3.4rem",
            }}
          >
            <Add />
          </Box>
        </Box>

        <div>
          {loading ? (
            <Box sx={{ marginTop: "2rem" }}>
              <LinearProgress />
            </Box>
          ) : (search || selectedWorkType) && filteredData.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>No Result Found</h1>
          ) : (
            <Box
              sx={{
                marginTop: "6rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableContainer
                sx={{
                  width: "84%",
                }}
                component={Paper}
              >
                <Table>
                  {thead}
                  <TableBody>
                    {showingData.map((item) => (
                      <ShowTableItem
                        item={item}
                        key={item.id}
                        onDelete={() => open(item.id)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Popup
                isOpen={openId !== null}
                onClose={close}
                onConfrim={handleConfrimDelete}
              />
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default DataTable;
