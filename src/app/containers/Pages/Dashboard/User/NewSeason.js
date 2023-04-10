import {  Grid } from "@material-ui/core/";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import r1 from "../../../../assets/img/patients/patient.jpg";
import NewSeasonCard from "../../../../components/Cards/NewSeasonCard";
import NewSeasonForm from "../../../../components/Forms/NewSeasonForm";


function NewSeason(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [inputList, setInputList] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [image, setImage] = useState(r1);
  let [isUploading, setIsUploading] = useState();
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [type, setType] = useState();
  let [types, setTypes] = useState([]);
  let getMyDrops = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.get("/drop/drops").then(
      (response) => {
        console.log("response", response);
        setInputList(response.data.Dropdata);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            window.location.reload(false);
          }
        }
      }
    );
  };
  useEffect(() => {
    getMyDrops();
    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      newDrop: "",
      newSeason: "active",
      mySeason: "",
      myNFTs: "",
      myCubes: "",
      myDrops: "",
      newCube: "",
      newCollection: "",
      orders: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newRandomDrop: "",
    }); 
  }, []);
  const handleRemoveClick = (index) => {
    const list = [...types];
    console.log("list", list);
    list.splice(index, 1);
    setTypes(list);
  };
  const handleAddClick = (value) => {
    setTypes([...types, value]);
    setType("");
  };
  const handleSubmitEvent = (event) => {
    event.preventDefault();
    setIsSaving(true);
    let dropList = [];
    for (let i = 0; i < types.length; i++) {
      dropList.push(types[i]._id);
    }
    let SeasonData = {
      title: name,
      description: description,
      image: image,
      dropId: dropList,
    };
    console.log("cubeData", SeasonData);

    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.post("/season/createseason", SeasonData).then(
      (response) => {
        console.log("response", response);
        setIsSaving(false);
        setName("");
        setDescription("");
        setImage(r1);
        setTypes([]);
        let variant = "success";
        enqueueSnackbar("New Season Created Successfully.", { variant });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsSaving(false);
        let variant = "error";
        enqueueSnackbar("Unable to Create New Season.", { variant });
      }
    );
  };

  let onChangeFile = (e) => {
    setIsUploading(true);
    let imageNFT = e.target.files[0];
    let fileData = new FormData();
    fileData.append("image", imageNFT);
    axios.post("upload/uploadtos3", fileData).then(
      (response) => {
        console.log("response", response);
        setImage(response.data.url);
        setIsUploading(false);
        let variant = "success";
        enqueueSnackbar("Image Uploaded Successfully", { variant });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsUploading(false);
        let variant = "error";
        enqueueSnackbar("Unable to Upload Image", { variant });
      }
    );
  };
  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">New Season</li>
      </ul>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <NewSeasonForm
              handleSubmitEvent={handleSubmitEvent}
              inputList={inputList}
              type={type}
              setType={setType}
              handleAddClick={handleAddClick}
              setName={setName}
              name={name}
              setDescription={setDescription}
              description={description}
              image={image}
              isUploading={isUploading}
              onChangeFile={onChangeFile}
            />
          </div>
          <div className="col-md-12 col-lg-6">
            {types.length > 0 ? (
              <Scrollbars style={{ height: 600 }}>
                <div className="form-group">
                  <div>
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      justifyContent="flex-start"
                    >
                      {types.map((i, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <NewSeasonCard i={i} handleRemoveClick={handleRemoveClick} index={index} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </Scrollbars>
            ) : null}
          </div>
        </div>
        {isSaving ? (
          <div className="text-center">
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#ff0000" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : name === "" ||
          description === "" ||
          image === r1 ||
          types === [] ||
          types.length === 0 ? (
          <div className="submit-section">
            <button type="button" disabled className="btn submit-btn">
              Create Drop
            </button>
          </div>
        ) : (
          <div className="submit-section">
            <button
              type="button"
              onClick={handleSubmitEvent}
              className="btn submit-btn"
            >
              Create Drop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewSeason;
