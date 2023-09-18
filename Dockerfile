FROM node:16

# Create app directory
WORKDIR /Lambda Services

ENV STRAPI_URL=https://devportaladmin.thedigitalacademy.co.za/
ENV DEV_CMS=http://devcms.ayoba.me
ENV PROD_CMS=http://devcms.ayoba.me
ENV CMS_ID=/jsonapi/15c1ad2ea0d3
ENV PORT=3030

# Enter CMS Admin Credentials before building and Portal Synced APIKeyy
ENV APIKEY=
ENV CMS_USERNAME= 
ENV CMS_PASSWORD=

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3030
CMD [ "npm", "start" ]