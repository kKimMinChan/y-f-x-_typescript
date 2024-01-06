import {useMemo, useState} from 'react'
import * as D from '../../data'
import CustomerComment from './CustomerComment'
import {Avatar, Div} from '../../components'

const Promotion = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const paragraphs = D.range(0, 4).map(() => D.randomParagraphs(1))
  const totalPages = paragraphs.length

  const paragraph = useMemo(() => {
    const start = currentPage - 1
    return paragraphs[start]
  }, [paragraphs, currentPage])

  const pagination = useMemo(() => {
    return Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`p-2 border rounded-full mx-1 ${
          page === currentPage ? 'bg-blue-500 text-white' : ''
        }`}></button>
    ))
  }, [totalPages, currentPage])

  const avatars = D.range(0, 4).map(index => (
    <Avatar
      key={index}
      className="inline-block -ml-6 border-8 border-white"
      size="8rem"
    />
  ))

  return (
    <section className="flex justify-center mt-4">
      <div className="flex justify-between w-5/6 p-4">
        <Div
          width="70%"
          minWidth="70%"
          minHeight="20rem"
          height="20rem"
          className="flex flex-col items-center justify-center text-white bg-primary rounded-3xl">
          <div className="flex items-center justify-center">
            <Div
              className="flex justify-center pl-12"
              width="55%"
              minWidth="55%"
              minHeight="55%">
              {avatars}
            </Div>
            <Div
              width="45%"
              minWidth="45%"
              minHeight="45%"
              className="p-8 text-2xl font-bold">
              {/* T.M.I는 울산대학교 재료공학전공 IT융합전공, 디지털 콘텐츠 디자인전공생 총
            8명으로 이루어진 창의 융합캡스톤 디자인 팀명입니다. */}
              {paragraph}
              <div className="flex items-center justify-center mt-8">{pagination}</div>
            </Div>
          </div>
        </Div>
        <Div width="25%" minWidth="25%" className=" bg-primary rounded-3xl"></Div>
      </div>
    </section>
  )
}

export default Promotion
