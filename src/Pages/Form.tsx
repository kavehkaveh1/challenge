import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  TextareaAutosize,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { type FormItem } from "./DataTable";
import { showError, showSuccess } from "../components/toaster";
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

type CountryType = {
  id: string;
  name: string;
};
type CityType = {
  id: number;
  name: string;
  Country: string;
};

const Form = () => {
  const [items, setItems] = useState<FormItem[]>([]);
  const [itemsReady, setItemsReady] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormValuesType>({
    defaultValues: {
      workType: [],
    },
  });

  type Mode = "create" | "edit";

  const { mode, id } = useParams<{
    mode: Mode;
    id?: string;
  }>();

  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const selectedCountry = watch("country");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:3000/countries");
        const data: CountryType[] = await res.json();
        setCountries(data);
      } catch (error) {
        console.log("Get Error :", error);
        showError("failed to load the data(countries)");
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  const fetchCities = async (country: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cities?country=${country}`,
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.log("Get Error :", error);
      showError("failed to load the data(cities)");
      setCities([]);
    }
  };

  useEffect(() => {
    if (!selectedCountry) return;
    fetchCities(selectedCountry);
  }, [selectedCountry]);

  const handleSubmitForm: SubmitHandler<FormValuesType> = async (data) => {
    if (isCreate) {
      try {
        await fetch("http://localhost:3000/information", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        showSuccess("Data saved successfully");
      } catch (error) {
        console.log("Post Error :", error);
        showError("failed to save data");
      }
    }

    if (isEdit && id) {
      const updated = { ...data, id: Number(id) };
      try {
        await fetch(`http://localhost:3000/information/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated),
        });

        showSuccess("Data updated successfully");
      } catch (error) {
        console.log("Put Error :", error);
        showError("failed to update the data");
      }
    }

    navigate("/");
  };

  const createSubmit = isSubmitting;
  const editSubmit = isSubmitting || !isDirty;
  const disabledSubmit = isCreate ? createSubmit : isEdit ? editSubmit : true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/information");
        const result = await response.json();
        if (result && result.length) {
          setItems(result);
          setItemsReady(true);
        }
      } catch (err) {
        console.log("Fetch Error :", err);
        showError("Failed to receive the data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEdit && id && itemsReady) {
      const item = items.find((i) => String(i.id) === String(id));

      if (item) {
        reset(item);
      }
    }
  }, [id, isEdit, items, itemsReady]);

  const handleCheckbox =
    (field: any, value: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;

      field.onChange(
        checked
          ? [...(field.value || []), value]
          : (field.value || []).filter((v: string) => v !== value),
      );
    };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
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
          marginTop: "1rem",
          marginBottom: "1rem",
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
                xs: "0.5rem",
                md: "1.3rem",
              },
              gridTemplateColumns: {
                xs: "repeat(1,1fr)",
                md: "repeat(2,1fr)",
              },
            }}
          >
            <TextField
              size="small"
              label="FirstName"
              fullWidth
              slotProps={{
                inputLabel: { shrink: isEdit ? true : undefined },
              }}
              {...register("FirstName", {
                required: "FirstName is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                  message: " Please enter a valid name using letters only.",
                },
              })}
              error={!!errors.FirstName}
              helperText={errors.FirstName?.message}
            />
            <TextField
              size="small"
              label="LastName"
              fullWidth
              slotProps={{
                inputLabel: { shrink: isEdit ? true : undefined },
              }}
              {...register("LastName", {
                required: "LastName is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                  message: " Please enter a valid name using letters only.",
                },
              })}
              error={!!errors.LastName}
              helperText={errors.LastName?.message}
            />

            <TextField
              size="small"
              type="number"
              label="Age"
              fullWidth
              slotProps={{
                inputLabel: { shrink: isEdit ? true : undefined },
              }}
              {...register("age", {
                required: "Age is required",
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
            />

            <FormControl error={!!errors.gender} fullWidth>
              <Box
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
              </Box>

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
            />

            <FormControl error={!!errors.country} fullWidth size="small">
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
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.country && (
                <FormHelperText>{errors.country?.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.city} fullWidth size="small">
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
                    {!selectedCountry && (
                      <MenuItem disabled value="">
                        select a country first
                      </MenuItem>
                    )}

                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.city && (
                <FormHelperText>{errors.city?.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.job} fullWidth size="small">
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
              {errors.job && (
                <FormHelperText>{errors.job?.message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              size="small"
              label="PhoneNumber"
              fullWidth
              slotProps={{
                inputLabel: { shrink: isEdit ? true : undefined },
              }}
              {...register("PhoneNumber", {
                required: "PhoneNumber is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Invalid phone number format",
                },
              })}
              error={!!errors.PhoneNumber}
              helperText={errors.PhoneNumber?.message}
            />

            <FormControl fullWidth size="small">
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

            <Box>
              <TextareaAutosize
                placeholder="description"
                {...register("description", {
                  required: "Description is required",
                  pattern: {
                    value: /^(?!\s).{1,50}$/,
                    message:
                      "Description must be 1-50 characters and not start with space",
                  },
                })}
                minRows={3}
                style={{ width: "100%" }}
              />
              {errors.description ? (
                <Box
                  sx={{
                    color: "#d32f2f",
                    fontSize: "14px",
                    paddingLeft: "10px",
                  }}
                >
                  {errors.description?.message}
                </Box>
              ) : null}
            </Box>

            <Stack spacing={4} direction={"row"}>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  isSubmitting ? <CircularProgress size={20} /> : <SendIcon />
                }
                disabled={disabledSubmit}
                size="small"
                sx={{ height: "40px" }}
              >
                {isSubmitting ? "sending..." : isEdit ? "Update" : "Submit"}
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ height: "40px" }}
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => navigate("/")}
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
