import {
  Typography,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tooltip,
  Grid,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateTemplate } from "../API/AxiosInterceptor";
import CircularBackdrop from "../Backdrop/Backdrop";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const makeTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "orbitron",
          color: "#fff",
          border: "1px solid white",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
          },
        },
        input: {
          "&.Mui-disabled": {
            WebkitTextFillColor: "#fff",
          },
        },
      },
    },
  },
});
function TemplateDetails(props) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([{ key: "", type: "boolean" }]);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const handleChangeTile = (e) => {
    props.setTemplateData((existingValues) => ({
      ...existingValues,
      name: e.target.value,
    }));
  };

  const handlePropertyChange = (index, event) => {
    let data = [...properties];
    data[index][event.target.name] = event.target.value;
    setProperties(data);
    props.setTemplateData((existingValues) => ({
      ...existingValues,
      properties: data,
    }));
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", type: "boolean" };
    setProperties([...properties, newData]);
  };

  const handleRemoveProperty = (e, index) => {
    e.preventDefault();
    let data = [...properties];
    data.splice(index, 1);
    setProperties(data);
    props.setTemplateData((existingValues) => ({
      ...existingValues,
      properties: data,
    }));
  };

  const updateData = (e) => {
    e.preventDefault();
    handleShowBackdrop();
    if (properties.length === 0) {
      let variant = "error";
      props.setSnackbarMessage("Template properties cannot be empty.");
      props.setSnackbarSeverity(variant);
      props.handleSnackbarOpen();
      handleCloseBackdrop();
      return;
    }
    let data = {
      name: title,
      data: properties,
    };
    try {
      console.log(data);
      updateTemplate(props.templateData._id, data)
        .then((response) => {
          console.log("update response", response);
          let variant = "success";
          props.setSnackbarMessage("Template Updated Successfully.");
          props.setSnackbarSeverity(variant);
          props.handleSnackbarOpen();
          handleCloseBackdrop();
          props.handleClose();
        })
        .catch((error) => {
          console.log("Error on status pending nft: ", error);
          console.log("Error on status pending nft: ", error.response);
          handleCloseBackdrop();
          let variant = "error";
          props.setSnackbarMessage("Unable to Update the template.");
          props.setSnackbarSeverity(variant);
          props.handleSnackbarOpen();
        });
    } catch (e) {
      let variant = "error";
      console.log("Something wrong with updation", e);
      props.setSnackbarMessage("Unable to Update the template.");
      props.setSnackbarSeverity(variant);
      props.handleSnackbarOpen();
    }
  };

  useEffect(() => {
    if (props.show === true) {
      console.log(props.templateData);
      setTitle(props.templateData.name);
      setProperties(props.templateData.properties);
    }
  }, [props]);

  return (
    props.show === true && (
      <>
        <ThemeProvider theme={makeTheme}>
          <Dialog
            open={props.show}
            onClose={props.handleClose}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle
              style={{
                background: "#000",
                color: "white",
                border: "1px solid white",
              }}
            >
              <Typography variant="h6">Template Details</Typography>
            </DialogTitle>

            <DialogContent
              style={{
                background: "#000",
                border: "1px solid white",
                borderBottom: "none",
              }}
            >
              <Box sx={{ margin: "10px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h5" style={{ color: "white" }}>
                      Title
                    </Typography>
                    <TextField
                      name="title"
                      type="text"
                      disabled={props.updateEnabled}
                      value={title}
                      className="newNftProps mt-1"
                      onChange={(e) => {
                        setTitle(e.target.value);
                        handleChangeTile(e);
                      }}
                    />
                  </Grid>
                </Grid>
                {properties.map((i, index) => (
                  <Grid container spacing={3} key={index}>
                    <Grid item xs={12} lg={4} md={4} sm={12}>
                      <Typography
                        className="mt-2 mb-1"
                        variant="h6"
                        style={{ color: "white" }}
                      >
                        Key
                      </Typography>
                      <TextField
                        name="key"
                        type="text"
                        disabled={props.updateEnabled}
                        value={i.key}
                        className="newNftProps mt-1"
                        onChange={(e) => handlePropertyChange(index, e)}
                      />
                    </Grid>

                    <Grid item xs={12} lg={4} md={4} sm={12}>
                      <Typography
                        variant="h6"
                        className="mt-2 mb-1"
                        style={{ color: "white" }}
                      >
                        Type
                      </Typography>
                      <TextField
                        fullWidth
                        select
                        name="type"
                        id="valueType"
                        className="templatesSelect"
                        placeholder="Select a Type"
                        disabled={props.updateEnabled}
                        value={i.type}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <ExpandMoreIcon style={{ color: "white" }} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => handlePropertyChange(index, e)}
                        SelectProps={{
                          style: {
                            color: "white",
                          },
                        }}
                      >
                        <MenuItem value="boolean">Boolean</MenuItem>
                        <MenuItem value="string">String</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                      </TextField>
                    </Grid>
                    {props.updateEnabled === false && (
                      <Grid item xs={12} lg={2} md={4} sm={12}>
                        <Typography
                          variant="h6"
                          className="mt-2 mb-1"
                          style={{ color: "white" }}
                        >
                          Action
                        </Typography>
                        <Tooltip
                          placement="bottom"
                          title={
                            <Typography fontSize={16}>
                              Remove a property
                            </Typography>
                          }
                        >
                          <Button
                            className="btn propsActionBtn"
                            onClick={(e) => handleRemoveProperty(e, index)}
                            style={{ padding: "17px", float: "" }}
                            disabled={props.updateEnabled}
                          >
                            -
                          </Button>
                        </Tooltip>
                      </Grid>
                    )}
                  </Grid>
                ))}
                {props.updateEnabled === false && (
                  <Grid container spacing={3} className="mt-3">
                    <Grid item>
                      <Button
                        className="btn propsActionBtn"
                        variant="outlined"
                        onClick={(e) => handleAddProperty(e)}
                      >
                        <Typography
                          variant="h6"
                          padding={1}
                          sx={{ textTransform: "none" }}
                        >
                          Add new property
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </DialogContent>
            <DialogActions
              style={{
                backgroundColor: "#000",
                border: "1px solid white",
                borderTop: "none",
              }}
            >
              <Button
                className="btn propsActionBtn"
                onClick={props.handleClose}
                color="secondary"
              >
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: "none",
                    padding: "4px",
                    paddingLeft: "18px",
                    paddingRight: "18px",
                  }}
                >
                  Close
                </Typography>
              </Button>
              {props.updateEnabled === false && (
                <Button
                  className="btn propsActionBtn"
                  onClick={(e) => updateData(e)}
                  color="primary"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "none",
                      padding: "4px",
                      paddingLeft: "18px",
                      paddingRight: "18px",
                    }}
                  >
                    Update
                  </Typography>
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </ThemeProvider>
        <CircularBackdrop open={open} />
      </>
    )
  );
}

export default TemplateDetails;
