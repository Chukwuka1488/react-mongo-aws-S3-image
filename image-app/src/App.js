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

  const onCropIsComplete = () => {};

  const onSelectFile = () => {};

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
          <Button variant='contained' color='primary'>
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
