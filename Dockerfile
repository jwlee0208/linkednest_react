FROM openjdk:17-jdk-slim
#ENV APP_HOME=/usr/local/git_repo

RUN mkdir -p /api

RUN ls -al

ARG JAR_FILE=./build/libs/*-SNAPSHOT.jar

ADD ${JAR_FILE} /api/linkednest_react.jar

WORKDIR /api

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "linkednest_react.jar"]

EXPOSE 8080
