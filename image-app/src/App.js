import React from 'react';
import './App.css';

import Button from '@material-ui/core/Button';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';

function App() {
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

  return (
    <div className='container'>
      <div className='container-cropper'>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropIsComplete}
        />
        <Slider />
        <div className='container-buttons'>
          <input
            type='file'
            accept='image/*'
            ref={InputRef}
            style={{ display: 'none' }}
            onChange={onSelectFile}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={triggerFileSelectPopup}
          >
            Choose
          </Button>
          <Button variant='contained' color='secondary'>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
