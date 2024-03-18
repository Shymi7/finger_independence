import React, {useEffect, useState} from 'react';
import {TrainingScoreInfoChart} from './TrainingScoreInfoChart'; // Import the chart component

interface WorldRecord {
    userId: string;
    username: string;
    trainingId: string;
    score: number[];
    overallScore: number;
    dateSaved: Date;
}

interface Props {
    onComponentClose: () => void;
}

export function GlobalBestScores({onComponentClose}: Props) {
    const [worldRecords, setWorldRecords] = useState<WorldRecord[]>([]);

    // Fetch the world records data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/score/world-records');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.worldRecords && data.worldRecords.length > 0) {
                    data.worldRecords.sort((a: WorldRecord, b: WorldRecord) => a.trainingId.localeCompare(b.trainingId));
                    console.log(data);
                    setWorldRecords(data.worldRecords);
                } else {
                    console.error('No world records found');
                }
            } catch (error) {
                console.error('Error fetching world records:', error);
            }
        };

        fetchData().then(() => {
            console.log(worldRecords.length);

            for (const i in worldRecords)
                console.log(i);
        });
    }, []);

    function formatDate(dateInput: Date | string | null | undefined): string {
        // Check for invalid or empty input
        if (!dateInput || !(dateInput instanceof Date || typeof dateInput === 'string')) {
            return ""; // or return an empty string "" if you prefer
        }

        // Ensure the input is treated as a Date object
        const date = new Date(dateInput);
        // Additional check if the date conversion was successful
        if (isNaN(date.getTime())) {
            return ""; // or return an empty string "" if you prefer
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    function convertIdToTrainingName(id: string): string {
        if (id == '0') return 'Basic';
        if (id == '1') return 'Intermediate';
        if (id == '2') return 'Advanced';
        if (id == '3') return 'Master';
        if (id == '4') return 'Giga Master';
        return ''
    }


    return (
        <>
            <div className={'bg-white-transparent fixed z-40 w-full h-full left-0 top-14'}>
            </div>
            <div
                className={
                    'absolute w-1/2 h-2/3 left-1/4 top-1/4 z-50 flex flex-col justify-start items-center bg-dark-custom-light border-4 border-accent-dark rounded-2xl overflow-y-scroll no-scrollbar'
                }>

                <button
                    className={'self-end text-accent font-bold text-2xl mr-4 mt-4'}
                    onClick={onComponentClose}
                >
                    X
                </button>

                {/* Flex container for two columns */}
                <div className="w-full px-4 py-2 flex flex-wrap justify-around">
                    {worldRecords.length > 0 ? (
                        worldRecords.map((record, index) => {
                                try {
                                    return (
                                        <div key={index} className="mb-4 w-1/2 px-2">
                                            <h3 className="text-lg font-semibold text-accent">Mode: {convertIdToTrainingName(record.trainingId)}</h3>
                                            <h3 className="text-lg font-semibold text-accent">Overall
                                                Score: {record.overallScore}</h3>
                                            <h3 className="text-lg font-semibold text-accent">Winner
                                                name: {record.username}</h3>
                                            <h3 className="text-lg font-semibold text-accent">Date of
                                                record: {formatDate(record.dateSaved)}</h3>
                                            {

                                                record.score &&
                                                <TrainingScoreInfoChart dataArray={record.score}/>
                                            }
                                        </div>
                                    )
                                } catch (e) {
                                    console.log(e);
                                    return <></>
                                }
                            }
                        )
                    ) : (
                        <div className="w-full text-center text-lg font-semibold text-accent">
                            No world records available.
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
