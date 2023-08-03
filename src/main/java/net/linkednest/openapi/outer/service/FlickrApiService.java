package net.linkednest.openapi.outer.service;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.RequestContext;
import com.flickr4java.flickr.auth.Auth;
import com.flickr4java.flickr.auth.AuthInterface;
import com.flickr4java.flickr.auth.Permission;
import com.flickr4java.flickr.galleries.GalleriesInterface;
import com.flickr4java.flickr.galleries.Gallery;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import com.flickr4java.flickr.uploader.UploadMetaData;
import com.flickr4java.flickr.uploader.Uploader;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuth1Token;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.tika.Tika;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Slf4j
@Service
public class FlickrApiService {
    @Value("${flickr.api.key}")
    private String apiKey;
    @Value("${flickr.shared.secret}")
    private String sharedSecret;

    public PhotoList<Photo> getPhotoList(String searchText){
        PhotoList<Photo> photoList  = null;
        Flickr           f          = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface  photos     = f.getPhotosInterface();
        // setting search params
        SearchParameters params     = new SearchParameters();
        params.setText(searchText);
        params.setPrivacyFilter(1);
        params.setSort(SearchParameters.INTERESTINGNESS_DESC);
        params.setSafeSearch(Flickr.SAFETYLEVEL_SAFE);
        try {
            params.setMedia("photos");
        } catch (FlickrException e1) {
            e1.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhotoList", e1.getMessage());
        }
        try {
            photoList = photos.search(params, 16, 1);
        } catch (FlickrException e) {
            e.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhotoList", e.getMessage());

        }
        return photoList;
    }

    private Photo getPhoto(String photoId, String secret){
        Flickr           f          = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface  photos     = f.getPhotosInterface();
        Photo            photoObj   = null;
        try {
            photoObj   = photos.getInfo(photoId, secret);
        } catch (FlickrException e) {
            e.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhoto", e.getMessage());
        }
        return photoObj;
    }

    public PhotoList<Photo> getPhotoListByUserId(String userId){
        PhotoList<Photo> photoList  = null;
        Flickr           f          = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface  photos     = f.getPhotosInterface();
        // setting search params
        SearchParameters params     = new SearchParameters();

        params.setUserId(userId);
        params.setPrivacyFilter(1);
        params.setSort(SearchParameters.DATE_POSTED_ASC);
        params.setSafeSearch(Flickr.SAFETYLEVEL_SAFE);
        try {
            params.setMedia("photos");
        } catch (FlickrException e1) {
            e1.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhotoListByUserId", e1.getMessage());
        }

        try {
            photoList = photos.search(params, 10, 1);
        } catch (FlickrException e) {
            e.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhotoListByUserId", e.getMessage());
        }
        return photoList;
    }

    public List<Gallery> getGalleryListByUserId(String userId){
        List<Gallery>       galList     = null;
        Flickr              f           = new Flickr(apiKey, sharedSecret, new REST());
        GalleriesInterface  gallery     = f.getGalleriesInterface();

        try {
            galList = gallery.getList(userId, 10, 5);
        } catch (FlickrException e) {
            e.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getGalleryListByUserId", e.getMessage());
        }
        return galList;
    }

    public PhotoList<Photo> getPhotoList(SearchParameters params){
        PhotoList<Photo> photoList  = null;
        Flickr           f          = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface  photos     = f.getPhotosInterface();
        // setting search params
/*        SearchParameters params     = new SearchParameters();
        params.setUserId(userId);*/
        params.setPrivacyFilter(1);
        params.setSort(SearchParameters.DATE_POSTED_ASC);
        params.setSafeSearch(Flickr.SAFETYLEVEL_SAFE);
        try {
            params.setMedia("photos");
        } catch (FlickrException e1) {
            e1.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhotoList", e1.getMessage());
        }

        try {
            photoList = photos.search(params, 100, 1);
        } catch (FlickrException e) {
            e.printStackTrace();
            log.error("[{}.{}] error : {}", this.getClass().getName(), "getPhotoList", e.getMessage());
        }
        return photoList;
    }

    public JSONObject uploadPhoto(MultipartFile attachFile, String title, String contents, String tokenKey, Token token){
        JSONObject  resultObj   = new JSONObject();
        InputStream is          = null;
        String      responseStr = StringUtils.EMPTY;
        Flickr      f           = new Flickr(apiKey, sharedSecret, new REST());
        OAuth1RequestToken oAuth1RequestToken = new OAuth1RequestToken(tokenKey, sharedSecret);
        AuthInterface   ai           = f.getAuthInterface();
        OAuth1Token     requestToken = ai.getAccessToken(oAuth1RequestToken, new Verifier(tokenKey).toString());
        Auth            auth         = null;

        try {
            auth = ai.checkToken(requestToken);
            RequestContext.getRequestContext().setAuth(auth);
            f.setAuth(auth);
        } catch (FlickrException e2) {
            e2.printStackTrace();
            log.error("[{}.{}] ot authenticated error : {}", this.getClass().getName(), "uploadPhoto", e2.getMessage());
        }

        try {
            is = attachFile.getInputStream();
            /* 이미지 파일 유효성 체크
            String chkFileExtStr = "";
            this.checkFileExt(resultObj, is, chkFileExtStr);
            */
            UploadMetaData metaData = new UploadMetaData();
            metaData.setContentType(attachFile.getContentType());
            metaData.setDescription(contents);
            metaData.setFilename(attachFile.getName());
            metaData.setPublicFlag(true);
            metaData.setSafetyLevel(Flickr.SAFETYLEVEL_SAFE);
            metaData.setTitle(title);
            metaData.setFamilyFlag(false);
            metaData.setFriendFlag(true);

            Uploader uploader = f.getUploader();
            try {
                log.info("[{}.{}] image add > service"  , this.getClass().getName(), "uploadPhoto");
                log.info("[{}.{}] contentType : {}"     , this.getClass().getName(), "uploadPhoto", attachFile.getContentType());
                log.info("[{}.{}] originalFileType : {}", this.getClass().getName(), "uploadPhoto", attachFile.getOriginalFilename());
                log.info("[{}.{}] name : {}"            , this.getClass().getName(), "uploadPhoto", attachFile.getName());
                log.info("[{}.{}] size : {}"            , this.getClass().getName(), "uploadPhoto", attachFile.getSize());
                log.info("[{}.{}] bytes : {}"           , this.getClass().getName(), "uploadPhoto", attachFile.getBytes());
//                log.info("[{}.{}] chkFileExtStr : {}", this.getClass().getName(), "uploadPhoto", chkFileExtStr);
                log.info("[{}.{}] is.toString() : {}, is.read() : {}", this.getClass().getName(), "uploadPhoto", is.toString(), is.read());

                responseStr = uploader.upload(is, metaData);
                Photo photoInfo = this.getPhoto(responseStr, token.getSecret());
                resultObj.put("code"        , "ok");
                resultObj.put("photoId"     , responseStr);
                resultObj.put("midUrl"      , photoInfo.getMediumUrl());
                resultObj.put("smallUrl"    , photoInfo.getSmallUrl());
                log.info("[{}.{}] try responseStr : {}", this.getClass().getName(), "uploadPhoto", responseStr);
            } catch (FlickrException e) {
                e.printStackTrace();
                resultObj.put("code"        , "error");
                resultObj.put("message"     , "flickrException");
                log.error("[{}.{}] error : {}", this.getClass().getName(), "uploadPhoto", e.getMessage());
            }
        } catch (IOException e1) {
            e1.printStackTrace();
            resultObj.put("code"        , "error");
            resultObj.put("message"     , "IOException");
            log.error("[{}.{}] error : {}", this.getClass().getName(), "uploadPhoto", e1.getMessage());
        }
        log.info("[{}.{}] responseStr : {}", this.getClass().getName(), "uploadPhoto", responseStr);
        return resultObj;
    }

    public JSONObject uploadPhotoList(MultipartHttpServletRequest request, String title, String contents, String tokenKey, Token token){
        JSONObject      resultObj        = new JSONObject();
        JSONArray       uploadResultArr  = new JSONArray();
        JSONObject      uploadResultObj  = new JSONObject();
        InputStream     is               = null;
        String          responseStr      = StringUtils.EMPTY;

        Flickr          f                = new Flickr(apiKey, sharedSecret, new REST());
        OAuth1RequestToken oAuth1RequestToken = new OAuth1RequestToken(tokenKey, sharedSecret);
        AuthInterface   ai               = f.getAuthInterface();
        OAuth1Token     requestToken     = ai.getAccessToken(oAuth1RequestToken, new Verifier(tokenKey).toString());
        Auth            auth             = null;

        try {
            auth = ai.checkToken(requestToken);
            RequestContext.getRequestContext().setAuth(auth);
            f.setAuth(auth);
        } catch (FlickrException e2) {
            e2.printStackTrace();
            log.error("[{}.{}] ot authenticated error : {}", this.getClass().getName(), "uploadPhotoList", e2.getMessage());
        }

        try {
            List<MultipartFile> attachFileList = request.getFiles("imageFile");
            if(attachFileList != null && attachFileList.size() > 0){
                for(MultipartFile attachFile : attachFileList){
                    is = attachFile.getInputStream();

                    UploadMetaData metaData = new UploadMetaData();
                    metaData.setContentType(attachFile.getContentType());
                    metaData.setDescription(contents);
                    metaData.setFilename(attachFile.getName());
                    metaData.setPublicFlag(true);
                    metaData.setSafetyLevel(Flickr.SAFETYLEVEL_SAFE);
                    metaData.setTitle(title);
                    metaData.setFamilyFlag(false);
                    metaData.setFriendFlag(true);

                    Uploader uploader = f.getUploader();

                    try {
                        responseStr = uploader.upload(is, metaData);
                        Photo photoInfo = this.getPhoto(responseStr, token.getSecret());
                        uploadResultObj.put("code"        , "ok");
                        uploadResultObj.put("photoId"     , responseStr);
                        uploadResultObj.put("midUrl"      , photoInfo.getMediumUrl());
                        uploadResultObj.put("smallUrl"    , photoInfo.getSmallUrl());
                        uploadResultObj.put("fileName"    , photoInfo.getTitle());
                        uploadResultObj.put("description" , photoInfo.getDescription());
                        log.info("[{}.{}] try responseStr : {}", this.getClass().getName(), "uploadPhotoList", responseStr);
                        uploadResultArr.add(uploadResultObj);
                    } catch (FlickrException e) {
                        e.printStackTrace();
                        resultObj.put("code"        , "error");
                        resultObj.put("message"     , "flickrException");
                        log.error("[{}.{}] error : {}", this.getClass().getName(), "uploadPhotoList", e.getMessage());
                    }
                }
                resultObj.put("code"            , "ok");
                resultObj.put("message"         , "image updated");
                resultObj.put("uploadFileList"  , uploadResultArr);
            }else{
                resultObj.put("code"    , "error");
                resultObj.put("message" , "no image updated");
            }
        } catch (IOException e1) {
            e1.printStackTrace();
            resultObj.put("code"        , "error");
            resultObj.put("message"     , "IOException");
            log.error("[{}.{}] error : {}", this.getClass().getName(), "uploadPhotoList", e1.getMessage());
        }
        log.info("[{}.{}] responseStr : {}", this.getClass().getName(), "uploadPhotoList", responseStr);
        return resultObj;
    }

    private void checkFileExt(JSONObject resultObj, InputStream is, String chkFileExtStr)  {
        Tika chkFileExt = new Tika();
        try {
            chkFileExtStr = chkFileExt.detect(is).toLowerCase();
        } catch (IOException e) {
            e.printStackTrace();
            resultObj.put("code"        , "error");
            resultObj.put("message"     , "IOException");
            log.error("[{}.{}] error : {}", this.getClass().getName(), "checkFileExt", e.getMessage());
        }
        log.info("[{}.{}] chkFileExtStr : {}", this.getClass().getName(), "checkFileExt", chkFileExtStr);
    }
    public JSONObject checkAuth() {
        JSONObject      resultObj   = new JSONObject();
        Flickr          f           = new Flickr(apiKey, sharedSecret, new REST());
        AuthInterface   ai          = f.getAuthInterface();
        OAuth1RequestToken           token       = ai.getRequestToken();
        String          authUrl     = ai.getAuthorizationUrl(token, Permission.WRITE);

        resultObj.put("token"   , token.getToken());
        resultObj.put("secret"  , token.getTokenSecret());
        resultObj.put("authUrl" , authUrl);

        return resultObj;
    }
}
