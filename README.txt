* * * bootlecap application notes * * *

To whom it may concern,

Below are some notes regarding the development and decisions made in building the application. Brief installation instructions follow.

If you would like to discuss the application, please contact me:
  Laszlo Miok
  +1 (780) 983-7500
  lmiok36@gmail.com



MOBILE...

Go to bottlecap.team-x.ca for the online version.



NOTES...

1. Name - bottlecap makes a good name and logo.

2. MVC - No specific framework is used however the MVC architectural pattern is implemented. Below is the file structure:
        bottlecap/
        |_public_html/
          |_application/
          | |_apis/
          | | |_api_reddit/
          | |   |_api_reddit.php
          | |   |_.htaccess
          | |   |_index.html
          | |_controllers/
          | | |_controller_main.php
          | | |_controller_pnf.php
          | | |_index.html
          | |_css
          | | |_bootstrap.min.css
          | | |_bootstrap.min.php
          | | |_bottlecap.css
          | | |_bottlecap.php
          | | |_fonts.css
          | | |_index.html
          | |_fonts
          | | |_7pSgz2MbVvTCvvm7vukSHxJtnKITppOI_IvcXXDNrsc.woff2
          | | |_8XtYtNKEyyZh481XVWfVOltXRa8TVwTICgirnJhmVJw.woff2
          | |_images
          | | |_404_64x64_dark.png
          | | |_link_128x128.gif
          | | |_logo_64x64_e6e6e6.png
          | | |_logo_32x32.png
          | | |_edison.jpg
          | |_js
          | | |_index.html
          | | |_jquery-3.2.1.min.js
          | | |_js_main_jquery.js
          | | |_js_main.js
          | |_views
          | | |_footer.php
          | | |_header.php
          | | |_index.html
          | | |_view_main.php
          | | |_view_pnf.php
          | |_index.html
          |_.htaccess
          |_index.php

3. API - Written in PHP with JS calling the API. Tested with curl or just a browser. Only get methods result in a successful response.

4. .htaccess - .htaccess files are used to direct to the api api_reddit.php file and to the root index.php file

5. JS & jQuery - JavaScript calls the api. Two .js files were written. One with raw JavaScript and the other using jQuery. There is no html tags in the js_main_jquery.js file. The html tags are only found in the views.

6. Bootstrap and responsiveness - bootstrap.min.css is used however with no grid. The CSS code "white-space: nowrap;" is used for grouping elements. There is responsiveness implemented in the bottlecap.css file for screens smaller than 768px; Responsiveness was tested on one mobile device but no tablets. More testing would be required.

7. CSS/PHP - .php files are called in the <head> tag. These files then in turn call the respective .css file. There are advantages to this.

8. Fonts - Fonts are downloaded and used locally. Same goes with jQuery and Bootstrap.

9. PNF - More than just to the point. e.g. http://bottlecap.localhost/old

10. For a thumbnail link, the character Link from Zelda is used. 



INSTALLATION...

Set up a localhost subdomain such as bottlecap.localhost with Apache and the /etc/hosts file and code the DocumentRoot to the /bottlecap/public_html directory. Go to bottlecap.localhost in a browser. mod_rewrite is required.
