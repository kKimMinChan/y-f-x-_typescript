import {Link} from 'react-router-dom'
import {Div} from '../../components'
import * as D from '../../data'
import {Button} from '../../theme/daisyui'
const Hero = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Div
        src={D.randomImage(2000, 1600, 100)}
        className="w-5/6 ml-4 rounded-3xl"
        minHeight="24rem"
        height="24rem">
        <Div minWidth="37rem" width="37rem" maxWidth="37rem">
          <div className="flex flex-col justify-center p-4 pl-8 font-bold h-96">
            <p className="text-3xl italic leading-relaxed text-white line-clamp-5">
              반갑습니다.
              <br /> 금속재료에 대한 모든 데이터를 담아가고 있는
              <br /> 딥러닝 기반의 f(x) 프로그램입니다.
            </p>

            <div className="flex mt-4">
              <Link to="/board">
                <Button className="mr-4 font-bold border-white btn-outline">
                  go to Board
                </Button>
              </Link>
              <Link to="/board">
                <Button className="font-bold border-white btn-outline">
                  go to Board
                </Button>
              </Link>
            </div>
          </div>
        </Div>
      </Div>
    </div>
  )
}

export default Hero
