FROM 192.168.31.11:808/cot/nginx@sha256:6fe11397c34b973f3c957f0da22b09b7f11a4802e1db47aef54c29e2813cc125
COPY default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html/
CMD ["/bin/bash", "-c", "sed -i \"s@<html@<html base-url=\"$VUE_APP_API_URL\"@\" /usr/share/nginx/html/index.html; nginx -g \"daemon off;\""]
