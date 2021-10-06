import './App.css';

import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className='container'>
      <div className='container-cropper'>
        <div className='container-buttons'>
          <Button variant='contained' color='primary'>Choose</Button>
          <Button variant='contained' color='secondary'>Download</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
