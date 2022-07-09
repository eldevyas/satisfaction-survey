import Head from 'next/head'
import Image from 'next/image'
import Content from './../components/home/home'

export default function Home() {
  return (
    <div className="Container">
        <Head>
            <title>NTIC Rabat - Satisfaction</title>
        </Head>

        <div className="Background">
            <Image className="BackgroundImage" src={"/image/background.png"} alt="background" layout='fill' objectFit='cover'/>
        </div>
        
        <Content />
    </div>
  )
}
