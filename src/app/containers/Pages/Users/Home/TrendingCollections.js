import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Container } from "react-bootstrap";
import CollectionCard from "../../../../components/Cards/CollectionCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  card: {
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function TrendingCollections() {
  const classes = useStyles();

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        
        <div className="page-header mt-4 mt-lg-2 pt-lg-2">
          <Container>
            <h3>
              <pre>TRENDING COLLECTIONS</pre>
            </h3>
            <hr></hr>
            <div className={classes.card}>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
              >
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default TrendingCollections;
