import React, {useEffect, useState} from 'react'
import * as XLSX from 'xlsx'

const FileTest = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch(
      'https://tmibucket.s3.ap-northeast-2.amazonaws.com/167957d9-2c5e-4819-a372-78681148f559.xlsx'
    )
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Excel 파일을 읽고 파싱합니다.
        const workbook = XLSX.read(buffer, {type: 'buffer'})
        // 첫 번째 시트의 이름을 가져옵니다.
        const sheetName = workbook.SheetNames[0]
        // 첫 번째 시트의 내용을 JSON으로 변환합니다.
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet)
        setData(data)
      })
      .catch(error => console.error('Error reading excel file:', error))
  }, [])

  return (
    <div>
      <h1>Excel Data</h1>
      {/* Excel 데이터를 표시합니다. */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default FileTest
// 상용순수AI: ISO 나머지: ASM 알루미늄:  합금강: AISI 티타늄: ASM 탄소강: AISI 구리: CDA
