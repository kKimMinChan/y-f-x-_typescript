import React, {useEffect} from 'react'
import {useBoard} from '../../contexts'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

const BoardItem = () => {
  const param = useParams()
  const navigate = useNavigate()
  const {getBoard, board, delBoard} = useBoard()
  const location = useLocation()
  const category = `/${location.pathname.split('/')[1]}`

  useEffect(() => {
    if (param.boardId) {
      getBoard(param.boardId, () => navigate('/login'))
    }
  }, [param.boardId, getBoard, navigate])

  // useEffect(() => {
  //   if (category === '/data_list' && board?.urlList) {
  //     console.log('Excel 파일 로딩')

  //     fetch(`${board.urlList}`)
  //       .then(response => response.arrayBuffer())
  //       .then(buffer => {
  //         // Excel 파일을 읽고 파싱합니다.
  //         const workbook = XLSX.read(buffer, {type: 'buffer'})
  //         // 첫 번째 시트의 이름을 가져옵니다.
  //         const sheetName = workbook.SheetNames[0]
  //         // 첫 번째 시트의 내용을 JSON으로 변환합니다.
  //         const sheet = workbook.Sheets[sheetName]
  //         const data = XLSX.utils.sheet_to_json(sheet)
  //         setData(data)
  //       })
  //       .catch(error => console.error('Error reading excel file:', error))
  //   }
  // }, [board?.urlList, category])

  if (!board) {
    return <div>Loading...</div> // 혹은 다른 로딩 UI
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const imgs = board.urlList
    ? board.urlList.map((file, index) => (
        <div key={index}>
          <img src={file} alt="" />
        </div>
      ))
    : []

  const onDelete = () => {
    // 사용자에게 삭제를 확인
    if (param.boardId) {
      // 사용자에게 삭제를 확인
      if (window.confirm('게시물을 삭제하시겠습니까?')) {
        // 'delBoard' 함수를 호출하여 게시물 삭제
        delBoard(param.boardId, () => {
          // 삭제 후 수행할 작업, 예를 들어 목록 페이지로 이동
          navigate(category)
        })
      }
    } else {
      console.error('게시물 ID가 없습니다.')
    }
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="flex justify-between w-4/6 pt-8 pb-4 border-b-2 border-primary">
        <div className="flex text-5xl font-bold text-white">{board.title}</div>
        <div className="mt-4">
          {board.writer === localStorage.getItem('nickname') && (
            <>
              {/* <button className="mr-2 btn btn-sm btn-primary">수정</button> */}
              <button onClick={onDelete} className="btn btn-sm btn-secondary">
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end w-4/6 mt-4 mr-8">
        {board?.urlList &&
          category === '/data_list' &&
          board?.urlList.map((url, index) => (
            <a key={index} href={url} download className="btn btn-primary">
              엑셀 파일 다운로드 {index + 1}
            </a>
          ))}
      </div>
      <div className="w-4/6 p-4 mt-4 mb-4">{board.content}</div>
      {/* {data.length > 0 && (
        <div className="w-4/6 p-4 mb-12">{JSON.stringify(data, null, 2)}</div>
      )} */}
      <div className="w-4/6 p-4 mb-40">{imgs}</div>
    </div>
  )
}

export default BoardItem
