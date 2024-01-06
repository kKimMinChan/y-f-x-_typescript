import React, {ChangeEvent, FormEvent, useCallback} from 'react'
import {useBoard} from '../../contexts'

const Question = () => {
  const {getQuestion, setQuadraticData, questionInput, setQuestionInput} = useBoard()
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuestionInput(e.target.value)
    },
    [setQuestionInput]
  )

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (questionInput?.trim() !== '') {
        setQuadraticData(null)
        getQuestion(questionInput ?? '')
      }
    },
    [questionInput, getQuestion, setQuadraticData]
  )

  return (
    <form onSubmit={onSubmit} className="flex items-center justify-around w-5/6 p-4">
      <div className="text-6xl font-bold">Q</div>
      <input
        type="text"
        name="questionInput"
        value={questionInput}
        onChange={onChange}
        className="w-5/6 p-8 m-4 text-2xl font-bold border-2 input input-primary rounded-2xl"
        placeholder="<합금분류 질문 입력>"
      />
      <button type="submit" className="text-xl font-bold rounded-full btn btn-primary">
        ENTER
      </button>
    </form>
  )
}

export default Question
