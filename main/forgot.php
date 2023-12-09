<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="icon" type="/images/logo.png" href="../images/logo.png" />

    <title>HDMovies - Watch TV Shows Online, Watch Movies Online</title>

    <link rel="stylesheet" href="../css/signup.css">


</head>

<body>
    <header>
        <div class="login-top nav container">
            <a href="login.php" class="logo">
                <img src="../images/logotext red.png" alt="">
            </a>
        </div>
    </header>


    <div class="d-flex justify-content-center align-items-center container">
        <section class="login-box">
            <h2 class="text-white">Forgot Your Password</h2>
            <br />
            <p class="text-white">Enter your email address and we will send you instructions on how to create a new
                password.</p>

            <form class="mt-4" action="reset_password.php" method="post">

                <div class="mb-3 bg-white rounded px-2">
                    <label for="email" class="form-label small-text">Email Address</label>
                    <input type="email" name="email" required onChange="onChangeEmail()"
                        class="form-control border-0 p-0" id="email" aria-describedby="emailHelp" />
                </div>
                
                <button type="submit" class="btn btn-danger">Submit</button>

            </form>
        </section>

    </div>

    <div class="copyright text-white">
        <i class="bi bi-c-circle"></i>
        <span>HDMovies All Rights Reserved</span>
    </div>

    <script src="../js/signup.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

</body>

</html>