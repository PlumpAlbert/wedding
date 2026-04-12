FROM nginx:1.27-alpine

COPY fonts/ /use/share/nginx/html/fonts/
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/
COPY vendor/ /usr/share/nginx/html/vendor/

EXPOSE 80
