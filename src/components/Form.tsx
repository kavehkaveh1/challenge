import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { addItem, updateItem } from "../redux/dataSlice";
import { Button, Stack } from "@mui/material";
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
    formState: { errors },
  } = useForm<FormValuesType>();

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
          background: "linear-gradient(#6d9bd7, #9762bf)",
          p: 2,
          width: {
            xs: "300px",
            sm: "330px",
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
                md: "12px",
              },
              gridTemplateColumns: {
                xs: "repeat(1,1fr)",
                md: "repeat(2,1fr)",
              },
            }}
          >
            <div className="field">
              <label htmlFor="FirstName " className="lable">
                First Name :
              </label>
              <input
                type="text"
                {...register("FirstName", {
                  required: "FirstName is required",
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                    message: " Please enter a valid name using letters only.",
                  },
                })}
                id="FirstName"
                disabled={isView}
              />
              {<div className="errormassege">{errors.FirstName?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="LastName " className="lable">
                Last Name :
              </label>
              <input
                type="text"
                {...register("LastName", {
                  required: "LastName is required",
                  pattern: {
                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                    message: " Please enter a valid name using letters only.",
                  },
                })}
                id="LastName"
                disabled={isView}
              />
              {<div className="errormassege">{errors.LastName?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="age " className="lable">
                Age :
              </label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                })}
                id="age"
                disabled={isView}
              />
              {<div className="errormassege">{errors.age?.message}</div>}
            </div>
            <div className="field">
              <span className="lable">Gender :</span>

              <input
                type="radio"
                value="female"
                {...register("gender", {
                  required: "Gender is required",
                })}
                id="female"
                disabled={isView}
              />
              <label htmlFor="female" className="space">
                Female
              </label>

              <input
                value="male"
                type="radio"
                {...register("gender", {
                  required: "Gender is required",
                })}
                id="male"
                disabled={isView}
              />
              <label htmlFor="male">Male</label>
              {<div className="errormassege">{errors.gender?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="birtdate " className="lable">
                Birtdate :
              </label>
              <input
                type="date"
                {...register("birthdate", {
                  required: "Birtdate is required",
                })}
                id="birtdate"
                disabled={isView}
              />
              {<div className="errormassege">{errors.birthdate?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="country" className="lable">
                Country :
              </label>
              <select
                defaultValue=""
                {...register("country", {
                  required: "Country is required",
                })}
                id="country"
                disabled={isView}
              >
                <option value="" disabled>
                  Select a country
                </option>
                <option value="Canada">Canada</option>
                <option value="USA">USA</option>
                <option value="Spain">Spain</option>
                <option value="Greece">Greece</option>
                <option value="Germany">Germany</option>
              </select>
              {<div className="errormassege">{errors.country?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="city" className="lable">
                City :
              </label>
              <select
                defaultValue=""
                {...register("city", {
                  required: "City is required",
                })}
                id="city"
                disabled={isView}
              >
                <option value="" disabled>
                  Select a city
                </option>
                <option value="Toronto">Toronto</option>
                <option value="New York">New York</option>
                <option value="Madrid">Madrid</option>
                <option value="Athens">Athens</option>
                <option value="Berlin">Berlin</option>
              </select>
              {<div className="errormassege">{errors.city?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="job" className="lable">
                Job Title :
              </label>
              <select
                defaultValue=""
                {...register("job", {
                  required: "Job Title is required",
                })}
                id="job"
                disabled={isView}
              >
                <option value="" disabled>
                  Select a job
                </option>
                <option value="frontend">frontend</option>
                <option value="backend">backend</option>
                <option value="designer">designer</option>
                <option value="accountant">accountant</option>
                <option value="HR">HR</option>
              </select>
              {<div className="errormassege">{errors.job?.message}</div>}
            </div>
            <div className="field">
              <label htmlFor="PhoneNumber " className="lable">
                Phone Number :
              </label>
              <input
                type="text"
                {...register("PhoneNumber", {
                  required: "PhoneNumber is required",
                  pattern: {
                    value: /^\+?\d{10,15}$/,
                    message: "Invalid phone number format",
                  },
                })}
                id="PhoneNumber"
                disabled={isView}
              />
              {
                <div className="errormassege">
                  {errors.PhoneNumber?.message}
                </div>
              }
            </div>
            <div className="field work">
              <p style={{ marginBottom: "4px" }}>Work type : </p>

              <input
                type="checkbox"
                {...register("workType")}
                value="Part time"
                id="Part"
                disabled={isView}
              />
              <label htmlFor="Part" className="space">
                Part time
              </label>

              <input
                type="checkbox"
                {...register("workType")}
                value="Full time"
                id="Full"
                disabled={isView}
              />
              <label htmlFor="Full" className="space">
                Full time
              </label>

              <input
                type="checkbox"
                {...register("workType")}
                value="Freelance"
                id="Freelance"
                disabled={isView}
              />
              <label htmlFor="Freelance" className="space">
                Freelance
              </label>
            </div>
            <div className="field">
              <p>
                <label htmlFor="description">Description :</label>
              </p>
              <textarea
                style={{ marginTop: "12px" }}
                {...register("description", {
                  required: "description is required",
                  pattern: {
                    value: /^(?!\s).{1,50}$/,
                    message:
                      "Description must be 1-50 characters and not start with space",
                  },
                })}
                id="description"
                disabled={isView}
              ></textarea>
              {
                <div className="errormassege">
                  {errors.description?.message}
                </div>
              }
            </div>
            <Stack spacing={2} direction={"row"}>
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
