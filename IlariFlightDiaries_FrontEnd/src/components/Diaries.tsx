import { DiaryEntry } from "../types"

const Diaries = ({diaries}: {diaries: DiaryEntry[]}): JSX.Element => {
    return (
      <div> 
        {diaries.map((diary) => {
          return (
            <p key={diary.id}>Date: {diary.date} Visibility: {diary.visibility} Weather: {diary.weather}</p>
          )
        })}
      </div>
    )
}

export default Diaries