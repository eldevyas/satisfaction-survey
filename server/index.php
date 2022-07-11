<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

require_once './config/database.config.php';


// Read data from JSON file in data folder and store in array
$json = file_get_contents('data/questions.json');

// Convert JSON string to PHP array
$questions = json_decode($json, true);


function console_log( $data ){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
}

// Loop through the array and print out the data


foreach($questions as $question) {
    echo "<div class=\"question\">";

    echo '<strong> Question: </strong>' . $question['question'] . '<br/>';
    echo '<strong> Type: </strong>' . $question['type'] . '<br/>';
    echo '<strong> Index: </strong>' . $question['index'] . '<br/>';

    // Insert the question in the database table (Question)
    $sql = "insert into question (Question_ID, Question_Text, Question_Type, Question_Index) values (NULL, :question, :type, :index )";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':question', $question['question']);
    $stmt->bindValue(':type', $question['type']);
    $stmt->bindValue(':index', $question['index']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo '<br class = "message success"/>';
        echo '<strong class="success">Question inserted successfully</strong>';
        echo '</br>';
    } else {
        echo '<br class = "message"/>';
        echo '<strong class="error">Failed to insert question</strong>';
        echo '<br/>';
    }

    // Get query error
    $error = $stmt->errorInfo();
    if ($error[0] != 0) {
        echo '<br class = "message"/>';
        echo '<strong class="error">' . $error[2] . '</strong>';
        echo '<br/>';
    }

    $count = 0;
    foreach ($question['choices'] as $choice) {
        $count++;
        echo '<strong> Choice ' . $count . ': </strong>' . $choice['text'] . '<br/>';

        // Insert the choice in the database table (Choice)
        $sql = "insert into answer (Answer_ID, Question_ID, Answer_Text, Answer_Index) values (NULL, :question_id, :answer_text, :answer_index )";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':question_id', $question['id']);
        $stmt->bindValue(':answer_text', $choice['text']);
        $stmt->bindValue(':answer_index', $choice['index']);
        $stmt->execute();

    }
    if ($stmt->rowCount() > 0) {
        echo '<br class = "message success"/>';
        echo '<strong> Choice has been updated.</strong>';
        echo '<br/>';
    } else {
        echo '<br class = "message"/>';
        echo '<strong class=" error"> No choice has been updated.</strong>';
        echo '<br/>';
    }

    // Get query error
    $error = $stmt->errorInfo();
    if ($error[0] != 0) {
        echo '<br class = "message"/>';
        echo '<strong class="error">' . $error[2] . '</strong>';
        echo '<br/>';
    }

    echo '</div>';
}
?>

<html>
    <head>
        <title>Console</title>
        <style>
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #050505;
                color: #f2F2F2;
                font-size: 0.75rem;
            }

            strong {
                color: rgb(40,250, 150);
                margin-right: 5px;
            }

            ::-webkit-scrollbar {
                appearance: none;
            }

            .question {
                margin-bottom: 50px;
            }

            .message {
                margin: 20px 0;
                margin-bottom: 50px;
            }

            .success {
                color:rgb(0,240, 30);
            }

            .error {
                color:rgb(240,0, 0);
            }
        </style>
    </head>
</html>
