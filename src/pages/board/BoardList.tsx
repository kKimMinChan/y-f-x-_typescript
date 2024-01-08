import {useCallback, useEffect, useMemo, useState} from 'react'
import {useBoard} from '../../contexts'
import {Link, useLocation, useNavigate} from 'react-router-dom'

const BoardList = () => {
  const headTexts = useMemo<string[]>(
    () => ['No', '제목', '작성자', '작성일', '조회'],
    []
  )

  //const allUsers = useMemo<D.IUser[]>(() => D.makeArray(105).map(D.makeRandomUser), [])

  const {posts} = useBoard()
  const len = posts?.length || 0

  const location = useLocation()
  const path = location.pathname.startsWith('/')
    ? location.pathname.slice(1)
    : location.pathname

  const navigate = useNavigate()
  const {listPosts} = useBoard()
  useEffect(() => {
    listPosts(path, () => navigate('/login'))
  }, [path, listPosts, navigate])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(len / itemsPerPage)

  const postList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const reversedPosts = posts ? [...posts].reverse() : []
    const currentPosts = reversedPosts ?? []
    return currentPosts.slice(start, start + itemsPerPage)
  }, [currentPage, posts])

  const head = useMemo(
    () => headTexts.map(text => <th key={text}>{text}</th>),
    [headTexts]
  )

  const handleRowClick = useCallback(
    (boardId: number) => {
      navigate(`/${path}/board/${boardId}`)
    },
    [navigate, path]
  )

  const body = useMemo(
    () =>
      postList.map((post, index) => (
        <tr
          key={post.boardId}
          onClick={() => handleRowClick(post.boardId)}
          className="cursor-pointer hover:bg-slate-800">
          <th>{post.boardId}</th>
          <td>{post.title}</td>
          <td>{post.writer}</td>
          <td>{post.createDate}</td>
          <td>{post.viewCount}</td>
        </tr>
      )),
    [handleRowClick, postList]
  )

  const pagination = useMemo(() => {
    return Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`p-2 border rounded mx-1 ${
          page === currentPage ? 'bg-blue-500 text-white' : ''
        }`}>
        {page}
      </button>
    ))
  }, [totalPages, currentPage])

  const userString = localStorage.getItem('user')
  if (userString) {
    console.log(JSON.parse(userString).loginId, 'user')
  } else {
    console.log('No user data found in localStorage')
  }

  return (
    <div>
      <div className="p-4 mt-4 overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>{head}</tr>
          </thead>
          <thead>{body}</thead>
        </table>
        <div className="flex justify-center mt-8">{pagination}</div>
        <div className="flex justify-end">
          {path !== 'data_list' && path !== 'update_information' && path !== 'news' && (
            <Link to={`/write/${path}`}>
              <button className="font-bold btn btn-primary btn-sm">글쓰기</button>
            </Link>
          )}
          {path === 'news' && JSON.parse(userString ?? '').loginId === 'dfmj2' && (
            <Link to={`/write/${path}`}>
              <button className="font-bold btn btn-primary btn-sm">글쓰기</button>
            </Link>
          )}
          {path === 'data_list' && JSON.parse(userString ?? '').loginId === 'dfmj2' && (
            <Link to={`/write/${path}`}>
              <button className="font-bold btn btn-primary btn-sm">글쓰기</button>
            </Link>
          )}
          {path === 'update_information' &&
            JSON.parse(userString ?? '').loginId === 'dfmj2' && (
              <Link to={`/write/${path}`}>
                <button className="font-bold btn btn-primary btn-sm">글쓰기</button>
              </Link>
            )}
        </div>
      </div>
    </div>
  )
}

export default BoardList
