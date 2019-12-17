# API Test Task

## Introduction
This backend test task deals with the CRUD operations and some other for students and their projects.

## Prerequisites
Need node.js and npm installed

## Installing and Running the app

### Steps to clone the repository

```
git clone https://github.com/MukeshKum26/APITestTask.git
cd APITestTask
```

### Steps to install packages
In the project directory's terminal run below command to install all the required packages
```
yarn
```
### Step to run
In the development.json file of the environment folder update the "publicFolderPath" to match the route with your file location of the models sub-folder of the app folder.

### Step to login

To login and retrieve the hard coded token, hit `/user/login` api with the username and password provided in the users' model's JSON file.

### Step for hitting other APIs

While hitting the APIs from Postman, under the Header's tab for any request ( other than login), enter a key `Authorization` and in it's value `Bearer ${token that you retrieved}`

### API Specifications

The specifications of supported APIs can be found in the [postman collection](https://learning.getpostman.com/docs/postman/collections/intro-to-collections/) below:

[Postman Collection URL](https://www.getpostman.com/collections/4946d58c0471bffb2701)

```Note: 1.) The login API for every successful credentials match will return the same token as it has been hardcoded into the JSON file with the username an the password. Under normal circumstances with a database I would have generated a new token everytime the user logged in and updated the db. But here I have hardcoded the token to keep things simple. 2.) I have pushed the the development.json file of the environment folder since it's for development environment and so that the ease of use for you remains. In general the environment files are not pushed especially production and staging. ```