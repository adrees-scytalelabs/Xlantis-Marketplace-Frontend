
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

function NewCubeForm({
  tokenList,
  handleAddClick,
  setName,
  name,
  description,
  setDescription,
  setSalePrice,
  salePrice,
  uploadMusicOwnerHandler,
  uploadMusicNonOwnerHandler,
  artistTypes,
  setArtist,
  setArtistId,
  setAboutTheTrack,
  setArtistImage
}) {
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Select Artworks </label>
          <div className="filter-widget">
            <Autocomplete
              id="combo-dox-demo"
              required
              options={tokenList}
              getOptionLabel={(option) =>
                option.title +
                "," +
                option.type +
                "," +
                option.tokensupplyalternative
              }
              onChange={(event, value) => {
                if (value !== null) {
                  console.log(value);
                  handleAddClick(value);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="NFTs" variant="outlined" />
              )}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <div className="form-group">
              <input
                type="text"
                required
                value={name}
                placeholder="Enter Name of Cube"
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                type="text"
                required
                rows="4"
                value={description}
                placeholder="Enter Description of Cube"
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Sale Price (ETH)</label>
              <div className="filter-widget">
                <input
                  type="number"
                  required
                  value={salePrice}
                  className="form-control"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setSalePrice(e.target.value);
                    } else {
                      setSalePrice(0);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Upload Music for Owner</label>{" "}
            </div>
            <div className="form-group">
              <input
                required
                type="file"
                name="sampleFile"
                accept=".mp3"
                className="form-control"
                onChange={(e) => uploadMusicOwnerHandler(e)}
              />
            </div>
            <div className="form-group">
              <label>Upload Music for Non Owner</label>{" "}
            </div>
            <div className="form-group">
              <input
                required
                type="file"
                name="sampleFile"
                accept=".mp3"
                className="form-control"
                onChange={(e) => uploadMusicNonOwnerHandler(e)}
              />
            </div>
            <div className="form-group">
              <label>Select Artist</label>
              <div className="filter-widget">
                <Autocomplete
                  id="combo-dox-demo"
                  required
                  options={artistTypes}
                  getOptionLabel={(option) => option.Name}
                  onChange={(event, value) => {
                    if (value == null) setArtist("");
                    else {
                      console.log(value);
                      setArtistId(value.userId);
                      setArtist(value.Name);
                      setAboutTheTrack(value.About);
                      setArtistImage(value.Profile);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Artists"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewCubeForm