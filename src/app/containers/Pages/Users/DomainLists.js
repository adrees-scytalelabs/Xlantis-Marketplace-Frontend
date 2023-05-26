import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import nike from "../../../assets/img/nike.jpg";
import {Link} from "react-router-dom";

const DomainList = () => {
  
  const domains = [
    {
      name: "Nike",
      description: "This is related to shoes",
      image: nike,
    },
    {
      name: "Domain 2",
      description: "Description 2",
      image: "https://via.placeholder.com/180x120",
    },
    {
      name: "Domain 1",
      description: "Description 1",
      image: "https://via.placeholder.com/180x120",
    },
    {
      name: "Domain 3",
      description: "Description 2",
      image: "https://via.placeholder.com/180x120",
    },
    {
      name: "Domain 4",
      description: "Description 1",
      image: "https://via.placeholder.com/180x120",
    },
    {
      name: "Domain 5",
      description: "Description 2",
      image: "https://via.placeholder.com/180x120",
    },
    // Add more domains as needed
  ];
  const imageWidth = 180;
  const imageHeight = 240;
  const [marketPlace,setMarketPlace] = useState("Nike");
  useEffect(() => {}, []);

  return (
    <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      <Typography className="mb-3" variant="h4" gutterBottom>
        Market Places
      </Typography>
      <div>
        <Grid container spacing={2}>
          {domains.map((domain, index) => (
            
              <Grid item key={index} xs={12} sm={6} md={6} lg={4} xl={2}>
                <Link to={`/${marketPlace}`}>
                <Card sx={{ border: "1px solid white" }}>
                  <CardMedia
                    component="img"
                    height={imageHeight}
                    image={domain.image}
                    alt={domain.name}
                    sx={{ objectFit: "cover", backgroundColor: "gray" }}
                  />
                  <CardContent
                    sx={{ backgroundColor: "black", color: "white" }}
                  >
                    <Typography className="text-center" variant="h6">
                      {domain.name}
                    </Typography>
                    {/* <Typography variant="body2">{domain.description}</Typography> */}
                  </CardContent>
                </Card>
                </Link>
              </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default DomainList;
