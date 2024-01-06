import Classification from './Classification'
import Question from './Question'

const UseProgram = () => {
  return (
    <div className="flex justify-center w-full mt-4">
      <div className="flex flex-col items-center w-5/6">
        <Question />
        <Classification />
        {/* <ProgramData /> */}
      </div>
    </div>
  )
}

export default UseProgram
