import React from 'react'
import { CustomInputContainer } from './custominput.styled'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const CustomInput = ({questionNo,question,_id}) => {

  const survey_id = useParams().id;
  const answer = useRef(null);
  const user_id = localStorage.getItem('user_id')?localStorage.getItem('user_id'):'6426cb196f3bb0a8d860bb23';

  const handleClick = async (e) => {
    const data={
      survey:{
        id:survey_id,
      },
      question:{
        id:_id,
      },
      answer:answer.current.value,
      respondent:{
        id:user_id,
      }
    }
    const res = await axios.post(`http://localhost:4949/api/v1/survey/${survey_id}/responses`,data,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.data)
  }
  return (
    <CustomInputContainer>
        <h3>Question <span>{questionNo+1}</span></h3>
        <h1>{question}</h1>
        <input type="text" ref={answer}/>
        <button onClick={handleClick}>Save</button>
    </CustomInputContainer>
  )
}
