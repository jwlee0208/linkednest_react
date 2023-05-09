import { Box, Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function ReCaptchaV3() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [ recaptchaToken, setRecaptchaToken ] = useState('');

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async (checked : boolean) => {
      console.log('handleReCaptchaVerify : checked : ',checked);
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
  
      const token = checked ? await executeRecaptcha('login') : '';
      setRecaptchaToken(token);

      console.log('recaptcha token : ', token);

      // Do whatever you want with the token
    }, [executeRecaptcha]); 

    useEffect(() => {
        handleReCaptchaVerify(false);
      }, [handleReCaptchaVerify]);

    return (
        <Box>
            <FormControlLabel label='Verify ReCaptcha'
                control={
                    <Checkbox sx={{height:'50'}} onChange={(e) => handleReCaptchaVerify(e.target.checked)}/> 
                }
            />
        </Box>
    )           
}
    

export default ReCaptchaV3;