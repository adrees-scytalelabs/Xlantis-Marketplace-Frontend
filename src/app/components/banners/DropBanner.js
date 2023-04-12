import React from 'react'


function DropBanner({
}) {
  return (
    <div className="row no-gutters">
    <div className="col-12">
      <div className="bannerWrapper">
        <img
          src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
          className="bannerImg"
          alt="Drop banner"
        />
        <div className="dropThumbWrapper">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149612179.jpg?w=740&t=st=1670524324~exp=1670524924~hmac=868b189caf4ef548da17b5063405f5159f880265c7d6b7cc4abf919861ae391a"
            className="thumbImg"
            alt="drop thumb"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default DropBanner