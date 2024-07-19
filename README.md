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
- <a href="https://www.w3schools.com/js/">JavaScript</a>. 
- <a href="https://www.w3schools.com/php/">PHP</a>.
- <a href="https://www.apachefriends.org/download.html">XAMPP</a> for the web server. 
- <a href="https://developer.themoviedb.org/reference/intro/getting-started">TheMovieDB API</a> for movies and series integration being updated continuously.
- <a href="https://dashboard.stripe.com/apikeys">Stripe API</a> for subscription payments.
- <a href="https://code.visualstudio.com/">VS Code</a> for the IDE.


 ## About The Project
 
<p align="center">
<img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/run.gif" width="500" title="run"/>
</p>

HDMovies-app is a streaming service that allows users to watch a wide variety of movies, TV shows, documentaries, and more on thousands of internet-connected devices. Enjoy unlimited viewing of our content without having to watch a single commercial.

## Getting Started
 
 ### Installation
 
<p>Please follow the following steps for successful installation:</p>
s
1. Clone the repo inside the 
   ```sh
   gh repo clone helenzina/HDMovies-app
   ```
2. Install <a href="https://www.apachefriends.org/download.html">XAMPP</a> to gain access to the database **user_db**.

3. **Connect as a localhost by typing the following command in the URL section of your browser**:
    ```sh
   http://localhost/phpmyadmin/
    ```

4. **Create a NEW database and rename it as user_db. It has to be the same**.
  
5. **Press the navbar toggle of the database and press Import**.

6. **Select the user_db database from your folder and press Import**.


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


 ## Troubleshooting
In case you experience some issues using Stripe API, please try the following steps:

1. **Delete the folder vendor in the project and the files: composer.json and composer.lock.**
2. **Run the following command in the root folder of the project using the IDE's terminal:**
    ```sh
    composer require stripe/stripe-php
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


### Security & more:
- Responsive web design.
- **User Authentication**: Secure user registration and login.
  - Validation for email and password on login page based on a specific pattern.
  - Validation for password and repeat password to match.
  - Password is hashed using SHA-256.
  - Validation for the above and the username on the signup page.
  - Validation for being a new user and having username and email that don't belong to another account.
  - Validation for password renewal.
- Movies, series and favourite pages' amount of pagination buttons change based on the available content (considering search feature).
- <u>TODO</u> forgot password feature using a temporary code sent to email or phone number.


 ## Usage

Here are some screenshots of the web application running showing the features mentioned:
<table>
  <tr>
    <td>
     Index page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/index.png" width="200" title="index"/>
    </td>
    <td>
     Login page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/login.png" width="200" title="login"/>
    </td>
    <td>
     Login with "Remember Me" checked
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/cookie.png" width="200" title="cookie"/>
    </td>
    <td>
     Signup page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/signup-1.png" width="200" title="signup"/>
    </td>
    <td>
     Signup page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/signup-2.png" width="200" title="signup"/>
    </td>
    <td>
     Signup page (3)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/signup-3.png" width="200" title="signup"/>
    </td>
    <td>
     Subscription page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/subscription.png" width="200" title="subscription"/>
    </td>
    <td>
     Stripe (payment)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/stripe.png" width="200" title="stripe"/>
    </td>
    <td>
     Successful payment
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/success.png" width="200" title="success"/>
    </td>
    <td>
     Successful payment registered in database
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/subscription_renewal_in_db.png" width="200" title="subscription_renewal_in_db"/>
    </td>
    <td>
     Landing page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/landing_page-1.png" width="200" title="landing_page-1"/>
    </td>
    <td>
     Landing page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/landing_page-2.png" width="200" title="landing_page-2"/>
    </td>
    <td>
     Watch trailer - Home
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/watch_trailer.png" width="200" title="watch_trailer"/>
    </td>
    <td>
     Landing page - Popular movies section
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/popular_movie.png" width="200" title="popular_movie"/>
    </td>
    <td>
     Landing page - Popular series section
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/popular_serie.png" width="200" title="popular_serie"/>
    </td>
    <td>
     Play page example
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/play_url.png" width="200" title="play"/>
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/play.png" width="200" title="play"/>
    </td>
    <td>
     Movies page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/movies-1.png" width="200" title="movies-1"/>
    </td>
    <td>
     Movies page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/movies-2.png" width="200" title="movies-2"/>
    </td>
    <td>
     Series page (1)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/series-1.png" width="200" title="series-1"/>
    </td>
    <td>
     Series page (2)
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/series-2.png" width="200" title="series-2"/>
    </td>
    <td>
     Search example
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/search.png" width="200" title="search"/>
    </td>
    <td>
     Adding movies to favourite
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/movies_to_fav.png" width="200" title="movies_to_fav"/>
    </td>
    <td>
     Adding series to favourite
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/series_to_fav.png" width="200" title="series_to_fav"/>
    </td>
    <td>
     Favourite movies registered in database 
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/fav_movies_in_db.png" width="200" title="fav_movies_in_db"/>
    </td>
    <td>
     Favourite series registered in database
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/fav_series_in_db.png" width="200" title="fav_series_in_db"/>
    </td>
    <td>
     Favourite page
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/favourite.png" width="200" title="favourite"/>
    </td>
    <td>
     Favourite page filtered by type
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/favourite_filtered.png" width="200" title="favourite_filtered"/>
    </td>
    <td>
     Profile popup
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_popup.png" width="200" title="profile_popup"/>
    </td>
    <td>
     Profile - General
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_general.png" width="200" title="profile_general"/>
    </td>
    <td>
     Profile - Password
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_password.png" width="200" title="profile_password"/>
    </td>
    <td>
     Profile - Subscription
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/profile_subscription.png" width="200" title="profile_subscription"/>
    </td>
    <td>
     Responsive design 
      <img src="https://github.com/helenzina/HDMovies-app/blob/main/screenshots/responsive.png" width="200" title="responsive"/>
    </td>
 </tr>
</table>
 
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
 
If you have any questions or suggestions, feel free to reach out to us:
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


