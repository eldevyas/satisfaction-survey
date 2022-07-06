import Image from 'next/image';

export default function Footer() {
    return(
        <footer className="Footer">
            <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50}/>

            <div className="Footer-Details">
                NTIC Rabat 2021 - 2022 | <span>DEV 111</span> | Réalisé par: <span>Yassine Chettouch</span>
            </div>

           <div className="Footer-Social"></div> 
        </footer>
    )
}