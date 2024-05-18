import Part from "./Part"
import { CoursePart } from "../types"

const Content = ({ courseParts }: {courseParts: CoursePart[]}) => {
  return (
    courseParts.map((course) => {
      return (
        <div>
          <p style={{fontWeight: 'bold'}}>{course.name} {course.exerciseCount}</p>
          <Part course={course}/>
        </div>
      )
    })
  )
}

export default Content