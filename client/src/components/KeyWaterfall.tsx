import {useSelector} from "react-redux";

export  function KeyWaterfall(){
    const training = useSelector((state: any) => state.training.value);
    const waterfallLength = 4;


    // console.log(training.training.getXNextSteps(waterfallLength));
    return(
        <div className={'h-96'}>
            {/*{training.training.getXNextSteps(waterfallLength)[2]}*/}
        </div>
    )
}