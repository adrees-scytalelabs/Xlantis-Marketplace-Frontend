import { Button, Card, CardActionArea, CardActions, CardMedia, Grid } from '@mui/material';
import React from "react";
function RemoveNft({
  tokenList,
  handleOpenNFTDetailModal,
  setEditObjectIndex,
  classes,
  handleRemoveClick,
}) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-5" style={{ marginLeft: "10px" }}>
      <form>
        <div className="form-group">
          <div>
            <Grid
              container
              spacing={2}
              direction="row"
              justify-content="flex-start"
            >
              {tokenList.map((i, index) => (
                <Grid item xs={12} sm={6} md={6} lg={5} key={index}>
                  <CardActionArea
                    onClick={() => {
                      handleOpenNFTDetailModal(i);
                      setEditObjectIndex(index);
                    }}
                  >
                    <Card
                      style={{ height: "200px", width: "200px" }}
                      id="nftCardProps"
                    >
                      <CardMedia className={classes.media} image={i.nftURI} />
                    </Card>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveClick(index);
                      }}
                      className="btn btn-sm btn-block propsActionBtn"
                    >
                      Remove NFT
                    </Button>
                  </CardActions>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RemoveNft;
