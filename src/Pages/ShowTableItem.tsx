import { type FormItem } from "./DataTable";
import { Button, Stack, TableCell, TableRow } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditModal from "../components/modals/editModal";
import ViewModal from "../components/modals/viewModal";

type PropsType = {
  item: FormItem;
  onDelete: () => void;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowTableItem = ({ item, onDelete, setEdit }: PropsType) => {
  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
        }}
      >
        <TableCell>{item.FirstName}</TableCell>
        <TableCell>{item.LastName}</TableCell>
        <TableCell>{item.age}</TableCell>
        <TableCell>{item.gender}</TableCell>
        <TableCell>{item.birthdate}</TableCell>
        <TableCell>{item.country}</TableCell>
        <TableCell>{item.city}</TableCell>
        <TableCell>{item.job}</TableCell>
        <TableCell>{item.PhoneNumber}</TableCell>
        <TableCell>{item.workType}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>
          <Stack direction={"row"} spacing={1}>
            <EditModal item={item} id={item.id} setEdit={setEdit} />
            <ViewModal item={item} />
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteForeverIcon />}
              size="small"
              onClick={onDelete}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ShowTableItem;
