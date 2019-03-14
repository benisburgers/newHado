<?php
    echo "updateuser";
    die;
	// define content type
	header('Content-type: text/html; charset=utf-8');

    // store form data
    // only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST" ) {
	    // get form fields and remove whitespace.
	    $name_input = strip_tags(trim($_POST["name_input"]));
		$name_input = str_replace(array("\r", "\n"), array(" ", " "), $name_input);

        $entourage_input = strip_tags(trim($_POST["$entourage_input"]));
        $entourage_input = str_replace(array("\r", "\n"), array(" ", " "), $entourage_input);

	    $mail_input = filter_var(trim($_POST["mail_input"]), FILTER_SANITIZE_EMAIL);

	    $phone_input = strip_tags(trim($_POST["phone_input"]));
		$phone_input = str_replace(array("\r", "\n"), array(" ", " "), $phone_input);

	    $message = trim($_POST["message"]);
	} else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
	}

	// database connection
    $dbHost = 'localhost';
    $dbUser = 'root';
    $dbPass = 'root';
    $dbName = 'registrations';
    $guestTable = 'guests';

    // server
    // $dbHost = 'localhost';
    // $dbUser = 'bin-nl';
    // $dbPass = 'S4qpy6$5';
    // $dbName = 'bin_nl_';
    // $guestTable = 'participant';

    // connect database
    $con = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    $con->set_charset("utf8");

    // check connection
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
    	exit();
    }

    // initialize table if not exists
    $sql = "CREATE TABLE IF NOT EXISTS $guestTable (
    	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    	name_input VARCHAR(30) NOT NULL,
        entourage_input VARCHAR(30) NOT NULL,
    	mail_input VARCHAR(50) NOT NULL UNIQUE,
    	phone_input INT(20) NOT NULL,
    	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    	last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARACTER SET=utf8;";

    // save new record or update if email exists already
	$sql .= "INSERT INTO $guestTable (
		name_input,
		mail_input,
        entourage_input,
		phone_input) VALUES (
		'$name_input',
		'$mail_input',
		'$phone_input')
  	ON DUPLICATE KEY UPDATE
  		name_input='$name_input',
        entourage_input='$entourage_input',
  		phone_input='$phone_input',
  		last_update=CURRENT_TIMESTAMP;";

    // update database
    if ($con->multi_query($sql)) {
    	//  send notification mail to participant
    	// Check that data was sent to the mailer.
        if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        $recipient = $mail_input;

        // Set the email subject.
        $subject = "Ihre Gewinnspielteilnahme zum Skierlebnis mit Patrick Küng am 6. März 2019";

        // Build confirm-email content.
        $email_content = "Bla bla bla\n\n";
        
        $email_content .= "Name: $name_input\n";
        $email_content .= "E-Mail: $mail_input\n";
        $email_content .= "Telefonnummer: $phone_input\n\n";
        $email_content .= "Begleitperson:\n$entourage_input\n";

        // Build the email headers.
        $email_headers = "From: marko@buehler-buehler.ch";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            //echo "Thank You! Your message has been sent.";
            return true;
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($con);
    }

    // close connection
    $con->close();
 ?>
