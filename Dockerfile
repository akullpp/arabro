FROM alpine:edge AS build
RUN apk add --no-cache openjdk8 maven nodejs nodejs-npm
WORKDIR /opt/arabro_build/
ADD pom.xml .
ADD src/ src/
RUN mvn clean install
RUN apk del maven nodejs nodejs-npm
WORKDIR /opt/arabro/
RUN mv /opt/arabro_build/target/arabro-*.jar ./arabro.jar
RUN rm -rf /opt/arabro_build
ENV JAVA_OPTS -server -Xms512m -Xmx512m -XX:+HeapDumpOnOutOfMemoryError

CMD exec /usr/bin/java $JAVA_OPTS -jar ./arabro.jar
