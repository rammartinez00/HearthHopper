# HearthHopper

### HearthHopper is a clone of Airbnb. [Live Site](https://hearthhopper.herokuapp.com/)

https://i.gyazo.com/818d212a9598d61a266a01b8d26156b7.gif

## Index

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Overview of application architecture](#overview-of-application-architecture)



## Technologies Used

![javascript](https://user-images.githubusercontent.com/40069890/162655568-1ad8a984-c652-4aac-817b-90b9a09bca15.png)![heroku](https://user-images.githubusercontent.com/40069890/162656074-7bbb74d2-1c0b-4916-8394-b85ce8a07506.png)![react](https://user-images.githubusercontent.com/40069890/162656083-5253efe9-ada5-43d8-97bf-613671cdef2e.png)![redux](https://user-images.githubusercontent.com/40069890/162656102-f63a0586-7434-49da-9be7-4be04a1065c8.png)![sequelize](https://user-images.githubusercontent.com/40069890/162656115-8a851c24-b9eb-4ed9-93a7-533267130c41.png)![express](https://user-images.githubusercontent.com/40069890/162656119-8c4d8001-bfd3-422c-bfa7-1d77035eec01.png)![postgresql](https://user-images.githubusercontent.com/40069890/162656322-00953b16-0092-42b9-8acb-ba517ec3e62b.png)![css3](https://user-images.githubusercontent.com/40069890/162656333-48d7138a-9734-4403-9ada-25293301fd4d.png)![html5](https://user-images.githubusercontent.com/40069890/162656337-f54c757e-1491-4e22-adac-64350bb9b6c7.png)![git](https://user-images.githubusercontent.com/40069890/162656346-7bbd5f6d-6f96-42a6-a0f9-2beed873f7c9.png)![visual-studio-code](https://user-images.githubusercontent.com/40069890/162656350-fef56da2-bff9-4cb2-a27c-8e6459250196.png)

## Getting Started

1. Clone this repo.

    - git clone git@github.com:rammartinez00/HearthHopper.git
  
2. Install dependencies from the root directory.

    - npm install

3. Create a PostgresQL user with CREATEDB and PASSWORD in PSQL.

    - CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
  
4. Create a .env file in the backend backend directory based on the .env.example found within the respective directory.
  
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your JWT_SECRET, and your desired PORT.
  
6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the same port  from your .env file.
  
    - "proxy": "http://localhost:5000"
  
7. Create Database, Migrate, and Seed Models.
  
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all
  
8. Start the services in the backend directory. 
  
    - npm start
    
    
    
  
9. Start the services in the frontend directory. 
  
    - npm start
    
  
10. Log in as a Demo user, or create an account. 
  
  
[Features](https://github.com/rammartinez00/HearthHopper/wiki/Feature-List)
    
    
[Database Schema](https://github.com/rammartinez00/HearthHopper/wiki/Database-Schema)
  



