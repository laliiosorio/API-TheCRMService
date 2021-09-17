# The CRM Service API

REST API to manage customer data for a small shop.

## Endpoints

| HTTP Method 	| URI path      	| Description                                    	| 
|-------------	|---------------	|------------------------------------------------	|
| AUTH                           	| 
|-------------	|---------------	|------------------------------------------------	|
| POST         	| /login        	|          	| 
| CUSTOMER                           	| 
|-------------	|---------------	|------------------------------------------------	|
| GET         	| /customer        	| All customer records on JSON format          	| 
| GET         	| /customer/:customer_id	| Matching `Customer Id` records on JSON format 	|
| POST         	| /customer/newCustomer	| Created a new customer 	| 
| PUT         	| /customer/editCustomer/:customer_id 	| Matching `Customer Id` record and updated | 
| DELETE        | /customer/deleteCustomer/:customer_id | Matching `Customer Id` record and deleted 	| 
| USER                           	| 
|-------------	|---------------	|------------------------------------------------	|
| GET         	| /user        	| All user records on JSON format          	| 
| POST         	| /user/newUser	| Created a new user 	| 
| PUT         	| /user/editUser/:user_id	| Matching `User Id` record and updated all fields | 
| PUT         	| /user/editUserRol/:user_id	| Matching `user Id` record and updated rol field| 
| DELETE        | /user/deleteUser/:user_id | Matching `user Id` record and deleted 	|

## JSON response format

```json
{
    "length": 1564,
    "height": 75,
    "speed": 134,
    "inversions": 0,
    "gForce": 3.8,
    "country": "Spain",
    "year": 2012,
    "type": [
      "Roller Coaster",
      "Steel",
      "Sit Down",
      "Extreme"
    ],
    "_id": "5e8ef56a60fa824d1e2db3d9",
    "name": "Shambhala",
    "park": "PortAventura Park",
    "model": "Hyper Coaster",
    "createdAt": "2020-04-09T10:14:02.718Z",
    "updatedAt": "2020-04-09T10:14:02.718Z",
    "__v": 0
  }
```

## JSON response data types
| Property 	| Data type      	| 
|-------------	|---------------	|
| `_id`         	| String             	| 
| `name`         	| String             	| 
| `park`         	| String             	| 
| `length`         	| Number             	| 
| `height`         	| Number             	| 
| `speed`         	| Number             	| 
| `inversions`         	| Number             	| 
| `gForce`         	| Float             	| 
| `country`         	| String             	| 
| `year`         	| Number             	| 
| `type`         	| Array             	| 
| `model`         	| String             	| 
