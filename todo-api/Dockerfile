FROM openjdk:11
VOLUME /tmp
ADD ./target/todo-list-0.0.1-SNAPSHOT.jar todo-list.jar
ENTRYPOINT ["java","-Dspring.profiles.active=dev","-jar","/todo-list.jar"]
