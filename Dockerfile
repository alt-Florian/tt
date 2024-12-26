# à partir de l'image
FROM node:20.14.0-alpine3.20  as firstStep

# dossier de notre application
WORKDIR /app

# copier le package.json pour installer toutes les dépendences
COPY package.json /app/

# install toutes les dépendences
RUN npm i 

# copie de reste de l'application
COPY . /app/

# Quelle url pour le back?
ARG URL_BACK
ENV VITE_API_BASE_URL=${URL_BACK:-"https://test-actioneo-gateway.alt-tech.bzh/api/"}


# transpilation de l'application ts en js. 
RUN npm run build

# depuis l'image du server web nginx
FROM nginx:stable as finalStep
# copy le fichier de vhost et de la règle de redirection spécifique aux frameworks type : angular/react/vue etc...
COPY ./nginx/prod.conf /etc/nginx/conf.d/default.conf
# copy tout le dossier dist (généré précédement via la firstStep) dans le dossier qui sera le dossier root de nginx (cf. .conf)
COPY --from=firstStep /app/dist /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]