import { InputBase, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 2),
    transition: theme.transitions.create('width'),
    borderRadius: "5px",
    height: '18px',
    background: '#313131',
    color: '#313131',
    '&::placeholder': {
      color: 'rgba(125,141,150,255)',

    },

    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

function CopyRightFooter(props) {
  return (
    <footer className="footer foot" style={{ position: props.position, paddingTop: '10px', fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="">
        <div className="text-center" style={{ paddingBottom: '10px' }}>

          <Typography
            sx={{ fontWeight: 500, color: 'rgba(204,200,190,255)' }}
          >
            © 2023 XMANNA. All Rights Reserved by <strong>XMANNA</strong>
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default CopyRightFooter;