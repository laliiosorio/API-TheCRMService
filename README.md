# The CRM Service API

REST API to manage customer data for a small shop.

### 🔧 Setup

Fork `main` branch into your personal repository. Clone it to local computer. Install node modules.

```sh
$ git clone https://github.com/{your-personal-repo}/API-TheCRMService.git
$ cd theCRMService
$ npm install
$ Set .env 
$ npm run dev 
```

##### .env Variables

* Sess secret for sessions
* Domain local to handle CORS 
* Cloudinary variables set up to image upload handle

```sh
PORT= [your BBDD] || 5005
DB_REMOTE= [your BBDD] || mongodb://localhost/theCRMService
SESS_SECRET= 
DOMAIN_LOCAL=
CLOUDINARY_NAME= 
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```


## :computer: Endpoints

| HTTP Method 	| URI path      	| Description                                    	| 
|-------------	|---------------	|------------------------------------------------	|
| POST         	| /api/login        	|    User Login      	| 
| GET         	| /api/customer        	| All customer records on JSON format          	| 
| GET         	| /api/customer/:customer_id	| Matching `Customer Id` records on JSON format 	|
| POST         	| /api/customer/newCustomer	| Created a new customer 	| 
| PUT         	| /api/customer/editCustomer/:customer_id 	| Matching `Customer Id` record and updated | 
| DELETE        | /api/customer/deleteCustomer/:customer_id | Matching `Customer Id` record and deleted 	| 
| GET         	| /api/user        	| All user records on JSON format          	| 
| POST         	| /api/user/newUser	| Created a new user 	| 
| PUT         	| /api/user/editUser/:user_id	| Matching `User Id` record and updated all fields | 
| PUT         	| /api/user/editUserRol/:user_id	| Matching `user Id` record and updated rol field| 
| DELETE        | /api/user/deleteUser/:user_id | Matching `user Id` record and deleted 	|

## JSON response format

```json
{
    "image": "https://image.flaticon.com/icons/png/512/1200/1200919.png",
    "_id": "6140d25e327cf43130879fd8",
    "mail": "teo@holi.com",
    "name": "Teo",
    "surname": "Magical",
    "creatorUser": {
        "role": "user",
        "_id": "613f6f7543e7ad68589e5dc1",
        "mail": "lola@holi.com",
        "password": "$2b$10$.Pq97DwmFyf1sK18uTP8zu1FsPktgVUMtkPu8DUJzvBghs1xbsx.G",
        "name": "Lole",
        "createdAt": "2021-09-13T15:34:13.338Z",
        "updatedAt": "2021-09-16T14:05:42.277Z",
        "__v": 0,
        "lastName": "Sanchez"
    },
    "createdAt": "2021-09-14T16:48:30.238Z",
    "updatedAt": "2021-09-14T16:48:30.238Z",
    "__v": 0
}
```

## JSON response data types
| Property 	| Data type      	| 
|-------------	|---------------	|
| `_id`         	| String             	| 
| `name`         	| String             	| 
| `mail`         	| String             	| 
| `surname`        	| String             	| 
| `image`         	| String             	| 


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17557711-74f5fa99-b8fd-4f9f-866f-a3f7bd0bec21?action=collection%2Ffork&collection-url=entityId%3D17557711-74f5fa99-b8fd-4f9f-866f-a3f7bd0bec21%26entityType%3Dcollection%26workspaceId%3D72476e73-c314-420a-8268-8abd723f860e)

## 📜 License

This software is licensed under the [MIT](https://github.com/nhn/tui.editor/blob/master/LICENSE) © [NHN](https://github.com/nhn).