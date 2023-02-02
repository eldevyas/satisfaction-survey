import Image from 'next/image';

export default function Footer() {
    return(
        <footer className="Footer">
            <Image className="Logo" src={"/image/logo.png"} alt="logo" width={110} height={50}/>

            <div className="Footer-Details">
                NTIC Rabat 2022 - 2023 | <span>DEVOWFS201 111</span> | Réalisé par:<span>Aassim El Kihel</span> et <span>Yassine Chettouch</span>
            </div>

           <div className="Footer-Social"></div> 
        </footer>
    )
}
