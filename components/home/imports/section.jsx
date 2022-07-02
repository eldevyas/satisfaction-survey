export default function Section() {
    return(
        <div className='Section'>
            <div className='Why'>
                <h2>Pourquoi faire un <span>sondage</span>?</h2>

                <p>
                Pour la meilleure satisfaction des stagiaires, l'administration de l'institut a besoin de savoir comment ils se sentent et comment les choses se passent réellement à l'intérieur des salles de classe. Nous essayons de maintenir une bonne expérience de l'éducation en améliorant nos qualités.
                </p>

                <p>Votre contribution à notre enquête est appréciée, car elle vous aiderait, ainsi que tous les futurs stagiaires, à vivre une expérience plus cool dans votre institut NTIC Rabat.</p>

            </div>

            <div className='How'>
                <h2>Comment ça <span>fonctionne</span>?</h2>

                <div className='HowInfo'>

                    <div className='Row'>
                        <div className='Left'>1.</div>
                        <div className='Right'>
                            <h4>Remplissement du sondage</h4>
                            <p>Vous remplisser le formulaire du sondage  en quelques minutes.</p>
                        </div>
                    </div>

                    <div className='Row'>
                        <div className='Left'>2.</div>
                        <div className='Right'>
                            <h4>Le système traite les données</h4>
                            <p>Toutes les statistiques de l'enquête sont calculées dans le back-end.</p>
                        </div>
                    </div>

                    <div className='Row'>
                        <div className='Left'>3.</div>
                        <div className='Right'>
                            <h4>L’administration reçoit les statistiques.</h4>
                            <p>Tableau de bord rempli avec les pourcentages et les résultats de l'enquête.</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>    
    )
}