export const getReferrer = () => {
    if (document.referrer !== '') {
        let refUrl = document.referrer.replace("https://", "").replace("http://", "");
        let refUrlArr = refUrl.split("/");
        
        if (refUrlArr.length > 0) { 
            let domain = refUrlArr[0];
            refUrl = refUrl.replace(domain, "");
            console.log("refUrl : ", refUrl);
            return refUrl;    
        }
    //   return document.referrer.toString();
    }
    return "/portal"; 
  }
