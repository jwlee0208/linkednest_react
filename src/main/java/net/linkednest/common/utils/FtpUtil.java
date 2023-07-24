package net.linkednest.common.utils;

import jakarta.servlet.ServletContext;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.CommonConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Slf4j
public class FtpUtil {
    @Value("${ftp.upload.id}")
    private String ftpId;

    @Value("${ftp.upload.pw}")
    private String ftpPw;

    @Value("${ftp.upload.url}")
    private String ftpUrl;

    @Value("${ftp.upload.port}")
    private String ftpPort;

    @Value("${spring.profile.active}")
    private String activeProfile;

    @Value("${spring.thumbnail.uploadpath}")
    private String uploadPath;

    private ServletContext servletContext;

    private String destinationUrl;

    public String getDestinationUrl() {
        return destinationUrl;
    }

    public void setDestinationUrl(String destinationUrl) {
        this.destinationUrl = destinationUrl;
    }

    public FtpUtil(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public String uploadFileForCafe24(MultipartFile attachFile, int width, int height) {
        String uploadFilePath   = StringUtils.EMPTY;
        String newFolderDir     = String.format("%s%s", DateUtil.formatDateToday(), "/");
        String newFileName      = String.format("%s%s", Long.toString(System.currentTimeMillis()), attachFile.getOriginalFilename().substring(attachFile.getOriginalFilename().lastIndexOf(".")));
        String thumbnailUrl     = String.format("%s/%s%s", destinationUrl, newFolderDir, newFileName);

        String ftpUploadPw = (StringUtils.isNotEmpty(ftpPw)) ? new String(Base64.decodeBase64(ftpPw)) : StringUtils.EMPTY;
        if (StringUtils.equals(CommonConstants.ENV_MODE_PROD, activeProfile) || StringUtils.equals(CommonConstants.ENV_MODE_DEV, activeProfile)) {
            uploadFilePath = uploadPath;
        } else {
            uploadFilePath = String.format("/%s%s", "www", destinationUrl);
        }

        File file = null;
        StringBuffer fileRealPath = new StringBuffer();
        fileRealPath.append(uploadFilePath);
        fileRealPath.append("/");
        fileRealPath.append(DateUtil.formatDateToday());
        fileRealPath.append("/");
        String fileDirPath = fileRealPath.toString();
        fileRealPath.append(newFileName);

        try {
            log.info("[{}.{}] fileRealPath : {}", this.getClass().getName(), "uploadFileForCafe24", fileRealPath);
            file = makeFolder(fileRealPath.toString());
        } catch(Exception e) {
            log.error("[{}.{}] upload makeFolder Error : {}", this.getClass().getName(), "uploadFileForCafe24", e.getMessage());
        }

        // FTP 파일 업로드 부분
        FTPClient ftpClient = null;

        try {
            ftpClient = new FTPClient();
            ftpClient.setControlEncoding("EUC-KR");

            ftpClient.connect(ftpUrl, Integer.parseInt(StringUtils.defaultString(ftpPort, "21")));
            log.info("[{}.{}] ftpClient > connecting.....", this.getClass().getName(), "uploadFileForCafe24");
            int replyCode = ftpClient.getReplyCode();
            log.info("[{}.{}] ftpClient > replyCode : {}, isPositiveCompletion : {}", this.getClass().getName(), "uploadFileForCafe24", replyCode, FTPReply.isPositiveCompletion(replyCode));

            if(!FTPReply.isPositiveCompletion(replyCode)){
                log.info("[{}.{}] ftpClient > disconnect.....", this.getClass().getName(), "uploadFileForCafe24");
                ftpClient.disconnect();
            }else{
                ftpClient.setSoTimeout(10000);          // timeout 10초
                ftpClient.login(ftpId, ftpUploadPw);    // login
                log.info("[{}.{}]  ftpClient > login.....", this.getClass().getName(), "uploadFileForCafe24");
                ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
                ftpClient.enterLocalPassiveMode();

                FileInputStream      is     = null;
                ByteArrayInputStream bais   = null;

                log.info("[{}.{}] fileDirPath : ", this.getClass().getName(), "uploadFileForCafe24",  fileDirPath);
                log.info("[{}.{}] ftpClient > makeDir : {}", this.getClass().getName(), "uploadFileForCafe24", ftpClient.makeDirectory(fileDirPath));

                if (attachFile.getInputStream().getClass().equals(FileInputStream.class)) {
                    is = (FileInputStream) attachFile.getInputStream();
                    log.info("[{}.{}] ========= [FileInputStream.class] =========", this.getClass().getName(), "uploadFileForCafe24");
                    log.info("[{}.{}] ftpClient > storeFile : ", this.getClass().getName(), "uploadFileForCafe24", ftpClient.storeFile(fileRealPath.toString(), is));
                    log.info("[{}.{}] ftpClient > uploading.....", this.getClass().getName(), "uploadFileForCafe24");

                    is.close();
                } else if (attachFile.getInputStream().getClass().equals(ByteArrayInputStream.class)) {
                    bais = (ByteArrayInputStream) attachFile.getInputStream();
                    log.info("[{}.{}] ========= [ByteArrayInputStream.class] =========", this.getClass().getName(), "uploadFileForCafe24");
                    log.info("[{}.{}] ftpClient > storeFile : {}", this.getClass().getName(), "uploadFileForCafe24", ftpClient.storeFile(fileRealPath.toString(), bais));
                    log.info("[{}.{}] ftpClient > uploading.....", this.getClass().getName(), "uploadFileForCafe24");

                    bais.close();
                }
                ftpClient.logout();
            }
        } catch (IOException e) {
            log.error("[{}.{}]  error : {}", this.getClass().getName(), "uploadFileForCafe24", e.getMessage());
            e.printStackTrace();
        } finally{
            if(ftpClient != null && ftpClient.isConnected()){
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    log.error("[{}.{}]  error : {}", this.getClass().getName(), "uploadFileForCafe24", e.getMessage());
                    e.printStackTrace();
                }
            }
        }
        return thumbnailUrl;
    }

    private File makeFolder(String filePath) {
        File file = new File(filePath);
        file.mkdirs();
        return file;
    }

    //이미지 파일 용량 체크
    private Boolean checkFileSize(long maxSize, MultipartFile uploadFile) throws Exception {
        long fileSize = uploadFile.getSize();
        if (fileSize > maxSize || fileSize <= 0) {
            log.info("[{}.{}] invalidate : {}", this.getClass().getName(), "checkFileSize", "20MB 이상의 파일은 업로드 할 수 없습니다.");
            return false;
        }
        return true;
    }

}
