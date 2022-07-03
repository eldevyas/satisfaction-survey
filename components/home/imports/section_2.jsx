import Image from 'next/image';

export default function Section_2() {
    return (
        <div className="Section-2">
            <div className="Text">
                <h4>Confidentialité, <br/><span>Garantie.</span></h4>

                <p>Aucune de vos données personnelles n'est enregistrée, et même les cookies ne sont pas utilisés sur l'application, nous sommes soucieux de votre vie privée et respectons que vos informations doivent être discrètes.</p>

                <p>Nous utilisons uniquement les réponses soumises aux questions sous forme de nombres pour calculer les pourcentages. Seule l'administration a l'accès pour consulter les données, et elle n'a pas accès pour savoir qui et où l'enquête a été effectuée.</p>
            </div>

            <div className="Image">
                <Image src="/image/Image2.png" alt="Confidentialité, Garantie" width={600} height={600}/>
            </div>
        </div>
    )
}