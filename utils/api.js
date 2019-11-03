import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'UdacityFlashcards'


export function saveData(data)  {
     AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, data)
}


export function getInitialData()  {
    const value =  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    if(value !== null) {
      return(value)
    }
}


const URI = 'https://sgf-workforce-development.herokuapp.com';

export async function fetchJobs() {
        try {
                let response = await fetch(URI + '/jobs/5');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }

