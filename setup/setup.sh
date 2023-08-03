# sudo apt update
# sudo apt upgrade

# sudo apt remove nginx

# sudo apt install nginx
# sudo systemctl start nginx

sudo npm install -g pm2

sudo printf %s"
    server {
            listen 80;
            listen [::]:80;

            root /home/bakare;
            index index.html;
    }
" > /etc/nginx/sites-available/default

sudo nginx -t
sudo systemctl restart nginx
echo "Done!"
