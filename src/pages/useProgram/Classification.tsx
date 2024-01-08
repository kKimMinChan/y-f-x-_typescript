import {useEffect, useState} from 'react'
import {dataType, microImageInfos, secondMetalInfos, useBoard} from '../../contexts'
import {Div} from '../../components'
import * as XLSX from 'xlsx'

type StandardNameType = {
  [key: string]: {
    [subKey: string]: string
  }
}
const standardName: StandardNameType = {
  알루미늄: {
    상용순수Al: 'ISO',
    'Al-Mn': 'ASM',
    'Al-Mg': 'ASM',
    'Al-Cu': 'ASM',
    'Al-Mg-Si': 'ASM'
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
    'Cu-Al(Al청동)': 'CDA',
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
    setClickSecondary,
    xlsxData,
    setXlsxData
  } = useBoard()
  const [isQuadratic, setIsQuadratic] = useState<Boolean>(false)
  const [microImageData, setMicroImageData] = useState<microImageInfos | null>(null)
  // const [xlsxData, setXlsxData] = useState<any | null>(null)
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
      onClick={() => onSelectSecondary(data, data.mechaExcelUrls)}
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

  console.log(clickSecondary, 'clickSecondary')

  const onSelectFirst = (data: dataType) => {
    setQuadraticData(data)
    setIsQuadratic(!isQuadratic)
  }

  const onSelectSecondary = (data: secondMetalInfos, xlsxUrl: string) => {
    setClickSecondary(data)
    fetch(xlsxUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Excel 파일을 읽고 파싱합니다.
        const workbook = XLSX.read(buffer, {type: 'buffer'})
        // 첫 번째 시트의 이름을 가져옵니다.
        const sheetName = workbook.SheetNames[0]
        // 첫 번째 시트의 내용을 JSON으로 변환합니다.
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet)
        setXlsxData?.(data)
      })
      .catch(error => console.error('Error reading excel file:', error))
  }

  console.log(xlsxData, 'xlsxData')

  const onSelectMicroImage = (data: microImageInfos) => {
    setMicroImageData(data)
  }
  useEffect(() => {
    if (questionData) {
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
    console.log(metalName, subMetalName, 'getStandardname')
    if (metalName && subMetalName) {
      const category = standardName[metalName]
      console.log(category, standardName[metalName], '1', subMetalName)
      if (category && subMetalName in category) {
        console.log(category[subMetalName], subMetalName, '2')
        return category[subMetalName]
      }
    }
    return null
  }

  interface IExcelRow {
    [key: string]: string | number // 이 인터페이스는 엑셀 행의 각 열이 키-값 쌍으로 구성되어 있다고 가정합니다.
  }

  const createTableHeader = (data: IExcelRow[]) => {
    if (data.length > 0) {
      return (
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      )
    }
  }

  const createTableBody = (data: IExcelRow[]) => {
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {Object.values(row).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ))
  }

  // const printTable = () => {
  //   const excelTable = document.getElementById('excel-table')
  //   if (!excelTable) return // excelTable이 null이면 함수를 종료합니다.

  //   const printContents = excelTable.innerHTML
  //   const originalContents = document.body.innerHTML

  //   document.body.innerHTML = printContents
  //   window.print()
  //   document.body.innerHTML = originalContents
  // }

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
            {xlsxData && (
              <a
                href={clickSecondary?.mechaExcelUrls}
                download
                className="btn btn-primary">
                엑셀 파일 다운로드
              </a>
            )}
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
            {xlsxData ? '' : firstImages}
            {xlsxData ? (
              <table id="excel-table">
                <thead>{createTableHeader(xlsxData)}</thead>
                <tbody>{createTableBody(xlsxData)}</tbody>
              </table>
            ) : (
              <div>{quadraticData?.metalClassCharacteristic}</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Classification
