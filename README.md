# Recycle-Project-asw-21-22

This is a project for [Application and Web Services course](https://www.unibo.it/it/didattica/insegnamenti/insegnamento/2022/412604)

# Docker instructions
create an image of client:
````
cd client
````
````
docker build -t recycle .
````
create an image of server:
````
cd server
````
````
docker build -t recycle-server .
````

Start composer:

````
docker-compose up
````


# Web site

You can access to [Recycle web](https://recycle-project.vercel.app/login) and create an account or also you can use the follow credentials:

````
email: aaa@gmail.com
password: -Prova123
````