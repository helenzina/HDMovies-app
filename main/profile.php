<?php
session_start();
?>

<!doctype html>
<html lang="en" style="min-height: 30rem;">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>


    <link rel="icon" type="../images/logo.png" href="../images/logo.png" />
    <link rel="stylesheet" href="../css/landing.css">

    <title>HDMovies - Watch TV Shows Online, Watch Movies Online</title>



</head>

<body style="min-height: 30rem;">

    <header>
        <!--nav-->
        <div class="nav container">
            <a href="landing_page.php" class="logo">
                <img src="../images/logotext red.png" alt="">
            </a>
            <div class="dropdown-box dropdown">
                <button class="dropdown dropdown-toggle" type="button" id="dropdownMenuButton1" onclick="showDropdown()"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="dropdown-text">Browse</span>
                </button>
                <ul class="dropdown-menu" id="dropMenu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="landing_page.php#home" onclick="hideDropdown()">Home</a></li>
                    <li><a class="dropdown-item" href="landing_page.php#popular" onclick="hideDropdown()">Popular</a>
                    </li>
                    <li><a class="dropdown-item" href="movies.php" onclick="hideDropdown()">Movies</a></li>
                    <li><a class="dropdown-item" href="series.php" onclick="hideDropdown()">Series</a></li>
                    <li><a class="dropdown-item" href="favourite.php" onclick="hideDropdown()">Favourite</a></li>
                </ul>
            </div>
            <!--navbar-->
            <div class="navbar">

                <a href="landing_page.php#home" class="nav-link">
                    <i class="bi bi-house"></i>
                    <span class="nav-link-title">Home</span>
                </a>

                <a href="landing_page.php#popular" class="nav-link">
                    <i class="bi bi-star"></i>
                    <span class="nav-link-title">Popular</span>
                </a>

                <a href="movies.php" class="nav-link">
                    <i class="bi bi-camera-reels"></i>
                    <span class="nav-link-title">Movies</span>
                </a>

                <a href="series.php" class="nav-link">
                    <i class="bi bi-tv"></i>
                    <span class="nav-link-title">Series</span>
                </a>

                <a href="favourite.php" class="nav-link">
                    <i class="bi bi-heart"></i>
                    <span class="nav-link-title">Favourite</span>
                </a>

            </div>

            <!--user-->
            <img src="/////profile pic from db/////" class="user-img" id="profileImage" onclick="showMenu()">
            <div class="sub-menu" id="subMenu">
                <div class="user-info">
                    <?php if (isset($_SESSION["user_id"], $_SESSION["username"])): ?>
                        <h4>
                            <?= $_SESSION["username"] ?>
                        </h4>
                    <?php endif; ?>
                </div>
                <hr>
                <a href="profile.php" class="sub-menu-link">
                    <span style="width: 100%;">
                        <i class="bi bi-person-circle"></i>
                        Profile
                    </span>
                    <span> > </span>
                </a>
                <a href="logout.php" class="sub-menu-link">
                    <span style="width: 100%;">
                        <i class="bi bi-box-arrow-right"></i>
                        Logout
                    </span>
                    <span> > </span>
                </a>
            </div>


        </div>
    </header>

    <!--home-->
    <div data-spy="scroll" data-target="navbar" data-offset="0">
        <section class="home container" id="home">
            <div class="light-style flex-grow-1 container-p-y">
                <h4 class="font-weight-bold container py-3 mb-4">
                    Account settings
                </h4>
                <div class="profile-card overflow-hidden container">
                    <div class="row g-0">
                        <div class="col-md-3 pt-0">
                            <div class="list-group" id="list-tab" role="tablist">
                                <a href="#account-general" class="list-group-item list-group-item-action active"
                                    aria-current="true" data-toggle="list" role="tab"
                                    onclick="adjustTabHeight()">General</a>
                                <a href="#account-password" class="list-group-item list-group-item-action"
                                    data-toggle="list" role="tab" onclick="adjustTabHeight()">Password</a>
                                <a href="#account-sub" class="list-group-item list-group-item-action" data-toggle="list"
                                    role="tab" onclick="adjustTabHeight()">Subscription</a>
                            </div>

                        </div>

                        <div class="col-md-9">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="account-general" role="tabpanel"
                                    aria-labelledby="general-tab" tabindex="0">
                                    <div class="profile-card-body media align-items-center p-2">
                                        <img src="///profile image///" class="user-img-change">
                                        <label for="formFile" class="form-label changeimg">
                                            <input type="text" class="form-control d-none" readonly>
                                            <button type="button" class="btn btn-outline-primary"
                                                onclick="document.getElementById('formFile').click()">
                                                Change profile image
                                            </button>
                                            <input class="form-control d-none" type="file" id="formFile">
                                        </label>


                                        <div class="mb-3 row">
                                            <label for="username" class="col-sm-2 col-form-label">Username</label>
                                            <div class="col-sm-10">
                                                <?php if (isset($_SESSION["user_id"], $_SESSION["username"])): ?>
                                                    <input type="text" readonly class="form-control-plaintext" id="username"
                                                        value="<?= $_SESSION["username"] ?>">
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="staticEmail" class="col-sm col-form-label">Email</label>
                                            <div class="col-sm-10">
                                                <?php if (isset($_SESSION["user_id"], $_SESSION["username"])): ?>
                                                    <input type="email" required onChange="onChangeEmail()"
                                                        class="form-control" id="staticEmail" aria-describedby="emailHelp"
                                                        value="<?= $_SESSION["email"] ?>">
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade show" id="account-password" role="tabpanel"
                                    aria-labelledby="password-tab" tabindex="0">
                                    <div class="profile-card-body p-2">
                                        <div class="mb-3 row">
                                            <label for="currentPassword" class="col-sm col-form-label">Current
                                                password</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control" id="currentPassword">
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="newPassword" class="col-sm col-form-label">New
                                                password</label>
                                            <div class="col-sm-8">
                                                <input type="password" title="Password must be at least 8 characters."
                                                    pattern="[a-zA-Z0-9]{8,}" name="password" required
                                                    onChange="onChangePass()" class="form-control" id="newPassword"
                                                    aria-describedby="passwordHelp" />
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="repeatPassword" class="col-sm col-form-label">Repeat new
                                                password</label>
                                            <div class="col-sm-8">
                                                <input type="password" name="repeatpassword" required
                                                    onChange="onChangePass()" class="form-control" id="repeatPassword"
                                                    aria-describedby="repeatPasswordHelp" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade show" id="account-sub" role="tabpanel"
                                    aria-labelledby="sub-tab" tabindex="0">
                                    <div class="profile-card-body p-2">
                                        <div class="mb-3 row">
                                            <label for="sub" class="col-sm col-form-label">Active plan</label>
                                            <div class="col-sm-9">
                                                <input type="text" readonly class="form-control-plaintext" id="sub"
                                                    value="">
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="change_sub" class="col-sm col-form-label">Select new
                                                plan</label>
                                            <div class="col-sm-9">
                                                <select class="form-select form-select-sm"
                                                    aria-label=".form-select-sm example">
                                                    <option value="3">3 months</option>
                                                    <option value="6">6 months</option>
                                                    <option value="12">12 months</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <div class="col-sm p-1">
                                                <label for="expire_sub" class="alert alert-warning" role="alert">
                                                    Your plan expires in <span>$days</span>days.
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 save-cancel container">
                    <button type="button" class="btn btn-primary">Save changes</button>
                    <a href="landing_page.php">
                        <button type="button" class="btn btn-light">Cancel</button>   
                    </a>
                </div>
            </div>

        </section>
    </div>

    <!--copyright-->
    <div style="padding-top: 7.5rem; text-align: center;">
        <i class="bi bi-c-circle"></i>
        <span>HDMovies All Rights Reserved</span>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    <script src="../js/profile.js"></script>
    <script src="../js/signup.js"></script>
</body>

</html>