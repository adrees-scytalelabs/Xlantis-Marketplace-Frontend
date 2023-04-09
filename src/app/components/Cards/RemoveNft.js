import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActionArea, Grid } from "@material-ui/core/";

function RemoveNft({
  tokenList,
  handleOpenNFTDetailModal,
  setEditObjectIndex,
  classes,
  handleRemoveClick,
}) {
  return (
    <div>
      <div
        className="col-sm-12 col-md-6 col-lg-5"
        style={{ marginLeft: "10px" }}
      >
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
                      <Card id="nftCardProps">
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
    </div>
  );
}

export default RemoveNft;
