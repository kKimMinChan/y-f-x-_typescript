import {useEffect, useState} from 'react'
import {dataType, microImageInfos, secondMetalInfos, useBoard} from '../../contexts'
import {Div} from '../../components'

type StandardNameType = {
  [key: string]: {
    [subKey: string]: string
  }
}
const standardName: StandardNameType = {
  알루미늄: {
    상용순수AI: 'ISO',
    'AI-Mn': 'ASM',
    'AI-Mg': 'ASM',
    'AI-Mg-Si': 'ASM',
    'AI-Cu': 'ASM'
  },
  합금강: {
    Mn강: 'AISI',
    '저 Cr 합금강': 'AISI',
    Mo강: 'AISI',
    'Cr-Mo강': 'AISI',
    'Ni-Cr-Mo강': 'AISI'
  },
  탄소강: {
    '저탄소강(0.1~0.25%)': 'AISI',
    '중탄소강(0.25~0.55%)': 'AISI',
    '고탄소강(0.55~1.00%)': 'AISI'
  },
  구리: {
    'Cu-AI(AI청동)': 'CDA',
    'Cu-Zn(황동)': 'CDA',
    전해인성동: 'CDA',
    'Cu-Sn(Sn청동)': 'CDA',
    'Cu-Si(Si청동)': 'CDA',
    'Cu-Be': 'CDA'
  },
  티타늄: {
    상용순수Ti: 'ASM',
    'α-Ti': 'ASM',
    'nearα-Ti': 'ASM',
    'α-β-Ti': 'ASM',
    'β-Ti': 'ASM'
  }
}

const Classification = () => {
  const {
    questionData,
    quadraticData,
    setQuadraticData,
    clickSecondary,
    setClickSecondary
  } = useBoard()
  const [isQuadratic, setIsQuadratic] = useState<Boolean>(false)
  const [microImageData, setMicroImageData] = useState<microImageInfos | null>(null)
  //const [quadraticData, setQuadraticData] = useState<dataType | null>(null)

  const currentQuestionData = questionData
    ? [...questionData].sort((a, b) => a.rank - b.rank) // 전체 객체를 rank 기준으로 정렬
    : []

  const classifications = currentQuestionData.map((data, index) => (
    <div
      key={index}
      onClick={() => onSelectFirst(data)}
      className={`flex-shrink-0 bg-white w-72 h-52 rounded-3xl ${
        index === 0 ? '' : 'ml-4'
      } flex justify-center items-center font-bold text-3xl cursor-pointer`}>
      <span>{data.metalName}</span>
      <sub className="text-sm font-medium">({data.rank})</sub>
    </div>
  ))

  const currentQuadraticData = quadraticData?.secondMetalInfos
    ? [...quadraticData.secondMetalInfos].sort((a, b) => a.rank - b.rank)
    : []

  const quadraticClassifications = currentQuadraticData.map((data, index) => (
    <div
      key={index}
      onClick={() => onSelectSecondary(data)}
      className={`flex-shrink-0 bg-white w-72 h-52 rounded-3xl ${
        index === 0 ? '' : 'ml-4'
      } flex justify-center items-center font-bold text-3xl cursor-pointer`}>
      <span>{data.metalName}</span>
      <sub className="text-sm font-medium">({data.rank})</sub>
    </div>
  ))

  const microImages = clickSecondary?.microImageInfos.map((data, index) => (
    <Div
      key={index}
      onClick={() => onSelectMicroImage(data)}
      style={{
        backgroundImage: `url(${data.imageUrl})`,
        backgroundSize: 'contain', // 이미지가 Div를 완전히 덮도록 설정
        backgroundPosition: 'center', // 이미지가 Div의 중앙에 위치하도록 설정
        backgroundRepeat: 'no-repeat' // 이미지가 반복되지 않도록 설정
      }}
      src={data.imageUrl}
      className="w-full mb-8 cursor-pointer rounded-3xl"
      minHeight="20rem"
      height="20rem"></Div>
  ))

  const firstImages = quadraticData?.firstMetalImages.map((data, index) => (
    <Div
      key={index}
      style={{
        backgroundImage: `url(${data})`,
        backgroundSize: 'contain', // 이미지가 Div를 완전히 덮도록 설정
        backgroundPosition: 'center', // 이미지가 Div의 중앙에 위치하도록 설정
        backgroundRepeat: 'no-repeat' // 이미지가 반복되지 않도록 설정
      }}
      src={data}
      className="w-5/6 mb-8 rounded-3xl"
      minHeight="20rem"
      height="20rem"></Div>
  ))

  console.log(clickSecondary, 'asdffds')

  const onSelectFirst = (data: dataType) => {
    setQuadraticData(data)
    setIsQuadratic(!isQuadratic)
  }

  const onSelectSecondary = (data: secondMetalInfos) => {
    setClickSecondary(data)
  }
  const onSelectMicroImage = (data: microImageInfos) => {
    setMicroImageData(data)
  }
  useEffect(() => {
    if (questionData) {
      console.log('tlf')
      setIsQuadratic(false)
    }
  }, [questionData])
  useEffect(() => {
    if (quadraticData) setIsQuadratic(true)
  }, [quadraticData])

  const getStandardName = (
    metalName: string | undefined,
    subMetalName: string | undefined
  ) => {
    if (metalName && subMetalName) {
      const category = standardName[metalName]
      if (category && subMetalName in category) {
        return category[subMetalName]
      }
    }
    return null
  }

  return (
    <>
      <div className="flex items-center justify-center w-full bg-primary h-80 rounded-xl">
        <div className="flex items-center justify-center w-1/4 p-4 border-r-2">
          <div className="flex items-center justify-center text-3xl font-bold bg-white w-72 h-52 rounded-3xl">
            {quadraticData?.metalName}
          </div>
        </div>
        <div className="flex items-center justify-center w-3/4">
          <div className="flex p-4 overflow-auto">
            {isQuadratic ? quadraticClassifications : classifications}
          </div>
        </div>
      </div>
      <div className="flex w-full mt-8">
        <div className="w-2/6 ">
          <div className="flex items-center mb-4 ml-12">
            <button className="mr-4 btn btn-primary">
              {getStandardName(quadraticData?.metalName, clickSecondary?.metalName)}
            </button>
            <button className="btn btn-primary">인쇄</button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-5/6 p-4 mb-8 text-3xl font-bold text-center border-2 rounded-3xl">
              {clickSecondary ? clickSecondary.metalName : quadraticData?.metalName}
            </div>
            <div className="w-5/6 overflow-auto text-5xl font-bold text-center rounded-3xl h-350">
              {microImages}
            </div>
            {microImageData && (
              <div className="w-5/6 p-4 mb-8 overflow-auto font-bold text-center border-2 rounded-3xl text-start">
                <div>{microImageData?.imageTitle}</div>
                <div>
                  <br />
                  {microImageData?.imageCharacteristic}
                </div>
              </div>
            )}
            <Div
              style={{
                backgroundImage: `url(${clickSecondary?.conditionImageUrls[0]})`,
                backgroundSize: 'contain', // 이미지가 Div를 완전히 덮도록 설정
                backgroundPosition: 'center', // 이미지가 Div의 중앙에 위치하도록 설정
                backgroundRepeat: 'no-repeat' // 이미지가 반복되지 않도록 설정
              }}
              src={clickSecondary?.conditionImageUrls[0]}
              className="w-5/6 mb-8 rounded-3xl"
              minHeight="20rem"
              height="20rem"></Div>
          </div>
        </div>
        <div className="w-4/6 mt-16">
          <div className="p-12 font-bold text-center border-2 text-1xl rounded-3xl">
            {clickSecondary
              ? clickSecondary.metalCharacteristic
              : quadraticData?.metalCharacteristic}
          </div>
          <div className="flex flex-col items-center p-4 mt-8 overflow-auto font-bold text-center border-2 text-1xl rounded-3xl h-600">
            {firstImages}
            <div>{quadraticData?.metalClassCharacteristic}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Classification
