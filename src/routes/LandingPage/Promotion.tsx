import {useMemo, useState} from 'react'
import * as D from '../../data'
import {Avatar, Div} from '../../components'

const Promotion = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const paragraphs = useMemo(
    () => [
      'T.M.I는 울산대학교 재료공학전공 IT융합전공, 디지털 콘텐츠 디자인전공생 총 8명으로 이루어진 창의 융합캡스톤 디자인 팀명입니다.',
      'Try, Material, IT의 약어로 재료공학전공의 전공지식과 IT융합전공과 디지털콘텐츠 디자인전공의 프로그램 및 웹 개발 지식을 기반으로 소재에 대한 데이터를 직접 찾아보지 않고 쉽게 제공 받을 수 있는 웹사이트를 만들어보자는 의미입니다.',
      'T.M.I의 f(x)는 계속해서 발전할 것입니다. 딥러닝 기반 프로그램으로 많은 회원분들이 프로그램을 사용할수록 금속 재료의 데이터는 점점 더 정확해 질 것입니다.',
      '금속재료에 관심이 있는 모든 사람들이 원하는 데이터를 손쉽게 구할 수 있는 날이 올 때까지 T.M.I는 더욱 진보된 f(x)가 완성될 수 있도록 최선을 다하겠습니다.'
    ],
    []
  )
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
              className="p-4 text-2xl font-bold">
              {paragraph}
              <div className="flex items-center justify-center mt-4">{pagination}</div>
            </Div>
          </div>
        </Div>
        <Div width="25%" minWidth="25%" className=" bg-primary rounded-3xl"></Div>
      </div>
    </section>
  )
}

export default Promotion
