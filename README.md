#############################################################
# mongodb+nodejs+react apps.
_MongoDb + nodejs + reactapp by Gabriel Pablo Caraballo_

## PRE REQUISITES
_Install Docker for windows or mac or linux...
On windows 
Enable hyper V on windows 10
In a terminal with administrator permission.
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
If doesnt work, run:
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v_

### INSTRUCTIONS STEPS 📋
_1 .First we must build the mongodb image to have a ready service in mongodb_
_To do that we must_

```
cd mongo
```
```
docker build -t mongodb .
```
```
docker run --name mongodb -d -v /tmp/mongodb:/data/db -p 27017:27017 mongodb
```

_Ok, right now we have the service running, we can test it with a mongodb cliente like compass official client._
_Example of connection string:_
_mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false_

_For this demo, we create a database called mongodb://localhost:27017/holidays_

## Nodejs backend:
_Well, we have a backend to import holidays data from a public endpoint._
_This is the public endpoint_
_http://nolaborables.com.ar/api/v2/feriados/YEARXX_

## RUNNING NODEJS
```
cd nodejsbackend
```
```
npm install
```
```
node holidays-api.js
```

## React App
```
cd reactholidays
```
```
npm install
```
```
npm start
```

_Thats IT!_



## ¿How to import data to -> mongodb the first time?
_Well, first you must start all services (mongodb with docker build and run), npm install for nodejs app and react, node holidays-api.js and npm start for react)_

_With the nexts endpoints examples you can ask for holidays in Argentina and pass year as parameter to import by nodejs._

## Examples:
_Current year:_
_http://localhost:8080/api/v1/holidays/import_

_Year 2019:_
_http://localhost:8080/api/v1/holidays/import/2019_

## usefull commands for docker
_List images_
```
docker images
```
_List containers running_
```
docker ps -a
```
_Delete a container_
```
docker rm CONTAINER_ID -f
```
_Delete an image_
```
docker rmi IMAGE_ID
```

_¡Thats all!_
