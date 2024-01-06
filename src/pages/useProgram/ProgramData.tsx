import {Div} from '../../components'
import * as D from '../../data'

const ProgramData = () => {
  return (
    <div className="flex w-full mt-8">
      <div className="w-1/4 ">
        <div className="flex items-center mb-4 ml-12">
          <button className="mr-4 btn btn-primary">표준규격명</button>
          <button className="btn btn-primary">인쇄</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Div
            src={D.randomImage(2000, 1600, 100)}
            className="w-5/6 ml-4 rounded-3xl"
            minHeight="24rem"
            height="24rem"></Div>
          <div className="w-5/6 p-4 mt-8 mb-8 text-3xl font-bold text-center border-2 rounded-3xl">
            미세조직 합금명
          </div>
          <div className="w-5/6 text-5xl font-bold text-center border-2 h-80 rounded-3xl">
            상태도
          </div>
        </div>
      </div>
      <div className="w-3/4 mt-16">
        <div className="p-20 text-5xl font-bold text-center border-2 rounded-3xl">
          2차 합금의 특징
        </div>
        <div className="mt-8 text-5xl font-bold text-center border-2 pt-80 pb-80 rounded-3xl">
          특징란
        </div>
      </div>
    </div>
  )
}

export default ProgramData
