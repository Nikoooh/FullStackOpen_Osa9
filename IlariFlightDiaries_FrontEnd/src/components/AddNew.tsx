import { useState } from "react"
import { newDiary } from "../services/diariesService"
import { DiaryEntry, Notification, Weather, Visibility } from "../types"
import { isError } from "../utils/functions"

interface Props {
  diaries: DiaryEntry[]
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

const AddNew = (props: Props): JSX.Element => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility | ''>('')
  const [weather, setWeather] = useState<Weather | ''>('')
  const [comment, setComment] = useState<string>('')

  const handleNew = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newEntry = {
      id: props.diaries.length + 1,
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }

    const request = await newDiary(newEntry)

    if (isError(request)) {
      props.setNotification({isError: true, message: `${request.error}. ErrorCode: ${request.code}`})
      setTimeout(() => {
        props.setNotification({isError: false, message: ''})
      }, 5000)
    } else {
      props.setDiaries(props.diaries.concat(request))
    }
    
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={handleNew}>
        date: <input value={date} type="date" name="date" placeholder="date" onChange={({ target }) => setDate(target.value)}/>
        <br/>
        <div>
          <p>Visibility</p>
          <input 
            type="radio" 
            id="great" 
            name="great" 
            value={Visibility.Great} 
            checked={visibility === Visibility.Great} 
            onChange={({target}) => setVisibility(target.value as Visibility)}
          />
          <label htmlFor="great">Great</label>

          <input type="radio" 
            id="good" 
            name="good" 
            value={Visibility.Good} 
            style={{marginLeft: '15px'}} 
            checked={visibility === Visibility.Good} 
            onChange={({target}) => setVisibility(target.value as Visibility)}
          />
          <label htmlFor="good">Good</label>

          <input 
            type="radio" 
            id="ok" 
            name="ok" 
            value={Visibility.Ok} 
            style={{marginLeft: '15px'}} 
            checked={visibility === Visibility.Ok} 
            onChange={({target}) => setVisibility(target.value as Visibility)}
          />
          <label htmlFor="ok">Ok</label>

          <input 
            type="radio" 
            id="poor" 
            name="poor" 
            value={Visibility.Poor} 
            style={{marginLeft: '15px'}} 
            checked={visibility === Visibility.Poor} 
            onChange={({target}) => setVisibility(target.value as Visibility)}
          />
          <label htmlFor="poor">Poor</label>

        </div>
        <div>
          <p>Weather</p>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value={Weather.Sunny}
            checked={weather === Weather.Sunny}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
          <label htmlFor="sunny">Sunny</label>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value={Weather.Rainy}
            style={{ marginLeft: '15px' }}
            checked={weather === Weather.Rainy}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
          <label htmlFor="rainy">Rainy</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value={Weather.Cloudy}
            style={{ marginLeft: '15px' }}
            checked={weather === Weather.Cloudy}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
          <label htmlFor="cloudy">Cloudy</label>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value={Weather.Stormy}
            style={{ marginLeft: '15px' }}
            checked={weather === Weather.Stormy}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
          <label htmlFor="stormy">Stormy</label>
          <input
            type="radio"
            id="windy"
            name="weather"
            value={Weather.Windy}
            style={{ marginLeft: '15px' }}
            checked={weather === Weather.Windy}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
          <label htmlFor="windy">Windy</label>
        </div>
        <br/>
        comment: <input value={comment} name="comment" placeholder="comment" onChange={({ target }) => setComment(target.value)}/>
        <br/><br/>
        <button type="submit">Add new</button>
      </form>
    </div>
  )
}

export default AddNew