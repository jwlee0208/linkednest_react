package net.linkednest.common.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Slf4j
//@Configuration
public class ReCaptchaUtil {

    private final static String reCaptchaValidUrl = "https://www.google.com/recaptcha/api/siteverify";
    private final static String reCaptchaPrivateKeyV2 = "6LeqdfIlAAAAABTCqccXaBnUatbGVkFbbOHrP--G";
    private final static String reCaptchaPrivateKeyV3 = "6Leh2u4lAAAAAAcLQVTlpSbyCaFeGHFr-KKuXl0n";

    public static boolean verifyV2(String reCaptchaToken) {
        return ReCaptchaUtil.verify(reCaptchaToken, reCaptchaPrivateKeyV2);
    }

    public static boolean verifyV3(String reCaptchaToken) {
        return ReCaptchaUtil.verify(reCaptchaToken, reCaptchaPrivateKeyV3);
    }
    public static boolean verify(String reCaptchaToken, String reCaptchaPrivateKey) {

        log.info("[{}.{}] reCaptchaValidUrl : {}", "ReCaptchaConfig", "verify", reCaptchaValidUrl);

        WebClient webClient = WebClient.create();
        JSONObject reqJsonObj = new JSONObject();

        reqJsonObj.put("secret"     , reCaptchaPrivateKey);
        reqJsonObj.put("response"   , reCaptchaToken);

        String postUrl = String.format("%s?secret=%s&response=%s", reCaptchaValidUrl, reCaptchaPrivateKey, reCaptchaToken);

        Mono<JSONObject> resObj =  webClient.post()
                                            .uri(postUrl)
                                            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                            .retrieve()
                                            .bodyToMono(JSONObject.class);

        JSONObject resJsonObj = resObj.blockOptional().get();
        log.info("[{}.{}] resObj : {}", "ReCaptchaConfig", "verify", resJsonObj);

        return ObjectUtils.isNotEmpty(resObj) ? (boolean)resJsonObj.get("success") : false;
    }
}
