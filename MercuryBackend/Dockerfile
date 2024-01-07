FROM eclipse-temurin:17.0.8_7-jdk-alpine

WORKDIR /rest-api
COPY . .
RUN ./gradlew build

EXPOSE 8080

CMD ./gradlew bootRun
