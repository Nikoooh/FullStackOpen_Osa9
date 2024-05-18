import { CoursePart } from "../types"

const Part = ({ course }: {course: CoursePart}): JSX.Element => {

  switch (course.kind) {
    case "basic":
      return <p style={{fontStyle: 'italic'}}>{`${course.description} ${course.kind}`}</p>
    case "group":
      return <p style={{fontStyle: 'italic'}}>{`Group projects: ${course.groupProjectCount} ${course.kind}`}</p>
    case "background": 
      return <p style={{fontStyle: 'italic'}}>{`${course.description} ${course.kind}`} <br/> <a href={course.backgroundMaterial} target="_blank">{course.backgroundMaterial}</a></p>
    case "special":
        return <p style={{fontStyle: 'italic'}}>{`${course.description} ${course.kind}`} <br /> requirements: {
          course.requirements.map((rq, i) => {
            return (
              <i key={i}>{rq}{course.requirements.length - 1 === i ? '' : ','} </i> 
            )
          })
        }</p>
    default:
      return <></>
  }

}

export default Part