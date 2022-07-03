// JSON format with questions and answers for the survey, with the type of each question (React, Choose, Affirm)

export const Questions = [
    // {
    //     question: "Mes professeurs expliquent les choses d'une manière que je comprends",
    //     type: "React",
    //     answers: [
    //         {text: "Oui (100%)", value: 100},
    //         {text: "Oui (50%)", value: 50},
    //         {text: "Je ne sais pas (0%)", value: 0},
    //         {text: "Non (50%)", value: -50},
    //         {text: "Non (100%)", value: -100}
    //     ]
    // },
    {
        question: "Est-ce que l'un des éléments suivants vous empêche de faire de votre mieux à l'école ?",
        type: "Choose",
        answers: [
            {text: "Ma vie à la maison", value: 1},
            {text: "Responsabilités familiales", value: 2},
            {text: "Responsabilités parascolaires", value: 3},
            {text: "Se faire cueillir", value: 4}
        ]
    }
];
        