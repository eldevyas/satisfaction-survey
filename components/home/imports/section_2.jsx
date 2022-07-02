import Image from 'next/image';

export default function Section_2() {
    return (
        <div className="Section-2">
            <div className="Text">
                <h4>Confidentialité, <br/><span>Garantie.</span></h4>

                <p>Pour la meilleure satisfaction des stagiaires, l'administration de l'institut a besoin de savoir comment ils se sentent et comment les choses se passent réellement à l'intérieur des salles de classe. Nous essayons de maintenir une bonne expérience de l'éducation en améliorant nos qualités.</p>

                <p>Votre contribution à notre enquête est appréciée, car elle vous aiderait, ainsi que tous les futurs stagiaires, à vivre une expérience plus cool dans votre institut NTIC Rabat.</p>
            </div>

            <div className="Image">
                <Image src="/image/Image2.png" alt="Confidentialité, Garantie" width={600} height={600}/>
            </div>
        </div>
    )
}