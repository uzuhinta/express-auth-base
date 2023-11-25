# Auth base

## Techstack
- Node.js (express.js)
- Redis

## Demo route

```
# register
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
    "email": "sample2@gmail.com",
    "password": "Wed, 21 Oct 2015 18:27:50 GMT"
}

###

# login
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
    "email": "sample2@gmail.com",
    "password": "Wed, 21 Oct 2015 18:27:50 GMT"
}

###

# refresh token
POST http://localhost:3000/api/v1/auth/refresh-token
Content-Type: application/json

{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2NzBlMWEzYjg3MGRhY2I3OTRlMGUiLCJpYXQiOjE2OTkxMTUzMDQsImV4cCI6MTczMDY3MjkwNH0.TW8DQNaJsHqFtAx5f7KzJleH7_SGLor7iishe8lgk6M"
}

###

# logout
POST http://localhost:3000/api/v1/auth/logout
Content-Type: application/json

{
     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2NTg2ZjFmZmNmYzNlM2QxMTMzZTkiLCJpYXQiOjE2OTkxMTQ0NjIsImV4cCI6MTczMDY3MjA2Mn0.rV9E13AKAAMq-nRki_fp-0tEic2DfJbAUbRvOqDUgqE"
}

###

# get list users
GET http://localhost:3000/api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2NzBlMWEzYjg3MGRhY2I3OTRlMGUiLCJpYXQiOjE2OTkxMTU0NzIsImV4cCI6MTY5OTExNTUzMn0.U66ajd8HP2-YKXVGz45sLFr2tgtDcZ3mjdOHbtGYGQk
```