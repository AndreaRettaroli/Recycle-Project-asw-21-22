# Recycle-Project-asw-21-22

This is a project for [Application and Web Services course](https://www.unibo.it/it/didattica/insegnamenti/insegnamento/2022/412604)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=AndreaRettaroli_Recycle-Project-asw-21-22&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=AndreaRettaroli_Recycle-Project-asw-21-22)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=AndreaRettaroli_Recycle-Project-asw-21-22&metric=bugs)](https://sonarcloud.io/dashboard?id=AndreaRettaroli_Recycle-Project-asw-21-22)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=AndreaRettaroli_Recycle-Project-asw-21-22&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=AndreaRettaroli_Recycle-Project-asw-21-22)


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

You can access to [Recycle web](https://recycle-project.vercel.app/login) and create an account.
Unfortunatly the WebSocket doesn't work on Vercel deployment. I advice to use Docker deployment.