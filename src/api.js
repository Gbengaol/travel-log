import axios from 'axios';
const API_URL = 'https://gbenga-travel-log.herokuapp.com/api/v1'

export async function listLogEntries(){
    const res = await axios({
        method: 'GET',
        url: `${API_URL}/logs`
    });
    return res;
}

export async function createLogEntry(entry){
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const res = await axios({
        method: 'POST',
        url: `${API_URL}/logs`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        },
        data: entry
    });
    return res;
}