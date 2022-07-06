const Questions = [
    {
        id: 1,
        question: "Mes professeurs expliquent les choses d'une manière que je comprends",
        type: "react"
    },
    {
        id: 2,
        question: "Est-ce que l'un des éléments suivants vous empêche de faire de votre mieux à l'école ?",
        type: "choose",
        choices: [
            "Ma vie à la maison",
            "Responsabilités familiales",
            "Se faire cueillir",
            "Responsabilités parascolaires",
            "Aucune des choses ci-dessus"
        ]
    },
    {
        id: 3,
        question: "Votre professeur vous traite-t-il avec respect ?",
        type: "choose",
        choices: [
            "Non presque jamais",
            "Non",
            "Oui",
            "Oui très souvent",
            "Je ne sais pas"
        ]
    }
];


export default function handler(req, res) {
    res.status(200).json(Questions);
}