import Image from 'next/image';

export default function Widget() {
    return (
        <div className="Widget">
            <div className="WidgetBackground">
                <Image className="Noise" src= '/image/noise.png' alt="noise" layout='fill' />
            </div>


            <div className="WidgetInfo">
                <div className="WidgetInfoSides">
                    <div className="Oval">
                        24 Jun 2022
                    </div>

                    <p>Dernier Sondage</p>
                </div>

                <div className="WidgetInfoCenter">
                    <div className="Oval">
                        88%
                    </div>

                    <p>Satisfaction</p>
                </div>

                <div className="WidgetInfoCenter">
                    <div className="Oval">
                        17
                    </div>

                    <p>
                        Soummisions
                    </p>
                </div>

                <div className="WidgetInfoSides">
                    <div className="Oval">
                        05:46
                    </div>

                    <p>Temps moyen écoulé lors du sondage</p>   
                </div>
            </div>
        </div>
    )
}