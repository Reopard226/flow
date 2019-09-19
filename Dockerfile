FROM node:latest

WORKDIR ~/elastic

ADD package.json ./

RUN npm install

ADD . .

ARG dbuser
ENV CLICK_DBUSER=${dbuser}

ARG dbpass
ENV CLICK_DBPASS=${dbpass}

ARG dbname
ENV CLICK_DBNAME=${dbname}

ARG dbhost
ENV CLICK_DBHOST=${dbhost}

ARG auth0domain
ENV Auth0Domain=${auth0domain}

ARG auth0clientid
ENV Auth0ClientId=${auth0clientid}

ARG auth0clientsecret
ENV Auth0ClientSecret=${auth0clientsecret}

ARG flowAuthDomain
ENV flowAuthDomain=${flowAuthDomain}

ARG flowClientId
ENV flowClientId=${flowClientId}

ARG flowClientSecret
ENV flowClientSecret=${flowClientSecret}

ARG SES_ACCESS_KEY
ENV SES_ACCESS_KEY=${SES_ACCESS_KEY}

ARG SES_SECRET_KEY
ENV SES_SECRET_KEY=${SES_SECRET_KEY}

ARG SES_REGION
ENV SES_REGION=${SES_REGION}

ARG SES_EMAIL_TO
ENV SES_EMAIL_TO=${SES_EMAIL_TO}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

EXPOSE 8000
CMD ["npm", "start"]