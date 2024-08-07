<div align="center">
<img src="https://github.com/helenzina/HDMovies-app/blob/main/images/logotext%20red.png"/>
<h3 align="center">HDMovies Web Application</h3>
<p align="center">
A Netflix alternative
<br/>
<br/>
<a href="https://github.com/helenzina/HDMovies-app"><strong>Explore the docs</strong></a>
</p>
</div>

 ### Built With

This project was built with the following:
- <a href="https://www.w3schools.com/html/">HTML</a>.
- <a href="https://www.w3schools.com/css/">CSS</a>. 
- <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">Bootstrap (Version 5.3.2)</a>.
- <a href="https://www.w3schools.com/js/">JavaScript</a> for client-interactive web pages. 
- <a href="https://www.w3schools.com/php/">PHP</a> for server-side applications.
- <a href="https://www.apachefriends.org/download.html">XAMPP</a> for the web server. 
- <a href="https://developer.themoviedb.org/reference/intro/getting-started">TheMovieDB API</a> for movies and series integration being updated continuously.
- <a href="https://dashboard.stripe.com/apikeys">Stripe API</a> for subscription payments.
- <a href="https://github.com/PHPMailer/PHPMailer">PHPMailer API</a> for password reset using code from email.
- <a href="https://code.visualstudio.com/">VS Code</a> for the IDE.


 ## About The Project
 
<p align="center">
<img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/run.png"  title="run"/>
</p>

HDMovies-app is a streaming service that allows users to watch a wide variety of movies, TV shows, documentaries, and more on thousands of internet-connected devices. Enjoy unlimited viewing of our content without having to watch a single commercial.

## Getting Started
 
 ### Installation
 
<p>Please follow the following steps for successful installation:</p>

1. Install <a href="https://www.apachefriends.org/download.html">XAMPP</a> to gain access to the database **user_db**.
2. Navigate to the following path, the **htdocs** folder of XAMPP.
   ```sh
   C:\xampp\htdocs
   ```
   
3. Clone the repo
   ```sh
   gh repo clone helenzina/HDMovies-app
   ```

4. **Connect as a localhost by typing the following command in the URL section of your browser**:
    ```sh
   http://localhost/phpmyadmin/
    ```

5. **Create a NEW database and rename it as user_db. It has to be the same**.
  
6. **Press the navbar toggle of the database and press Import**.

7. **Select the user_db database from your folder and press Import**.


## How To Run

To run the HDMovies app, follow these steps:

1. **Open XAMPP and start Apache and MySQL services**.

2. **Open the website**.
    ```sh
   http://localhost/HDMovies-app/main/
    ```
3. **Create an account or login to an existing account available in the database. Most of the saved user accounts in the database's users table have the password "abcd1234" unless you change it in the profile settings.**

4. **For a new account or a subscription renewal, there's an example for Stripe credit card:**

  - Email: {your_email}
  - Card information: 4242424242424242
  - Expiration date: 01/26
  - CVC: 123
  - Name on the credit card: {your_name}
  - Country: {your_country}

5. **Optional: If you want to try the "Forgot password" feature you need to setup your own SMTP server for security reasons. You may check this tutorial** <a href="https://www.youtube.com/watch?v=JDA3a8tEBlo">here</a>. Moreover, you need to modify **mailer.php** by setting your **SMTP hostname**. <br>E.g.
   ```sh
   $mail->Host = "smtp.gmail.com";
   ```
   And your **Username**, which is your email address, as well as your **SMTP password** which will occur once you follow the steps from the tutorial. <br>E.g.
   ```sh
   $mail->Username = "you@gmail.com";
   $mail->Password = "your-smtp-password";
   ```

 ## Troubleshooting
In case you experience some issues using Stripe API, please try the following steps:

1. **Delete the folder vendor in the project and the files: composer.json and composer.lock.**
2. **Run the following command in the root folder of the project using the IDE's terminal:**
    ```sh
    composer require stripe/stripe-php
    ```
In case you experience some issues using PHPMailer API, please try the following steps:

1. **Delete the folder vendor in the project and the files: composer.json and composer.lock.**
2. **Run the following command in the root folder of the project using the IDE's terminal:**
    ```sh
    composer require phpmailer/phpmailer
    ```
    

 ## Features
### Users can

- Signup by subscribing to one of the three available plans and login to their existing account.
- Choose either the browser to remember them next time they login or not.
- Watch a variety of movies and series.
- View the popular movies and series in the home page.
- View some information for the movie/serie they watch (overview, rating, cast etc).
- Search movies and series, each category has its own page. 
- Browse through movies and series based on genres and release year.
- Add/Delete their favourite movies or series in/from a favourite page.
- Navigate through movies, series and their favourite ones using pagination.
- View their profile information (username and email).
- View the remaining days of their subscription plan expiration but they can subscribe to a plan again when they login after its expiration.
- Change their password in the profile settings.
- Reset their password (while forgotten) by clicking a link sent to their email address.


### Security & more:
- Responsive web design.
- **User Authentication**: Secure user registration and login.
  - Validation for email and password on login page based on a specific pattern.
  - Validation for password and repeat password to match.
  - Password is hashed using SHA-256.
  - Validation for the above and the username on the signup page.
  - Validation for being a new user and having username and email that don't belong to another account.
  - Validation for password renewal.
  - Validation for token expiration when reseting password (exceeding 5 minutes or been used already).
- Movies, series and favourite pages' amount of pagination buttons change based on the available content (considering search feature).
- Forgot password feature using a temporary link (valid for 5 minutes) sent to email.


 ## Usage

Here are some screenshots of the web application running showing the features mentioned:
<table>
  <tr>
    <td>
     Index page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/index.png"  title="index"/>
    </td>
    <td>
     Login page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/login.png"  title="login"/>
    </td>
    <td>
     Login with "Remember Me" checked
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/cookie.png"  title="cookie"/>
    </td>
  </tr>
  <tr>
    <td>
     Forgot password page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/forgot.png"  title="forgot"/>
    </td>
    <td>
     Password reset email
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/email.png"  title="email"/>
    </td>
    <td>
     Reset password page url with token
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/reset_url.png"  title="reset_url"/>
    </td>
    <td>
     Reset password page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/reset.png"  title="reset"/>
    </td>
 </tr>
 <tr>
    <td>
     Signup page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/signup-1.png"  title="signup"/>
    </td>
    <td>
     Signup page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/signup-2.png"  title="signup"/>
    </td>
    <td>
     Signup page (3)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/signup-3.png"  title="signup"/>
    </td>
 </tr>
 <tr>
    <td>
     Subscription page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/subscription.png"  title="subscription"/>
    </td>
    <td>
     Stripe (payment)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/stripe.png"  title="stripe"/>
    </td>
    <td>
     Successful payment
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/success.png"  title="success"/>
    </td>
    <td>
     Successful payment registered in database
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/subscription_renewal_in_db.png"  title="subscription_renewal_in_db"/>
    </td>
 </tr>
 <tr>
    <td>
     Landing page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/landing_page-1.png"  title="landing_page-1"/>
    </td>
    <td>
     Landing page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/landing_page-2.png"  title="landing_page-2"/>
    </td>
    <td>
     Watch trailer - Home
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/watch_trailer.png"  title="watch_trailer"/>
    </td>
 </tr>
 <tr>
    <td>
     Landing page - Popular movies section
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/popular_movie.png"  title="popular_movie"/>
    </td>
    <td>
     Landing page - Popular series section
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/popular_serie.png"  title="popular_serie"/>
    </td>
    <td>
     Play page example
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/play_url.png"  title="play"/>
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/play.png"  title="play"/>
    </td>
 </tr>
 <tr>
    <td>
     Movies page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/movies-1.png"  title="movies-1"/>
    </td>
    <td>
     Movies page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/movies-2.png"  title="movies-2"/>
    </td>
 </tr>
 <tr>
    <td>
     Series page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/series-1.png"  title="series-1"/>
    </td>
    <td>
     Series page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/series-2.png"  title="series-2"/>
    </td>
    <td>
     Search example
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/search.png"  title="search"/>
    </td>
 </tr>
 <tr>
    <td>
     Adding movies to favourite
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/movies_to_fav.png"  title="movies_to_fav"/>
    </td>
    <td>
     Adding series to favourite
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/series_to_fav.png"  title="series_to_fav"/>
    </td>
    <td>
     Favourite movies registered in database 
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/fav_movies_in_db.png"  title="fav_movies_in_db"/>
    </td>
    <td>
     Favourite series registered in database
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/fav_series_in_db.png"  title="fav_series_in_db"/>
    </td>
 </tr>
 <tr>
    <td>
     Favourite page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/favourite.png"  title="favourite"/>
    </td>
    <td>
     Favourite page filtered by type
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/favourite_filtered.png"  title="favourite_filtered"/>
    </td>
 </tr>
 <tr>
    <td>
     Profile popup
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_popup.png"  title="profile_popup"/>
    </td>
    <td>
     Profile - General
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_general.png"  title="profile_general"/>
    </td>
    <td>
     Profile - Password
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_password.png"  title="profile_password"/>
    </td>
    <td>
     Profile - Subscription
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_subscription.png"  title="profile_subscription"/>
    </td>
 </tr>
</table>

<p align="center">
 Responsive design 
</br>
 <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/responsive.gif" title="responsive"/>
</p>


For a closer look, click on the images and open them from the **screenshots** folder.
For the best experience, download the app and experience it yourselves!
 
## Collaborators

<p>This project was developed individually for the "Web Programming Applications" course at International Hellenic University.</p>
<table>
<tr>

<td align="center">
<a href="https://github.com/helenzina">
<img src="https://avatars.githubusercontent.com/u/128386591?v=4" width="100;" alt="Helen Zina"/><br>
<sub>
<b>Helen Zina (Me)</b>
</sub>
</a>
</td>

</tr>
</table>

 ## License

Distributed under the MIT License. See the LICENSE file for more information.

 ## Contact
 
If you have any questions or suggestions, feel free to reach out to me:
- Helen Zina - helenz1@windowslive.com
- Project Link: https://github.com/helenzina/HDMovies-app


 ## Acknowledgments

The resources that helped me through this whole process were the following:

- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)
- [Bootstrap](https://www.w3schools.com/bootstrap5/index.php)
- [JavaScript](https://www.w3schools.com/js/)
- [PHP](https://www.w3schools.com/php/)
- [TheMovieDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [How To Set Up SMTP Server In Gmail](https://www.youtube.com/watch?v=JDA3a8tEBlo)
  
Thank you <a href="https://www.youtube.com/@dave-hollingworth">Dave Hollingworth</a> for your guided tutorials. You helped me a lot through this project.
- [PHP Password Reset by Email](https://www.youtube.com/watch?v=R9bfts9ZFjs)
- [Send email with PHP | Create a Working Contact Form Using PHP](https://www.youtube.com/watch?v=fIYyemqKR58&t=542s)



