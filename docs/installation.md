# Installation Instructions:


Note: These instructions assume the use of Nginx.

This application probably also runs under Apache but you will have to configure it yourself.


1. Install Nginx 1.14.2
2. Set up a domain for the analytics server
3. Get the project
    1. run `git clone git@github.com:Resume-Tracker/Portfolio-Tracker.git`
    2. cd into the project folder
4. Build the website
    1. cd into the website folder
    2. run `npm install`
    3. run `npm start-script build`
5. Copy the built website to a directory that Nginx has access to (like /var/www/analytics)
    1. Make sure permissions are set so nginx can read them
6. Configure nginx to forward the API calls to the app server and to serve the frontend
    1. Take the appropriate config file below
        - If you are using a CDN like cloudflare use the CDN_example.cfg config file in the [examples](https://github.com/Resume-Tracker/Portfolio-Tracker/tree/master/docs/examples) directory
        - If you are not using a CDN use the standard_example.cfg file in the [examples](https://github.com/Resume-Tracker/Portfolio-Tracker/tree/master/docs/examples) directory
    2. Then put your domain name in the `server_name` field, change the `root` path setting to point to the directory that you put the built website in save the file with the name of your domain under /etc/nginx/sites-available
    3. Symlink your config file into /etc/nginx/sites-enabled with `ln -s`
8. Tell the analytics server where it is by adding its domain to the `BASE_NAME` variable in `/app/config.py`.  (For example: `BASE_NAME="analytics.example.com"`)
7. Install Python 3.6+ and the dependencies
    1. Install Python and pip with the system package manager
    2. In the project folder run `pip install -r requirments.txt`
    3. Install gunicorn with `pip install gunicorn`
8. Start the app server under gunicorn
    1. In the project folder run `nohup gunicorn serve:app &`
9. Embed the tracking script in the web page.
    1. put the line `<script src="domain/addrow"></script>` where domain has been replaced with your analytics subdomain 
