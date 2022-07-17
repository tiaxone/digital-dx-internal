# **Digital DX Internal IPeds Management Tool** 
>This the management tool for ddx ipeds managment.  It allows the data to be uplodaed to the internal processing tool.


## Code base 
- Backend
  - aws lambdas
  - api Gateway 
  - Dynamodb 
  - S3 (Hosting)
- Frontend 
  - React 
  - Bootstrap
- Devops 
  - Cloudformation
  

## Apis

### Login-api-lambda
> This lambda handles login user in and out of the site.  It also hanlde user registration and verfication
- **/health** Site status
    - Get 
- **/register**
    - Post: Register a new user
    - Sample request: `{
        "name":"sample",
        "email": "sample@email.com",
        "password":"password",
        "companyName": "topherCo"
    }`
- **/login**
    - Post
    - Sample request: `{"userId":"sample@email.com","password":"password"}`
- **/verify**
    - Post
    - Sample request: `"user": {
        "userId": "thebaby@email.com"
    },
    "token": "authtoken"`