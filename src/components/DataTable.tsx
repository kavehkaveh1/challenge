import { useEffect, useMemo, useState } from "react";
import ShowTableItem from "./ShowTableItem";
import Popup from "./popup";
import useDelete from "../costumHook/useDelete";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, setData } from "../redux/dataSlice";
import type { RootState, AppDispatch } from "../redux/store";
import Box from "@mui/material/Box";
import {
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

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
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.items);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedWorkType, setSelectedWorkType] = useState<string>("");

  const { open, openId, close } = useDelete();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/information");
        if (!response.ok) throw new Error("failed to fetch the data ");
        const result = await response.json();
        if (result && result.length) {
          dispatch(setData(result));
        }
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const fullName = ` ${item.FirstName} ${item.LastName}`.toLowerCase();

      const matchSearch = fullName.includes(search.toLowerCase());

      const matchWorkType =
        !selectedWorkType || item.workType?.includes(selectedWorkType);

      return matchSearch && matchWorkType;
    });
  }, [data, search, selectedWorkType]);

  const showingData = search || selectedWorkType ? filteredData : data;

  if (error) return <div>Error : {error}</div>;

  const handleConfrimDelete = async () => {
    if (openId === null) return;
    try {
      await fetch(`http://localhost:3000/information/${openId}`, {
        method: "DELETE",
      });
      dispatch(deleteItem(openId));
      close();
    } catch (error) {
      console.log("delete failed", error);
    }
  };

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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "0px", sm: "2rem" },
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <TextField
            sx={{
              margin: "7px",
              marginTop: "22px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            label="Search by name or family"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ marginTop: "30px", marginBottom: "10px" }}
          >
            <label htmlFor="filter" style={{ marginTop: "10px" }}>
              Filter by Work :
            </label>
            <select
              className="filter"
              name="filter"
              id="filter"
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
            >
              <option value="Part time">Part time</option>
              <option value="Full time">Full time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </Stack>
        </Box>

        <div>
          {loading ? (
            <h1>Loading...</h1>
          ) : (search || selectedWorkType) && filteredData.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>No Result Found</h1>
          ) : (
            <Box
              sx={{
                marginTop: "2rem",
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
