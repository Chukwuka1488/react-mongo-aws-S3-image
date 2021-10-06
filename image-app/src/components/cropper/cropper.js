import React from 'react';
import './cropper.css';

import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import CancelIcon from '@mui/icons-material/Cancel';
import { generateDownload } from '../../utils/cropImage';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  iconButton: { position: 'absolute', top: '20px', left: '1000px' },
  cancelIcon: {
    color: 'blue',
    fontSize: '50px',
    '&:hover': {
      color: 'red',
    },
  },
});
export default function RenderCropper({ handleCropper }) {
  const classes = useStyles();
  // to trigger the pop-up when trying to select image: use  useRef react hooks
  const InputRef = React.useRef();

  const triggerFileSelectPopup = () => InputRef.current.click();

  // create state
  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropIsComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log(croppedAreaPercentage, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        console.log(reader.result);
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    generateDownload(image, croppedArea);
  };

  return (
    <div className='container'>
      <IconButton className={classes.iconButton} onClick={handleCropper}>
        <CancelIcon className={classes.cancelIcon}></CancelIcon>
      </IconButton>
      <div className='container-cropper'>
        {image ? (
          <>
            <div className='cropper'>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropIsComplete}
              />
            </div>
            <div className='slider'>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className='container-buttons'>
        <input
          type='file'
          accept='image/*'
          ref={InputRef}
          style={{ display: 'none' }}
          onChange={onSelectFile}
        />
        <Button
          onClick={() => setImage(null)}
          variant='contained'
          color='primary'
          style={{ marginRight: '10px' }}
        >
          Clear
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={triggerFileSelectPopup}
          style={{ marginRight: '10px' }}
        >
          Choose
        </Button>

        <Button
          variant='contained'
          color='secondary'
          style={{ marginRight: '10px' }}
          onClick={onDownload}
        >
          Download
        </Button>
        <Button variant='contained' color='secondary'>
          Upload
        </Button>
      </div>
    </div>
  );
}
