import {Link} from '../../components'
import {Link as RRLink} from 'react-router-dom'
import {useAuth} from '../../contexts'

const NavigationBar = () => {
  const {jwt} = useAuth()

  return (
    <div className="flex justify-around m-8 mb-8 bg-base-100">
      <div className="flex p-2">
        <RRLink to="/" className="text-3xl font-bold">
          y=f(x)
        </RRLink>
      </div>
      <div className="flex items-center justify-center p-2 font-bold">
        <Link to="/" className="ml-4 mr-4">
          프로그램 소개
        </Link>
        <Link to="/use_program" className="ml-4 mr-4">
          프로그램 사용
        </Link>
        <Link to="/update_information" className="ml-4 mr-4">
          업데이트 정보
        </Link>
        <Link to="/data_list" className="ml-4 mr-4">
          데이터 목록
        </Link>
        <Link to="/data_reception" className="ml-4 mr-4">
          데이터 접수
        </Link>
        <Link to="/error_data_reception" className="ml-4 mr-4">
          오류데이터 신고
        </Link>
        <Link to="/news" className="ml-4 mr-4">
          f(x) new
        </Link>
      </div>
      <div className="flex items-center p-2">
        {!jwt && (
          <>
            <RRLink to="/login" className="btn btn-sm btn-primary">
              Login
            </RRLink>
            <RRLink to="/signup" className="ml-4 btn btn-sm btn-outline btn-primary">
              Signup
            </RRLink>
          </>
        )}
        {jwt && (
          <Link to="/logout" className="ml-4 mr-4">
            LOGOUT
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavigationBar
