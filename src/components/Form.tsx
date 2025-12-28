import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { addItem, updateItem } from "../redux/dataSlice";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";

export interface FormValuesType {
  id?: number;
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

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValuesType>({
    defaultValues: {
      workType: [],
    },
  });

  type Mode = "create" | "edit" | "view";

  const { mode, id } = useParams<{
    mode: Mode;
    id?: string;
  }>();

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const handleSubmitForm: SubmitHandler<FormValuesType> = async (data) => {
    if (isView) return;

    if (isCreate) {
      const postItems = await fetch("http://localhost:3000/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const savedItem = await postItems.json();
      dispatch(addItem(savedItem));
    }

    if (isEdit && id) {
      const updated = { ...data, id: Number(id) };

      await fetch(`http://localhost:3000/information/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      dispatch(updateItem(updated));
    }

    navigate("/DataTable");
  };

  const items = useSelector((state: RootState) => state.data.items);

  useEffect(() => {
    if ((isView || isEdit) && id) {
      const item = items.find((i) => String(i.id) === String(id));
      if (item) {
        reset(item);
      }
    }
  }, [isView, id, isEdit]);

  const handleCheckbox =
    (field: any, value: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;

      field.onChange(
        checked
          ? [...(field.value || []), value]
          : (field.value || []).filter((v: string) => v !== value)
      );
    };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          border: "2px solid white",
          borderRadius: 3,
          backgroundColor: "white",

          p: 2,
          width: {
            xs: "330px",
            sm: "400px",
            md: "700px",
          },
          height: "auto",
        }}
      >
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box
            sx={{
              display: "grid",
              gap: {
                xs: "4px",
                md: "1.3rem",
              },
              gridTemplateColumns: {
                xs: "repeat(1,1fr)",
                md: "repeat(2,1fr)",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <TextField
                size="small"
                label="FirstName"
                fullWidth
                {...register("FirstName", {
                  required: "FirstName is required",
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                    message: " Please enter a valid name using letters only.",
                  },
                })}
                error={!!errors.FirstName}
                helperText={errors.FirstName?.message}
                disabled={isView}
              />
              <TextField
                size="small"
                label="LastName"
                fullWidth
                {...register("LastName", {
                  required: "LastName is required",
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                    message: " Please enter a valid name using letters only.",
                  },
                })}
                error={!!errors.LastName}
                helperText={errors.LastName?.message}
                disabled={isView}
              />
            </Box>

            <TextField
              size="small"
              type="number"
              label="Age"
              fullWidth
              {...register("age", {
                required: "Age is required",
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
              disabled={isView}
            />

            <FormControl error={!!errors.gender} disabled={isView} fullWidth>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <RadioGroup row {...field} value={field.value ?? ""}>
                      <FormControlLabel
                        sx={{
                          paddingLeft: 4,
                        }}
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  )}
                />
              </Stack>

              {errors.gender && (
                <FormHelperText sx={{ paddingBottom: "3px" }}>
                  {errors.gender?.message}
                </FormHelperText>
              )}
            </FormControl>

            <TextField
              size="small"
              label="Birtdate"
              fullWidth
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("birthdate", {
                required: "Birthdate is required",
              })}
              error={!!errors.birthdate}
              helperText={errors.birthdate?.message}
              disabled={isView}
            />

            <Box sx={{ display: "flex", gap: "5px" }}>
              <FormControl
                error={!!errors.country}
                disabled={isView}
                fullWidth
                size="small"
              >
                <InputLabel id="country-lable">Country</InputLabel>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ?? ""}
                      labelId="country-lable"
                      label="Country"
                    >
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Spain">Spain</MenuItem>
                      <MenuItem value="Greece">Greece</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <FormHelperText>{errors.country?.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                error={!!errors.city}
                disabled={isView}
                fullWidth
                size="small"
              >
                <InputLabel id="city-lable">City</InputLabel>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ?? ""}
                      labelId="city-lable"
                      label="City"
                    >
                      <MenuItem value="Toronto">Toronto</MenuItem>
                      <MenuItem value="New York">New York</MenuItem>
                      <MenuItem value="Madrid">Madrid</MenuItem>
                      <MenuItem value="Athens">Athens</MenuItem>
                      <MenuItem value="Berlin">Berlin</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <FormHelperText>{errors.city?.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                error={!!errors.job}
                disabled={isView}
                fullWidth
                size="small"
              >
                <InputLabel id="job-lable">Job</InputLabel>
                <Controller
                  name="job"
                  control={control}
                  rules={{ required: "Job is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ?? ""}
                      labelId="job-lable"
                      label="Job"
                    >
                      <MenuItem value="frontend">frontend</MenuItem>
                      <MenuItem value="backend">backend</MenuItem>
                      <MenuItem value="designer">designer</MenuItem>
                      <MenuItem value="accountant">accountant</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <FormHelperText>{errors.job?.message}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <TextField
              size="small"
              label="PhoneNumber"
              fullWidth
              {...register("PhoneNumber", {
                required: "PhoneNumber is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Invalid phone number format",
                },
              })}
              error={!!errors.PhoneNumber}
              helperText={errors.PhoneNumber?.message}
              disabled={isView}
            />

            <FormControl fullWidth disabled={isView} size="small">
              <FormLabel>Work Type</FormLabel>
              <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                  <FormGroup row>
                    <FormControlLabel
                      sx={{
                        padding: "0px",
                        margin: "0px",
                      }}
                      label="Part time"
                      control={
                        <Checkbox
                          sx={{
                            padding: { xs: "0px", sm: "7px", md: "6px" },
                            margin: "0px",
                          }}
                          checked={field.value?.includes("Part time")}
                          onChange={handleCheckbox(field, "Part time")}
                        />
                      }
                    />
                    <FormControlLabel
                      sx={{
                        padding: "0px",
                        margin: "0px",
                      }}
                      label="Full time"
                      control={
                        <Checkbox
                          sx={{
                            padding: { xs: "0px", sm: "7px", md: "6px" },
                            margin: "0px",
                          }}
                          checked={field.value?.includes("Full time")}
                          onChange={handleCheckbox(field, "Full time")}
                        />
                      }
                    />
                    <FormControlLabel
                      sx={{
                        padding: "0px",
                        margin: "0px",
                      }}
                      label="Freelance"
                      control={
                        <Checkbox
                          sx={{
                            padding: { xs: "0px", sm: "7px", md: "6px" },
                            margin: "0px",
                          }}
                          checked={field.value?.includes("Freelance")}
                          onChange={handleCheckbox(field, "Freelance")}
                        />
                      }
                    />
                  </FormGroup>
                )}
              />
            </FormControl>

            <TextField
              size="small"
              label="description"
              fullWidth
              multiline
              {...register("description", {
                required: "description is required",
                pattern: {
                  value: /^(?!\s).{1,50}$/,
                  message:
                    "Description must be 1-50 characters and not start with space",
                },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              disabled={isView}
            />

            <Stack spacing={4} direction={"row"}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                disabled={isView}
                size="small"
                sx={{ height: "40px" }}
              >
                {isEdit ? "Update" : "Submit"}
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ height: "40px" }}
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => navigate("/DataTable")}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Form;
