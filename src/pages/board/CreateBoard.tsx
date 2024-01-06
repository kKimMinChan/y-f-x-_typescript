import {ChangeEvent, FormEvent, useCallback, useState} from 'react'
import {useBoard} from '../../contexts'
import {useNavigate, useParams} from 'react-router-dom'

type BoardFormType = Record<'title' | 'content', string>
const initialFormState = {title: '', content: ''}

const CreateBoard = () => {
  const [{title, content}, setForm] = useState<BoardFormType>(initialFormState)
  const [imageFiles, setImageFiles] = useState<File[] | null>(null)
  const {boardCategory = ''} = useParams()
  const navigate = useNavigate()

  const {createPost} = useBoard()
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    } else {
      setImageFiles(null)
    }
  }, [])

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  console.log(boardCategory, 'boarㄴㅇㄹd')

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createPost(title, content, boardCategory, imageFiles, () =>
        navigate(`/${boardCategory}`)
      )
    },
    [title, content, imageFiles, navigate, createPost, boardCategory]
  )

  return (
    <div className="flex justify-center ">
      <div className="w-5/6">
        <form onSubmit={onSubmit}>
          <div className="flex justify-between p-4 border-b-2 border-primary">
            <div className="text-3xl font-bold">글쓰기</div>
            <div>
              <button
                className="pl-8 pr-8 text-lg font-bold rounded-full btn btn-primary"
                type="submit">
                등록
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-center">
              <input
                type="text"
                name="title"
                value={title}
                onChange={changed('title')}
                placeholder="제목을 입력해 주세요."
                className="w-full p-8 m-4 text-2xl font-bold border-2 input input-primary rounded-2xl"
              />
            </div>
            <div className="flex justify-center">
              <textarea
                placeholder="내용을 입력하세요."
                name="content"
                value={content}
                onChange={changed('content')}
                cols={30}
                rows={20}
                className="w-full p-8 m-4 text-2xl font-bold border-2 textarea textarea-primary rounded-2xl"></textarea>
            </div>
            <div className="flex justify-center">
              <input
                type="file"
                className="w-full m-4 file-input file-input-primary rounded-2xl"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBoard
