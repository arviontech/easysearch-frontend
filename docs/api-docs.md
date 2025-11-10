Easy Search API Management
 1.0.0 
OAS 3.0
API documentation for Easy Search Rent Services

Servers

User Management


POST
/api/v1/users/create-admin
Create a new Admin user

Creates a new admin user along with an associated user record. Password will be hashed before saving.

Parameters
Try it out
No parameters
Request body

Example Value
Schema
{
  "name": "Hasan Khan",
  "email": "admin@example.com",
  "contactNumber": "+8801777000000",
  "profilePhoto": "https://example.com/profile-photo.jpg",
  "password": "StrongP@ss123"
}
Responses
Code	Description	Links
201	
Admin created successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
400	
Invalid request payload
Media type

Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
409	
Email or contact number already exists
Media type

Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
500	
Internal server error
Media type

Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links

GET
/api/v1/users/create-admin
Get all users

Authentication


POST
/api/v1/users/register
User registration

Register a new user account (HOST or CUSTOMER role)

Parameters
Try it out
No parameters
Request body

Example Value
Schema
{
  "name": "John Doe",
  "email": "john@example.com",
  "contactNumber": "+8801777000000",
  "profilePhoto": "https://example.com/profile-photo.jpg",
  "password": "StrongP@ss123",
  "role": "HOST"
}
Responses
Code	Description	Links
201	
Registration successful
Media type

Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
No links
400	
Invalid request payload
Media type

Example Value
Schema
{
  "success": false,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "string",
      "message": "string"
    }
  ]
}
No links
409	
Email or contact number already exists
Media type

Example Value
Schema
{
  "success": false,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "string",
      "message": "string"
    }
  ]
}
No links

POST
/api/v1/auth/login
User login

Category Management


POST
/api/v1/categories/create-category
Create a new category

Creates a new category with name and image

Parameters
Try it out
No parameters
Request body

Example Value
Schema
{
  "categoryName": "Apartments",
  "categoryImage": "https://example.com/apartment.jpg"
}
Responses
Code	Description	Links
201	
Category created successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
409	
Category already exists
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

GET
/api/v1/categories/get-all-category
Get all categories

Retrieve all categories

Parameters
Try it out
No parameters
Responses
Code	Description	Links
200	
Categories retrieved successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 200,
  "success": true,
  "message": "Data retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  },
  "data": [
    {}
  ]
}
No links

PATCH
/api/v1/categories/update-category/{id}
Update category

Update category by ID with partial data

Parameters
Try it out
Name	Description
id *
string
(path)
Category ID

Request body

Example Value
Schema
{
  "categoryName": "Updated Apartments",
  "categoryImage": "https://example.com/updated-apartment.jpg"
}
Responses
Code	Description	Links
200	
Category updated successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
404	
Category not found
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

DELETE
/api/v1/categories/delete-category/{id}
Delete category

Delete category by ID

Parameters
Try it out
Name	Description
id *
string
(path)
Category ID

Responses
Code	Description	Links
200	
Category deleted successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
404	
Category not found
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links
House Rent Management


POST
/api/v1/house-rent/create-house-rent
Create a new house rent

Creates a new house rent listing

Parameters
Try it out
No parameters
Request body

Example Value
Schema
{
  "title": "Beautiful 3BHK Apartment",
  "description": "Spacious apartment with modern amenities",
  "price": 25000,
  "propertyType": "Apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "size": 1200.5,
  "floor": "5th",
  "totalFloors": 10,
  "furnishing": "Furnished",
  "availableFrom": "2024-01-01T00:00:00Z",
  "address": "123 Main Street",
  "area": "Gulshan",
  "city": "Dhaka",
  "division": "Dhaka",
  "lat": 23.7808,
  "lng": 90.2792,
  "categoryId": "uuid-category-id",
  "ownerId": "uuid-owner-id"
}
Responses
Code	Description	Links
201	
House rent created successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
400	
Invalid request data
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

GET
/api/v1/house-rent/get-all-house-rent
Get all house rents

Retrieve paginated list of house rents

Parameters
Try it out
Name	Description
page
integer
(query)
Page number
Default value : 1


limit
integer
(query)
Items per page
Default value : 10


Responses
Code	Description	Links
200	
House rents retrieved successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 200,
  "success": true,
  "message": "Data retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  },
  "data": [
    {}
  ]
}
No links

PATCH
/api/v1/house-rent/update-house-rent/{id}
Update house rent

Update house rent by ID with partial data

Parameters
Try it out
Name	Description
id *
string
(path)
House rent ID

Request body

Example Value
Schema
{
  "title": "Updated Beautiful 3BHK Apartment",
  "description": "Updated spacious apartment with modern amenities",
  "price": 30000,
  "propertyType": "House",
  "bedrooms": 4,
  "bathrooms": 3,
  "size": 1500,
  "floor": "Ground",
  "totalFloors": 2,
  "furnishing": "Semi_Furnished",
  "availableFrom": "2024-02-01T00:00:00Z",
  "address": "456 Updated Street",
  "area": "Dhanmondi",
  "city": "Dhaka",
  "division": "Dhaka",
  "lat": 23.7461,
  "lng": 90.3742,
  "categoryId": "uuid-updated-category-id",
  "ownerId": "uuid-updated-owner-id",
  "isAvailable": false
}
Responses
Code	Description	Links
200	
House rent updated successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
404	
House rent not found
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

DELETE
/api/v1/house-rent/delete-house-rent/{id}
Delete house rent

Delete house rent by ID

Parameters
Try it out
Name	Description
id *
string
(path)
House rent ID

Responses
Code	Description	Links
200	
House rent deleted successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
404	
House rent not found
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links
Hostel Rent Management


POST
/api/v1/hostel-rent/create-hostel-rent
Create a new hostel rent

Creates a new hostel rent listing

Parameters
Try it out
No parameters
Request body

Example Value
Schema
{
  "title": "Comfortable Student Hostel",
  "description": "Clean and safe hostel for students with all amenities",
  "price": 8000,
  "currency": "BDT",
  "type": "Hostel",
  "gender": "MALE",
  "tenantType": "Student",
  "roomType": "Shared_2_person",
  "mealOptions": "Included",
  "mealsPerDay": 3,
  "mealTiming": [
    "Breakfast 8:00 AM",
    "Lunch 1:00 PM",
    "Dinner 8:00 PM"
  ],
  "floor": "2nd",
  "totalFloors": 4,
  "address": "123 University Road",
  "area": "Shahbag",
  "city": "Dhaka",
  "division": "Dhaka",
  "lat": 23.728,
  "lng": 90.398,
  "categoryId": "uuid-category-id",
  "ownerId": "uuid-owner-id"
}
Responses
Code	Description	Links
201	
Hostel rent created successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
400	
Invalid request data
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

GET
/api/v1/hostel-rent/get-all-hostel-rent
Get all hostel rents

Retrieve paginated list of hostel rents

Parameters
Try it out
Name	Description
page
integer
(query)
Page number
Default value : 1


limit
integer
(query)
Items per page
Default value : 10


Responses
Code	Description	Links
200	
Hostel rents retrieved successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 200,
  "success": true,
  "message": "Data retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  },
  "data": [
    {}
  ]
}
No links

PATCH
/api/v1/hostel-rent/update-hostel-rent/{id}
Update hostel rent

Update hostel rent by ID with partial data

Parameters
Try it out
Name	Description
id *
string
(path)
Hostel rent ID

Request body

Example Value
Schema
{
  "title": "Updated Student Hostel",
  "description": "Updated clean and safe hostel for students",
  "price": 9000,
  "currency": "BDT",
  "type": "Mess",
  "gender": "OTHER",
  "tenantType": "Both",
  "roomType": "Single",
  "mealOptions": "Optional",
  "mealsPerDay": 2,
  "mealTiming": [
    "Breakfast 8:30 AM",
    "Dinner 8:30 PM"
  ],
  "floor": "3rd",
  "totalFloors": 5,
  "address": "456 Updated Road",
  "area": "Dhanmondi",
  "city": "Dhaka",
  "division": "Dhaka",
  "lat": 23.7461,
  "lng": 90.3742,
  "categoryId": "uuid-updated-category-id",
  "ownerId": "uuid-updated-owner-id",
  "isAvailable": false
}
Responses
Code	Description	Links
200	
Hostel rent updated successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
404	
Hostel rent not found
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

DELETE
/api/v1/hostel-rent/delete-hostel-rent/{id}
Delete hostel rent

Delete hostel rent by ID

Parameters
Try it out
Name	Description
id *
string
(path)
Hostel rent ID

Responses
Code	Description	Links
200	
Hostel rent deleted successfully
Media type

Controls Accept header.
Example Value
Schema
{
  "statusCode": 201,
  "success": true,
  "message": "Admin created successfully",
  "data": {}
}
No links
404	
Hostel rent not found
Media type

Example Value
Schema
{
  "success": false,
  "message": "Category already exist",
  "error": {
    "name": "Error",
    "message": "Category already exist",
    "stack": "Error: Category already exist\n    at /home/hasan/My Project/Rent Services/easysearch-server/src/app/modules/category/category.service.ts:14:11"
  }
}
No links

Schemas
CreateAdminRequest{
name*	[...]
email	[...]
contactNumber*	[...]
profilePhoto	[...]
password*	[...]
}
CreateResponse{
statusCode	[...]
success	[...]
message	[...]
data	{...}
}
GetAllResponse{
statusCode	[...]
success	[...]
message	[...]
meta	Meta{...}
data	[...]
}
Meta{
page	[...]
limit	[...]
total	[...]
}
RegisterRequest{
name*	[...]
email	[...]
contactNumber*	[...]
profilePhoto	[...]
password*	[...]
role*	[...]
}
RegisterResponse{
success	[...]
message	[...]
data	{...}
}
ApiResponse{
success	[...]
message	[...]
errorMessages	[...]
}
LoginRequest{
email	[...]
contactNumber	[...]
password	[...]
provider	[...]
name	[...]
profilePhoto	[...]
oneOf ->	
Email/Password Login{...}
Phone/Password Login{...}
Google OAuth Login{...}
}
LoginResponse{
success	[...]
message	[...]
data	{...}
}
CreateCategoryRequest{
categoryName*	[...]
categoryImage*	[...]
}
UpdateCategoryRequest{
categoryName	[...]
categoryImage	[...]
}
CreateHouseRentRequest{
title*	[...]
description*	[...]
price*	[...]
propertyType*	[...]
bedrooms*	[...]
bathrooms*	[...]
size*	[...]
floor*	[...]
totalFloors*	[...]
furnishing*	[...]
availableFrom*	[...]
address*	[...]
area*	[...]
city*	[...]
division*	[...]
lat*	[...]
lng*	[...]
categoryId*	[...]
ownerId*	[...]
}
UpdateHouseRentRequest{
title	[...]
description	[...]
price	[...]
propertyType	[...]
bedrooms	[...]
bathrooms	[...]
size	[...]
floor	[...]
totalFloors	[...]
furnishing	[...]
availableFrom	[...]
address	[...]
area	[...]
city	[...]
division	[...]
lat	[...]
lng	[...]
categoryId	[...]
ownerId	[...]
isAvailable	[...]
}
CreateHostelRentRequest{
title*	[...]
description*	[...]
price*	[...]
currency*	[...]
type*	[...]
gender*	[...]
tenantType*	[...]
roomType*	[...]
mealOptions*	[...]
mealsPerDay	[...]
mealTiming*	[...]
floor*	[...]
totalFloors*	[...]
address*	[...]
area*	[...]
city*	[...]
division*	[...]
lat*	[...]
lng*	[...]
categoryId*	[...]
ownerId*	[...]
}
UpdateHostelRentRequest{
title	[...]
description	[...]
price	[...]
currency	[...]
type	[...]
gender	[...]
tenantType	[...]
roomType	[...]
mealOptions	[...]
mealsPerDay	[...]
mealTiming	[...]
floor	[...]
totalFloors	[...]
address	[...]
area	[...]
city	[...]
division	[...]
lat	[...]
lng	[...]
categoryId	[...]
ownerId	[...]
isAvailable	[...]
}
ErrorResponse{
success	[...]
message	[...]
error	{...}
}