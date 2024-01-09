FROM jwlee0208/linkednest_test:latest

ENV APP_HOME=/usr/local/git_repo

RUN source /etc/profile
WORKDIR $APP_HOME
RUN cd $APP_HOME

COPY build.gradle $APP_HOME
COPY gradle.properties $APP_HOME

#RUN wget https://services.gradle.org/distributions/gradle-7.6.1-bin.zip -P /tmp
#RUN sudo unzip -d /opt/gradle /tmp/gradle-7.6.1-bin.zip

RUN rm -rf gradle
RUN rm -rf front
RUN rm -rf src/main/resources/application-dev.yaml
RUN rm -f build.gradle
#RUN git fetch origin
3RUN git pull origin master

RUN rm -rf $APP_HOME/front

RUN source /etc/profile

RUN export JAVA_HOME=/usr/lib/jvm/jdk-17-oracle-x64
RUN chmod +x gradlew
RUN cd $APP_HOME
RUN /opt/gradle/gradle-7.6.1/bin/gradle wrap
RUN ./gradlew clean
#RUN ./gradlew install
#RUN ./gradlew -Dspring.profiles.active=dev build
RUN ./gradlew -Dspring.profiles.active=dev bootJar
RUN chmod -R +x build/libs
RUN nohup java -jar -Dspring.profiles.active=dev $APP_HOME/build/libs/git_repo-0.0.1-SNAPSHOT.jar &

EXPOSE 8080
