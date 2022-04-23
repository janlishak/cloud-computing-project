FROM alpine 
RUN apk add --update nodejs npm 
EXPOSE 3000 
WORKDIR /usr/src/app 
COPY src/ . 
RUN ls -la /usr/src/app/* 
RUN npm install express mongoose
RUN npm install pm2 -g
CMD [ "pm2-runtime", "main.js", "--watch"]