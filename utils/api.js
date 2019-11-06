import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'UdacityFlashcards'


export function saveData(data) {
    AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, data)
}


export function getInitialData() {
    const value = AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    if (value !== null) {
        return (value)
    }
}


const URI = 'https://sgf-workforce-development.herokuapp.com';

export async function fetchJobs() {
    try {
        // danger, danger will robinsion, the /jobs/15 is broken as of nov 5, 2019
        // just use the events!! api end point
        let response = await fetch(`${URI}/events/15`);
        let responseJsonData = await response.json();
        return responseJsonData;
    }
    catch (e) {
        console.log(e)
    }
}

