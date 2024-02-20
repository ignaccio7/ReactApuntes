import { IconLogo } from "../icons";
import { Title } from "./Tags";

export default function SplashScreen(){
  return(
    <div className="splashscreen">
      <IconLogo size={{width:"150", height:"150"}}/>
      <Title/>
    </div>
  )
}