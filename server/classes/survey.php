<?php


// Survey class for the survey - This class will be used to add new survey submission to the database, calculate the statistics from the survey and to add new questions to the database

class Survey {
    // Constructor
    public function __construct($db) {
        $this->db = $db;
        $this->totalResponses = 0;

        $this->totalResponses = $this->getTotalResponses();

    }


    public function call()
    {
        $this->next->call();
    }

    public function testApp(){
        return "this is my sample data";
    }


    public function getTotalResponses() {
        $sql = "SELECT * FROM survey";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return count($result);
        } else {
            return 0;
        }
    }


    public function getQuestions() {
        $sql = "SELECT * FROM question";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);


        $clientAnswers = array();
        foreach ($questions as $question) {
            $sql = "SELECT * FROM answer WHERE Question_ID = :question_id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':question_id', $question['Question_ID']);
            $stmt->execute();
            $answer = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $clientAnswers[$question['Question_ID']] = array();

            foreach ($answer as $ans) {
                $clientAnswers[$question['Question_ID']][] = array(
                    'text' => $ans['Answer_Text'],
                    'value' => $ans['Answer_Index'],
                    'index' => $ans['Answer_Index'],
                    'id' => $ans['Answer_ID']
                );
            }
        }


        $result = array();

        foreach ($questions as $question) {
            $question  =  array(
                'id' => $question['Question_ID'],
                'index' => $question['Question_Index'],
                'type' => $question['Question_Type'],
                'question' => $question['Question_Text'],
                'choices' => $clientAnswers[$question['Question_ID']]
            );

            array_push($result, $question);
        }

        return $result;
    }

    public function addSurvey($survey) {        
        $surveySQL = "INSERT INTO survey (Survey_Duration) VALUES (:survey_duration)";
        $stmt = $this->db->prepare($surveySQL);
        $stmt->bindParam(':survey_duration', $survey['Duration']);
        $stmt->execute();

        // Get the ID of the survey that was just added
        $surveyID = $this->db->lastInsertId();

        $Answers = $survey['Answers'];

        // The reply table is used to store the answers to the questions
        // It contains foreign key references to the question and survey tables
        
        foreach ($Answers as $answer) {
            $replySQL = "INSERT INTO reply (Survey_ID, Question_ID, Answer_ID) VALUES (:survey_id, :question_id, :answer_id)";

            $stmt = $this->db->prepare($replySQL);
            $stmt->bindParam(':survey_id', $surveyID);
            $stmt->bindParam(':question_id', $answer['id']);
            $stmt->bindParam(':answer_id', $answer['answer']);
            $stmt->execute();
        }

        // Check if the survey was added successfully
        $sql = "SELECT * FROM survey WHERE Survey_ID = :survey_id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':survey_id', $surveyID);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }


    public function addQuestion($question) {
        $status = false;




        // Check if there is only one questions in the array
        if (count($question) == 1) {
            $question = $question[0];


            // Check if the question already exists
            $sql = "SELECT * FROM question WHERE Question_Text = :question_text";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':question_text', $question['question']);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                $status = array(
                    'status' => false,
                    'message' => 'Question already exists'
                ); 
            } else {
                $questionSQL = "INSERT INTO question (Question_Text, Question_Type, Question_Index, Question_isCalculated, Question_Behavior) VALUES (:question_text, :question_type, :question_index, :question_isCalculated, :question_behavior)";
                $stmt = $this->db->prepare($questionSQL);
                $stmt->bindParam(':question_text', $question['question']);
                $stmt->bindParam(':question_type', $question['type']);
                $stmt->bindParam(':question_index', $question['index']);
                $stmt->bindParam(':question_isCalculated', $question['isCalculated']);
                $stmt->bindParam(':question_behavior', $question['behavior']);

                $stmt->execute();
        
                // Get the ID of the question that was just added
                $questionID = $this->db->lastInsertId();
        
                $Answers = $question['choices'];
        
                // The answer table is used to store the answers to the questions
                // It contains foreign key references to the question and survey tables
                foreach ($Answers as $answer) {
                    $answerSQL = "INSERT INTO answer (Answer_Text, Answer_Index, Question_ID) VALUES (:answer_text, :answer_index, :question_id)";
        
                    $stmt = $this->db->prepare($answerSQL);
                    $stmt->bindParam(':answer_text', $answer['text']);
                    $stmt->bindParam(':answer_index', $answer['index']);
                    $stmt->bindParam(':question_id', $questionID);
                    

                    $stmt->execute();
                }
        
                // Check if the question was added successfully
                $sql = "SELECT * FROM question WHERE Question_ID = :question_id";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':question_id', $questionID);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
                if ($result) {
                    $status  = array(
                        'status' => 'success',
                        'message' => 'Signle question added successfully.'
                    );
                } else {
                    $status  = array(
                        'status' => 'error',
                        'message' => 'Error adding single question.'
                    );
                }
            }
        } else if (count($question) > 1) {
            // If there are multiple questions in the array, then we need to add them one by one
            $count = 0;
            $length = count($question);

            foreach ($question as $q) {
                // Check if the question already exists
                $sql = "SELECT * FROM question WHERE Question_Text = :question_text";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':question_text', $q['question']);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $status = array(
                        'status' => 'success',
                        'message' => 'Multiple Questions: ' . $count . ' of ' . $length . ' questions added.'
                    );
                } else {
                    $questionSQL = "INSERT INTO question (Question_Text, Question_Type, Question_Index, Question_isCalculated, Question_Behavior) VALUES (:question_text, :question_type, :question_index, :question_isCalculated, :question_behavior)";
                    $stmt = $this->db->prepare($questionSQL);
                    $stmt->bindParam(':question_text', $q['question']);
                    $stmt->bindParam(':question_type', $q['type']);
                    $stmt->bindParam(':question_index', $q['index']);
                    $stmt->bindParam(':question_isCalculated', $q['isCalculated']);
                    $stmt->bindParam(':question_behavior', $q['behavior']);
    
                    $stmt->execute();
            
                    // Get the ID of the question that was just added
                    $questionID = $this->db->lastInsertId();
            
                    $Answers = $q['choices'];
            
                    // The answer table is used to store the answers to the questions
                    // It contains foreign key references to the question and survey tables
                    foreach ($Answers as $answer) {
                        $answerSQL = "INSERT INTO answer (Answer_Text, Answer_Index, Question_ID) VALUES (:answer_text, :answer_index, :question_id)";
            
                        $stmt = $this->db->prepare($answerSQL);
                        $stmt->bindParam(':answer_text', $answer['text']);
                        $stmt->bindParam(':answer_index', $answer['index']);
                        $stmt->bindParam(':question_id', $questionID);
                        $stmt->execute();
                    }
            
                    // Check if the question was added successfully
                    $sql = "SELECT * FROM question WHERE Question_ID = :question_id";
                    $stmt = $this->db->prepare($sql);
                    $stmt->bindParam(':question_id', $questionID);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
                    if ($result) {
                        $count++;
                        $status  = array(
                            'status' => 'success',
                            'message' => 'Multiple Questions: Added ' . $count . ' of ' . $length . ' questions successfully.'
                        );
                    } else {
                        $status  = array(
                            'status' => 'success',
                            'message' => 'Multiple Questions: Added ' . $count . ' of ' . $length . ' questions successfully.'
                        );
                    }
                }
            }
        }   
        return $status;

    }

    public function getQuestionsStats() {
        $sql = "SELECT * FROM question";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $questionsStats = array();
        $count = 0;

        foreach ($result as $question) {
            $questionsStats[] = array(
                'question' => $question['Question_Text'],
                'type' => $question['Question_Type'],
                'index' => $question['Question_Index'],
                'id' => $question['Question_ID'],
                'answers' => array()
            );

            $count++;

            $sql = "SELECT * FROM answer WHERE Question_ID = :question_id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':question_id', $question['Question_ID']);
            $stmt->execute();

            $answers = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($answers as $answer) {
                $stats = array(
                    'text' => $answer['Answer_Text'],
                    'percentage' => 0,
                    'index' => $answer['Answer_Index']
                );

                // Calculate the percentage of the answer
                $sql = "SELECT COUNT(*) AS count FROM reply WHERE Answer_ID = :answer_id";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':answer_id', $answer['Answer_ID']);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                $total = $result['count'];
                $question = $questionsStats[$count - 1]['id'];
                $totalAnswers = $this->getTotalAnswers($question);

                if (doubleval($totalAnswers) == 0.0) {
                    $totalAnswers = 1;
                }

                $stats['percentage'] = round(($total / $totalAnswers) * 100, 0);

                $questionsStats[$count - 1]['answers'][] = $stats;

            }
        }

        return $questionsStats;
    }

    public function getTotalAnswers($question) {
        $sql = "SELECT COUNT(*) AS count FROM reply WHERE Question_ID = :question_id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':question_id', $question);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
    }


    public function getSatisfactionPercentage() {
        // Select questions from database where the column isCalculated is true
        $sql = "SELECT * FROM question WHERE Question_isCalculated = 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        $positiveReplies = 0;
        $negativeReplies = 0;
        $totalReplies = 0;

        $totalReplies = 0;

        $percentage = 0;


        foreach ($result as $question) {
            $questionID = $question['Question_ID'];
            $totalReplies += $this->getTotalAnswers($questionID);
        }


        foreach ($result as $r) {
            $question = $r['Question_ID'];
            $totalAnswers = $this->getTotalAnswers($question);
            
            if ($result) {
                // Select the ID of the answer of each reply
                $sql = "SELECT Answer_ID FROM reply WHERE Question_ID = :question_id";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':question_id', $question);
                $stmt->execute();

                $answers = $stmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($answers as $answer) {
                    $sql = "SELECT * FROM answer WHERE Answer_ID = :answer_id";
                    $stmt = $this->db->prepare($sql);
                    $stmt->bindParam(':answer_id', $answer['Answer_ID']);
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);

                    // Get the number of answers of the question
                    $totalAnswers = $this->getTotalAnswers($result['Question_ID']);
                    $middle = floor( $totalAnswers / 2 );

                    if ($r["Question_Behavior"] === "positive"){
                        if ($result['Answer_Index'] > $middle) {
                            $positiveReplies++;
                        } else {
                            $negativeReplies++;
                        }
                    } else {
                        if ($result['Answer_Index'] > $middle) {
                            $negativeReplies++;
                        } else {
                            $positiveReplies++;
                        }
                    }
                }
            }
        }

        // Check if division is possible
        if ($totalReplies == 0) {
            $percentage = 0;
        } else {
            $percentage = round(($positiveReplies / $totalReplies) * 100, 0);
        }

        return $percentage;
    }



    function getTotalSubmissions() {
        $sql = "SELECT COUNT(*) AS count FROM survey";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
    }

    function getAverageDuration() {
        $sql = "SELECT AVG(Survey_Duration) AS average FROM survey";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['average'];
    }


    function getLastSurveyDate() {
        $sql = "SELECT Survey_Date FROM survey ORDER BY Survey_Date DESC LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['Survey_Date'];
    }


    public function getGlobalStats() {
        return array(
            'satisfaction' => $this->getSatisfactionPercentage(),
            'soumissions' => $this->getTotalSubmissions(),
            'duration' => $this->getAverageDuration(),
            'dernier' => $this->getLastSurveyDate(),
            'questions' => $this->getQuestionsStats()
        );
    }


}