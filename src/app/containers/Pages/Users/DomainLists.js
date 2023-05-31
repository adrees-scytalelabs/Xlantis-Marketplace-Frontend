import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MessageCard from "../../../components/MessageCards/MessageCard";

const DomainList = ({ domains }) => {
  const imageWidth = 180;
  const imageHeight = 240;
  return (
    <div style={{ paddingLeft: "30px", paddingRight: "30px", width: "100%" }}>
      <Typography className="mb-3" variant="h4" gutterBottom>
        Market Places
      </Typography>
      {domains.length !== 0 ? (
        <Grid xs={12} container spacing={2}>
          {domains.map((i, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <Link to={`/${i.domain}`} state={{ marketplaceId: i._id }}>
                <Card sx={{ border: "1px solid white" }}>
                  <CardMedia
                    component="img"
                    height={imageHeight}
                    image={i.marketplaceImage}
                    alt={i.domain}
                    sx={{
                      objectFit: "cover",
                      backgroundColor: "gray",
                      minWidth: "100%",
                    }}
                  />
                  <CardContent
                    sx={{ backgroundColor: "black", color: "white" }}
                  >
                    <Typography className="text-center" variant="h6">
                      {i.domain}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <MessageCard msg="No marketplace exists" />
      )}
    </div>
  );
};

export default DomainList;
