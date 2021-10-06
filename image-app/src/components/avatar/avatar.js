import React from 'react';
import RenderCropper from '../cropper/cropper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import './avatar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    // marginRight: theme.spacing(2),
  },
  cameraIcon: {
    height: '4rem',
    width: '4rem',
    position: 'absolute',
    bottom: '70px',
    left: '350px',
    backgroundColor: 'white',

    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

export default function RenderAvatar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [showCropper, setShowCropper] = React.useState(false);
  const handleCropper = () => setShowCropper((prevValue) => !prevValue);

  return (
    <>
      <div className='avatar-container'>
        <div className='avatar'>
          <img src='' alt='avatar' className='avatar-img' />
        </div>

        <IconButton
          className={classes.cameraIcon}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
        >
          <CameraAltIcon fontSize='large' />
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='menu-list-grow'
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>View</MenuItem>
                    <MenuItem
                      onClick={(event) => {
                        handleCropper();
                        handleClose(event);
                      }}
                    >
                      Change
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Remove</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {showCropper && <RenderCropper handleCropper={handleCropper} />}
    </>
  );
}
