import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react'
import {useAuth} from './AuthContext'
import {get, post, postFormData} from '../server'
import {post as postRequest} from '../server'
type Callback = () => void

type Post = {
  boardId: number
  title: string
  content: string
  writer?: string
  viewCount?: number
  createDate?: string
  urlList?: string[]
}

export type dataType = {
  firstMetalImages: string[]
  metalCharacteristic: string
  metalClassCharacteristic: string
  metalName: string
  rank: number
  secondMetalInfos: secondMetalInfos[]
}

export type secondMetalInfos = {
  conditionImageUrls: string[]
  mechaExcelUrls: string[]
  metalCharacteristic: string
  metalName: string
  microImageInfos: microImageInfos[]
  rank: number
}

export type microImageInfos = {
  imageCharacteristic: string
  imageTitle: string
  imageUrl: string
}

// type CreatePost = {
//   title: string,
//   content: string,
//   boardCategory: string
// }

type ContextType = {
  posts?: Post[]
  board?: Post | null
  questionData?: dataType[] | null
  quadraticData?: dataType | null
  questionInput?: string | ''
  clickSecondary?: secondMetalInfos | null
  setQuadraticData: (data: dataType | null) => void
  setQuestionInput: (data: string) => void
  setClickSecondary: (data: secondMetalInfos | null) => void
  createPost: (
    title: string,
    content: string,
    boardCategory: string,
    imageFiles: File[] | null,
    callback?: Callback
  ) => void
  listPosts: (category: string, callback?: Callback) => Promise<Post[]>
  getBoard: (boardId: string, callback?: Callback) => void
  getQuestion: (question: string, callback?: Callback) => void
  delBoard: (boardId: string, callback?: Callback) => void
}

export const BoardContext = createContext<ContextType>({
  createPost: (
    title: string,
    content: string,
    boardCategory: string,
    imageFiles: File[] | null,
    callback?: Callback
  ) => {},
  listPosts: (category: string, callback?: Callback) => Promise.resolve([]), // 초기값으로 빈 배열을 반환하는 Promise를 설정
  getBoard: (boardId: string, callback?: Callback) => Promise.resolve([]),
  getQuestion: (question: string, callback?: Callback) => Promise.resolve([]),
  setQuadraticData: (data: dataType | null) => {},
  setQuestionInput(data) {},
  delBoard(boardId, callback) {},
  setClickSecondary(data) {}
})

type BoardProviderProps = {}

export const BoardProvider: FC<PropsWithChildren<BoardProviderProps>> = ({children}) => {
  const {jwt} = useAuth()
  const [posts, setPost] = useState<Post[]>([])
  const [board, setBoard] = useState<Post | null>(null)
  const [questionData, setQuestionData] = useState<dataType[] | null>([])
  const [quadraticData, setQuadraticData] = useState<dataType | null>(null)
  const [questionInput, setQuestionInput] = useState<string | ''>('')
  const [clickSecondary, setClickSecondary] = useState<secondMetalInfos | null>(null)

  const {setJwt} = useAuth()
  const createPost = useCallback(
    (
      title: string,
      content: string,
      boardCategory: string,
      imageFiles: File[] | null,
      callback?: Callback
    ) => {
      const formData = new FormData()

      formData.append(
        'boardPostRequest',
        new Blob([JSON.stringify({title, content, boardCategory})], {
          type: 'application/json'
        })
      )

      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach(file => {
          formData.append('files', file)
        })
      }

      postFormData('/api/v1/member/board', formData, jwt)
        .then(res => console.log(res.json()))
        .finally(() => callback?.())
        .catch((e: Error) => console.log(e))
    },
    [jwt]
  )

  const listPosts = useCallback(
    (category: string, callback?: Callback): Promise<Post[]> => {
      return get(`/api/v1/member/${category}/boards`, jwt)
        .then(res => res.json())
        .then((response: {isSuccess: boolean; data: Post[]; code: number}) => {
          console.log(response, 'res')
          if (response.isSuccess) {
            setPost(response.data)
            return response.data
          } else {
            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
            if (response.code === 3000) setJwt('')
            throw new Error('Failed to fetch posts')
          }
        })
        .catch(error => {
          console.error('Error fetching posts:', error)

          // callback?.()
          return []
        })
    },
    [jwt, setJwt]
  ) // 의존성 배열에 jwt를 포함시켜야 합니다.

  const getBoard = useCallback(
    (boardId: string, callback?: Callback) => {
      return get(`/api/v1/member/board/${boardId}`, jwt)
        .then(res => res.json())
        .then((response: {isSuccess: boolean; data: Post}) => {
          if (response.isSuccess) {
            console.log(response.data, 'getBoard')
            setBoard(response.data)
          } else {
            // callback?.()
            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
            setJwt('')
            throw new Error('Failed to fetch the board')
          }
        })
        .catch(error => {
          console.error('Error fetching the board:', error, 'err')
          throw error // 예외를 던져 호출하는 곳에서 처리할 수 있도록 함
        })
    },
    [jwt, setJwt]
  )

  const getQuestion = useCallback(
    (question: string, callback?: Callback) => {
      const encodedQuestion = encodeURIComponent(question)
      return get(`/api/v1/member/question?question=${encodedQuestion}`, jwt)
        .then(res => res.json())
        .then((response: {isSuccess: boolean; data: dataType[]; code: number}) => {
          console.log(response, 'res')
          if (response.isSuccess) {
            setQuestionData(response.data)
            setClickSecondary(null)
          } else {
            if (response.code === 3000) {
              localStorage.removeItem('jwt')
              localStorage.removeItem('user')
              setJwt('')
            }
            //throw new Error('Failed to fetch the board')
          }
        })
    },
    [setQuestionData, setJwt, jwt]
  )

  const delBoard = useCallback((boardId: string, callback?: Callback) => {
    // const
  }, [])

  //상태도 사진 미세조직 사진
  // 1차 분류 합금강 엑셀 파일의 특징 설명 부분이 오른쪽 위에 들어가면 됨.
  // 1차 2번쨰 특징란 합금분류 이미지랑 밑에 텍스트
  // 1차에서는 왼쪽 사용 안함
  // 표준 규격명 2번째 시트 이름 aisi

  const value = {
    createPost,
    listPosts,
    posts,
    getBoard,
    board,
    questionData,
    getQuestion,
    quadraticData,
    setQuadraticData,
    questionInput,
    setQuestionInput,
    delBoard,
    clickSecondary,
    setClickSecondary
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

export const useBoard = () => {
  return useContext(BoardContext)
}
