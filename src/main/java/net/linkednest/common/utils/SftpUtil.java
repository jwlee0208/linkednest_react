package net.linkednest.common.utils;

import com.jcraft.jsch.*;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.util.StringTokenizer;

@Slf4j
public class SftpUtil {
    private Session     session     = null;
    private Channel     channel     = null;
    private ChannelSftp channelSftp = null;

    /**
     * 서버와 연결에 필요한 값들을 가져와 초기화 시킴
     *
     * @param host      서버 주소
     * @param userName  접속에 사용될 아이디
     * @param password  비밀번호
     * @param port      포트번호
     */
    public void init(String host, String userName, String password, int port) {
        JSch jsch = new JSch();
        try {
            session = jsch.getSession(userName, host, port);
            session.setPassword(password);

            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();

            channel = session.openChannel("sftp");
            channel.connect();

            log.info("[{}.{}] {}", this.getClass().getName(), "init", "connect success!");
        } catch (JSchException e) {
            log.error("[{}.{}] error : {}", this.getClass().getName(), "init", e.getMessage());
            e.printStackTrace();
        }
        channelSftp = (ChannelSftp) channel;
    }
    /**
     * 하나의 파일을 업로드 한다.
     *
     * @param dir  저장시킬 주소(서버)
     * @param file 저장할 파일
     */
    public void upload(String dir, File file) {
        FileInputStream in = null;
        try {
            in = new FileInputStream(file);
            channelSftp.cd(dir);
            channelSftp.put(in, file.getName());
        } catch (SftpException e) {
            e.printStackTrace();
            log.error("[{}.{}] error > SftpException : {}", this.getClass().getName(), "upload", e.getMessage());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            log.error("[{}.{}] error > FileNotFoundException : {}", this.getClass().getName(), "upload", e.getMessage());
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
                log.error("[{}.{}] error > IOException : {}", this.getClass().getName(), "upload", e.getMessage());
            }
        }
    }

    /**
     * 하나의 파일을 다운로드 한다.
     *
     * @param dir               저장할 경로(서버)
     * @param downloadFileName  다운로드할 파일
     * @param path              저장될 공간
     */
    public void download(String dir, String downloadFileName, String path) {
        InputStream      in  = null;
        FileOutputStream out = null;
        try {
            channelSftp.cd(dir);
            in = channelSftp.get(downloadFileName);
        } catch (SftpException e) {
            e.printStackTrace();
            log.error("[{}.{}] error > SftpException : {}", this.getClass().getName(), "download", e.getMessage());
        }

        try {
            out = new FileOutputStream(new File(path));
            int i;
            while ((i = in.read()) != -1) {
                out.write(i);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            log.error("[{}.{}] error > IOException : {}", this.getClass().getName(), "download", e.getMessage());
        } finally {
            try {
                out.close();
                in.close();
            } catch (IOException e) {
                log.error("[{}.{}] error > IOException : {}", this.getClass().getName(), "download", e.getMessage());
                e.printStackTrace();
            }
        }
    }

    public void makeFolder(String dir) {
        String[] pathArray = split(dir,"/");
        for(int i = 0; i < pathArray.length; i ++) {
            try{
                if(dir.length() != 0){
                    channelSftp.cd("/");
                    channelSftp.mkdir(pathArray[i]);  //폴더 생성..
                    channelSftp.cd(pathArray[i]);
                }
            } catch(Exception e)  {
                try {
                    channelSftp.cd(pathArray[i]);
                } catch (SftpException e1) {
                    e1.printStackTrace();
                    log.error("[{}.{}] error > SftpException : {}", this.getClass().getName(), "makeFolder", e1.getMessage());
                }
            }
        }
    }

    public void disconnection() {
        channelSftp.quit();
    }
    public static String[] split(String s, String s1) {
        StringTokenizer stringtokenizer = new StringTokenizer(s, s1);
        int i = stringtokenizer.countTokens();
        String as[] = new String[i];
        for (int j = 0; j < i; j++) {
            as[j] = stringtokenizer.nextToken();
        }
        return as;
    }
    public boolean sendSftp(String server, String userid, String password, String filepath, String filename, String path
    ) throws JSchException, SftpException, IOException {
        FileInputStream in = null;
        try {
            JSch jsch = new JSch();
            session = jsch.getSession(userid,server,22);
            session.setPassword(password);

            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();

            channel = session.openChannel("sftp");
            channel.connect();

            channelSftp = (ChannelSftp) channel;
            File file_in = new File(filepath+filename);
            // 폴더 생성;
            String[] pathArray = split(path,"/");

            for(int i = 0; i < pathArray.length; i ++) {
                try{
                    if(path.length() != 0){
                        channelSftp.mkdir(pathArray[i]);  //폴더 생성..
                        channelSftp.cd(pathArray[i]);
                    }
                }catch(Exception e)  {
                    log.error("[{}.{}] error > Exception : {}", this.getClass().getName(), "sendSftp", e.getMessage());
                    channelSftp.cd(pathArray[i]);
                }
            }
            in = new FileInputStream(file_in);
            channelSftp.put(in, file_in.getName());  //업로드
            in.close();
            channelSftp.quit();
        } catch (SftpException e) {
            e.printStackTrace();
            log.error("[{}.{}] error > SftpException : {}", this.getClass().getName(), "sendSftp", e.getMessage());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            log.error("[{}.{}] error > FileNotFoundException : {}", this.getClass().getName(), "sendSftp", e.getMessage());
        }
        return true;
    }
}
