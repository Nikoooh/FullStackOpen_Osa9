import { useEffect, useState } from "react"
import { getDiaries } from "./services/diariesService"
import { DiaryEntry, Notification } from "./types"
import Diaries from "./components/Diaries"
import AddNew from "./components/AddNew"

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [notification, setNotification] = useState<Notification>({isError: false, message: ''})
 
  useEffect(() => {
    getDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <h1> Ilaris Flight Diaries </h1>
      <p style={{color: notification.isError ? 'red' : 'green'}}>{notification.message}</p>
      <br />
      <h3>Diary entries</h3>
      <Diaries diaries={diaries}/>
      <AddNew setDiaries={setDiaries} diaries={diaries} setNotification={setNotification}/>
    </div>
  )
}

export default App
