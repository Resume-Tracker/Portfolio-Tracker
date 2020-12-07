# Installation Instructions:

Note: These instructions assume the use of Nginx.

This application probably also runs under Apache but you will have to configure it yourself.

1. Install Nginx

2. Clone the project

3. Build the website

4. Copy the built website to the Nginx root web root (commonly /var/www/html)

5. Configure nginx to forward the API calls to the app server

6. Install Python3.6+ and gunicorn

7. Start the app server under gunicorn

8. Embed the tracking script in the web page.
