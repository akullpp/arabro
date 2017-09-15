FROM alpine:edge AS build
RUN apk add --no-cache openjdk8 maven nodejs nodejs-npm
WORKDIR /opt/demo_build/
ADD pom.xml .
ADD src/ src/
RUN mvn clean install
RUN apk del maven nodejs nodejs-npm
WORKDIR /opt/demo/
RUN mv /opt/demo_build/target/demo-*.jar ./demo.jar
RUN rm -rf /opt/demo_build
ENV JAVA_OPTS -server -Xms512m -Xmx512m -XX:+HeapDumpOnOutOfMemoryError

CMD exec /usr/bin/java $JAVA_OPTS -jar ./demo.jar
