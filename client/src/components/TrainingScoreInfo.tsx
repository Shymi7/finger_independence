import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {TrainingScoreInfoChart} from "./TrainingScoreInfoChart.tsx";
import axios from "axios";
import {loginData} from "../utils/data.ts";
import {AuthService} from "../utils/AuthService.ts";

export function TrainingScoreInfo() {
    const training = useContext(TrainingContext);

    interface SaveScoreParams {
        userId: string;
        username: string;
        trainingId: string;
        score: number[];
        token: string;
    }

    const saveScore = async ({userId, username, trainingId, score, token}: SaveScoreParams): Promise<void> => {
        try {
            const response = await axios.post(loginData.MainApiPath + 'score/save-score',
                {userId, username, trainingId, score},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    const movesData = training.trainingScore.getArrayWithRightMovesInEachInterval(1000);

    const dataForRequest: SaveScoreParams = {
        userId: AuthService.getLoggedUserData()?.userId!,
        username: AuthService.getLoggedUserData()?.userName!,
        trainingId: training.trainingMode.id.toString(),
        score: movesData,
        token: AuthService.getLoggedUserData()?.authenticationToken!
    }

    saveScore(dataForRequest);

    return (
        <div className={'w-full h-full'}>
            <TrainingScoreInfoChart
                dataArray={movesData}
            />
        </div>
    )
}