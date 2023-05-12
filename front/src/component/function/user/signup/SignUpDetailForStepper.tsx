import { Box, FormControl, Grid }           from "@mui/material";
import Button                               from "@mui/material/Button";
import FormControlLabel                     from "@mui/material/FormControlLabel";
import FormLabel                            from "@mui/material/FormLabel";
import Radio                                from "@mui/material/Radio";
import RadioGroup                           from "@mui/material/RadioGroup";
import TextField                            from "@mui/material/TextField";
import Typography                           from "@mui/material/Typography/Typography";
import { AdapterDayjs }                     from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker }                       from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider }             from '@mui/x-date-pickers/LocalizationProvider';
import { encode as base64_encode }          from 'base-64';
import { format }                           from 'date-fns';
import Parser                               from 'html-react-parser';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } 
                                            from "react";
import PhoneInput                           from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import ReactQuill                           from 'react-quill';
import 'react-quill/dist/react-quill';
import { useAppDispatch }                   from "../../../../store/index.hooks";
import { User, asyncSignUp }                from "../../../../store/modules/user";
import { emailRegex, phoneNoRegex, pwRegex } from ".";
import { GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';


type SignUpProps = {
    stepId : number,
    keyRef : any,
}

const SignUpDetailForStepper = forwardRef(({
    stepId, keyRef
} : SignUpProps) => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const childRef = useRef();
    const dispatch      = useAppDispatch();
    const [user, setUser] = useState<User>({
          userNo                  : 0,
          userId                : ""
        , password              : ""
        , introduce             : "" 
        , accessToken           : ""
        , refreshToken          : ''
        , isLogin               : false
        , nickname              : ""
        , email                 : ""
        , returnCode            : 0
        , adminMenuCategoryList : []
        , userRoleInfoList      : []
        , roleInfoList          : []
        , birthday              : ''
        , sex                   : ''
        , phoneNo               : ''
        , additionalPhoneNo     : ''
        , address               : ''
        , detailAddress         : ''
        , zipcode               : 0
        , reCaptchaToken        : ''
        , userProfile             : {
            sex         : '',
            phoneNo     : '',
            birthday    : '',
        },
    });

    function validStep0_() {
        if (!user.userId) {
            alert('ID를 입력하세요.');
            return false;
        }
        if (!user.password) {
            alert('Password를 입력하세요.');
            return false;
        } else if (!pwRegex.test(user.password)) {
            alert('Password형식이 일치하지 않습니다.');
            return false;
        }

        if (!user.email) {
            alert('Email을 입력하세요.');
            return false;
        } else if (!emailRegex.test(user.email)) {
            alert('Email형식이 일치하지 않습니다.');
            return false;
        }

        if (!user.nickname) {
            alert('Nickname을 입력하세요.');
            return false;
        }
        return true;
    }

    function validStep1_() {
        if (user.sex === '') {
            alert('성별을 선택해주세요.');
            return false;
        }
        if (user.introduce === '') {
            alert('자기소개를 해주세요.');
            return false;
        }

        const phoneNo = user.phoneNo;
        let isValidPhonoNoRegEx = phoneNoRegex.test(phoneNo);

        if (phoneNo !== '' && isValidPhonoNoRegEx === false) {
            alert('전화번호 번호 형식이 맞지 않습니다.');
            return false;
        }
        if (user.birthday === '') {
            alert('생년월일을 입력해주세요.');
            return false;
        }
        return true;
    }

    function validStep2_() {
        // to-do
        return true;
    }

    useImperativeHandle(keyRef, () => ({
        validStep0_,
        validStep1_,
        validStep2_,
        inputUsernameVal,
        inputPwVal,
    }));

    const inputUsernameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, userId : e.target.value});
    }

    const inputPwVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, password : e.target.value});
    }

    const inputNicknameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, nickname : e.target.value});
    }

    const inputEmailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, email : e.target.value});
    }

    function inputIntroduceVal (value : any) {
        setUser({...user, introduce : value});
    }
    
    const inputPhoneNoVal = async (value : any) => {
        setUser({...user, phoneNo : value});
    }

    const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, sex : e.target.value});
    }

    const handleDateChange = (value : any) => {        
        setUser({...user, birthday : format(new Date(value), 'yyyyMMdd').toString()});
    }
    
    const signupAction = (e : React.FormEvent) => {
        e.preventDefault();

        // if (!executeRecaptcha) {
        //     return;
        // }

        // const executeRecaptchaResult = await executeRecaptcha('signup');
        // setUser({...user, reCaptchaToken : executeRecaptchaResult});

        if (!user.userId) {
            return alert('ID를 입력하세요.');
        } else if (!user.password) {
            return alert('Password를 입력하세요.');
        } else if (!user.email) {
            return alert('Email을 입력하세요.');
        } else if (!user.nickname) {
            return alert('Nickname을 입력하세요.');
        }

        user.userId     = base64_encode(user.userId);
        user.password   = base64_encode(user.password);        

        dispatch(asyncSignUp(user));
    }

    const getCountry = () => {
        console.log('navigator.language : ', navigator.language);
        return navigator.language;
    }

    useEffect(()=>{
        if (!executeRecaptcha) {
            return;
        }
        const handleReCaptchaVerify = async () => {
            const token = await executeRecaptcha('signup');
            console.log('useEffect > handleReCaptchaVerify > token : ', token);
            setUser({...user, reCaptchaToken : token})
            console.log('useEffect > handleReCaptchaVerify > user : ', user);
        };
        handleReCaptchaVerify();

        const quillCss = document.createElement("link");
        quillCss.crossOrigin    = '*';
        quillCss.rel            = 'stylesheet';
        quillCss.type           = "text/css";
        quillCss.href           = `https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css`;
        
        document.head.appendChild(quillCss);
        return () => {
          document.head.removeChild(quillCss);
        }
    }, [executeRecaptcha]);

    const modules = useMemo(
        () => ({
            toolbar: { // 툴바에 넣을 기능
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    ['link', 'image'],
                ],
            },
    }), []);

    const step00Area = () => {
        return (
            <>     
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField id="outlined-basic" name="userId"  label="User ID" variant="filled" color="success" onChange={inputUsernameVal} value={user.userId} type="text" helperText="Please enter your ID" autoComplete="off"/> 
                    </FormControl>    
                </Grid>
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField id="outlined-basic" name="password" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password" autoComplete="off"/>
                    </FormControl>    
                </Grid>
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField id="outlined-basic" name="email" label="Email" variant="filled" color="success" onChange={inputEmailVal} value={user.email} type="email" helperText="Please enter your Email" autoComplete="off"/> 
                    </FormControl>    
                </Grid>
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField id="outlined-basic" name="nickname" label="Nickname" variant="filled" color="success" onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname" autoComplete="off"/>
                    </FormControl>    
                </Grid>
            </>
        )
    }   
    
    const step01Area = () => {
        return (
            <>
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleSexChange}
                            value={user.sex}
                        >
                            <FormControlLabel value="female"    control={<Radio />} label="Female"  checked={user.sex === 'female' || user.sex === ''}/>
                            <FormControlLabel value="male"      control={<Radio />} label="Male"    checked={user.sex === 'male'}/>
                        </RadioGroup>

                    </FormControl>        
                </Grid>
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Introduce</FormLabel>
                        <ReactQuill onChange={inputIntroduceVal} modules={modules} theme="snow" style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={user.introduce}/>    
                    </FormControl>
                </Grid>        
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Phone No</FormLabel>
                        <React.Fragment>
                            <PhoneInput onChange={inputPhoneNoVal}
                                        value={user.phoneNo}
                                        country={'us'}
                                        onlyCountries={['kr', 'us', 'ca', 'tw', 'gb', 'au', 'de', 'fr', 'it']}
                                        />
                        </React.Fragment>
                    </FormControl>
                </Grid> 
                <Grid container item>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Birth Date</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker onChange={handleDateChange} />
                        </LocalizationProvider>    
                    </FormControl>
                </Grid>       
            </>            
        )
    }

    const step02Area = () => {
        return (
            <Box sx={{width : '100%', pl: 10, pr : 10}}>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">UserId</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.userId}</Typography>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">E-Mail</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.email}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Nickname</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.nickname}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">phoneNo</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.phoneNo}</Typography>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container  alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sex</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.sex}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                                        
            <Grid container  alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Birth Day</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.birthday}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                                        
            <Grid container  alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Introduce</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Box>
                            {Parser(decodeURI(user.introduce).replaceAll('\\"', '"'))}
                        </Box>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button type="submit" variant="outlined" size="large">Sign Up</Button>
                </FormControl>
            </Grid>
        </Box>
        )
    }

    const stepArea = (stepSeq : number) => {
        switch (stepSeq) {
            case 0 : return step00Area();
            case 1 : return step01Area();
            case 2 : return step02Area();
            default : return step00Area();
        }
    }

    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
        <div className="SignUp">
            <form onSubmit={signupAction}>
                <Grid container>
                { stepArea(stepId) }
                </Grid>                        
            </form>
        </div>
      </Box>
    );
})

export default SignUpDetailForStepper;
  