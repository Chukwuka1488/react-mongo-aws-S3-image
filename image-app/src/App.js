import React from 'react';
import './App.css';

import Button from '@material-ui/core/Button';


function App() {
  // to trigger the pop-up when trying to select image: use  useRef react hooks
  const InputRef = React.useRef();

  const triggerFileSelectPopup = () => InputRef.current.click();

  return (
    <div className='container'>
      <div className='container-cropper'>
        <div className='container-buttons'>
          <input
            type='file'
            accept='image/*'
            ref={InputRef}
            style={{ display: 'none' }}
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
