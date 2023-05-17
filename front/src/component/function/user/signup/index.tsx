import { Box, styled } from "@mui/material";

export const phoneNoRegex = new RegExp(/^\d{12,13}$/);
export const pwRegex      = new RegExp(/^.*(?=.{8,10})(?=.*[a-zA-Z])(?=.*?[A-Z])(?=.*\d)(?=.+?[\W|_])[a-zA-Z0-9!@#$%^&*()-_+={}\|\\\/]+$/);
export const emailRegex   = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const htmlTagRegex = /(<([^>]+)>)/gi;

export const steps = ['User Basic Info', 'User Profile', 'Create Account'];

export type SignupForStepperProps = {
    refer : string
}
  
export const MobileBox = styled(Box)({
    paddingTop    : 10,
    paddingLeft   : 5,
    paddingRight  : 5,
    paddingBottom : 5,
    display       : 'flex',
    flexDirection : 'row', 
});

export const MobileStepperBox = styled(Box)({
    paddingTop    : 10,
    paddingLeft   : 5,
    paddingRight  : 5,
    paddingBottom : 5,
});
  
export const DesktopBox = styled(Box)({
    paddingTop    : 50,
    paddingLeft   : 500,
    paddingRight  : 500,
    display       : 'flex',
    flexDirection : 'row', 
});

export const DesktopStepperBox = styled(Box)({
    paddingTop    : 20,
    paddingLeft   : 500,
    paddingRight  : 500,
});

export const moveToLogin = () => {
    window.location.href = "/portal/login";
}

