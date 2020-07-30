# places-api

**List Places**
----
  Returns json data listing all the places.

* **URL**

  {URL}/api/places

* **Method:**

  `GET`


**Create Place**
----
  Adding new place to the database
  
* **URL**

  {URL}/api/places

* **Contenet Type:**

  `multipart/form-data`
  
* **Method:**

	`POST`

* **Data Params**

   **Required:**

   `placeName=[string]`

   `placeImages=[image]`

   **Optional:**

   `placeIcon=[image]`

   `placeDescription=[string]`

   `placeLocation=[string]`
   
* **Running the app**
  * clone the repository.
  * run npm install.
  * edit the configuration files in the config directory with correct database credentials.
  * to start the app run the below command 
    ```javascript
      npm run start-dev

  * to run the tests use the below command 
    ```javascript
  	  npm run test
      
 * **Images URL**
    * uploaded images will be available in this link
      * {URL}/icons/{iconName}
      * {URL}/imgs/{imageName}
      
