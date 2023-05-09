import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Layout from './component/layout/Layout';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function App() {

  return (
    <BrowserRouter>
        <Layout/>
    </BrowserRouter>    
  );
}

export default App;
