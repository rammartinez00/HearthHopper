npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

npx sequelize model:generate --name Spot --attributes name:string,location:string,price:integer,rating:integer,description:text

npx sequelize model:generate --name SpotRoom --attributes name:string,numOfGuests:integer

npx sequelize model:generate --name Picture --attributes image:string,spotId:integer

npx sequelize model:generate --name SpotFav --attributes spotId:integer,userId:integer

npx sequelize model:generate --name SpotReview --attributes userId:integer,spotId:integer,rating:integer,comment:text

npx sequelize model:generate --name SpotBooking --attributes userId:integer,spotId:integer,startDate:date,endDate:date,totalPrice:integer

npx sequelize model:generate --name Amenity --attributes name:string,userId:integer

npx sequelize model:generate --name SpotAmenity --attributes amenityId:integer,spotId:integer

npx sequelize model:generate --name Message --attributes content:string,senderId:integer,receiverId:integer,image:string
