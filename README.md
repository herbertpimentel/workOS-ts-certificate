# initial setup

- create an account on workOS and get the API_KEY and CLIENT_ID
- connect add to your workOS account an google auth provider
- configure the on workOS dashboard a redirect URL to http://localhost:3000/callback

# build the image

> docker build . -t workosts 

# run the image 

> docker run \
-p 3000:3000 \
-e WORKOS_API_KEY=CHANGE_HERE \
-e WORKOS_CLIENT_ID=CHANGE_HERE \
workosts


# endpoints

## try to authenticate

http://localhost:3000


## show environment variables 

http://localhost:3000/envvars


## download used certificate

http://localhost:3000/cert


## process the workOS auth response 

http://localhost:3000/callback


