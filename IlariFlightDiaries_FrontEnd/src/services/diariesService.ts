import axios from 'axios'
import { DiaryEntry, DiaryWithComment, ValidationError } from '../types'
const url = 'http://localhost:3000/api'

export const getDiaries = async (): Promise<DiaryEntry[]> => {
  
  const response = await axios.get<DiaryEntry[]>(`${url}/diaries`);
  return response.data
  
}

export const newDiary = async (diaryEntry: DiaryWithComment): Promise<DiaryEntry | ValidationError> => {
  try {

    const response = await axios.post(`${url}/diaries`, diaryEntry);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { comment, ...modifiedData } = response.data;
    return modifiedData;
       
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        code: 400, 
        error: error.response?.data || 'unknown axios error'
      }
    } else {  
      return {
        code: 500, 
        error: 'server error'
      }
    }
  }
}