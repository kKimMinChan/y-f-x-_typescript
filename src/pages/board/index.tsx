import {Div} from '../../components'
import {useBoard} from '../../contexts'
import * as D from '../../data'
import BoardList from './BoardList'

const Board = () => {
  const {posts} = useBoard()
  const len = posts?.length || 0
  const user = localStorage.getItem('user')
  const userObject = user ? JSON.parse(user) : null
  const loginId = userObject ? userObject.loginId : 'Unknown'
  return (
    <div className="flex justify-center w-full mt-8">
      <div className="flex flex-col items-center w-5/6">
        <div className="flex justify-between w-full">
          <div className="w-1/6 mt-12 mr-4">
            <div className="flex overflow-hidden border-t-2 border-b-2">
              <Div
                src={D.randomImage(2000, 1000, 100)}
                height="5rem"
                minHeight="5rem"
                width="5rem"
                minWidth="5rem"
                className="m-4 rounded-full"></Div>
              <div className="flex items-center justify-center text-2xl font-bold">
                {loginId}
              </div>
            </div>
            <div className="p-4 mt-8 border rounded-3xl h-80 bg-primary"></div>
          </div>
          <div className="w-5/6 pl-4 ">
            <div className="flex justify-between border-b-2 ">
              <div className="flex">
                <p className="text-4xl font-bold">전체글 보기</p>
                <p className="mt-1 mb-1 text-xl leading-loose ">({len}개의 글)</p>
              </div>
            </div>
            <div>
              <BoardList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
