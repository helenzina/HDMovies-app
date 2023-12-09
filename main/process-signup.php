<?php   

    $password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $mysqli= require __DIR__ . "\conn.php";

    $sql= "INSERT INTO users (username, email, password_hash)
    VALUES (?, ?, ?)";

    $stmt = $mysqli->stmt_init();

    if ( !$stmt->prepare($sql) ){
        die("SQL error: " .$mysqli->error);
    }

    $stmt->bind_param("sss", $_POST["username"], $_POST["email"], $password_hash);

    if ($stmt->execute()) {
        header("Location: successful_signup.html");
        die();  
    } else {
        //na bgainoyn mhnymata sth forma
    }
 
?>




