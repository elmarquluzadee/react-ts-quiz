import axios from 'axios';
import {useEffect, useState} from "react";
import './App.css'
import { count } from 'console';

function App () {

     type Question = {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
     }

      type QuizResponse = {
        results: Question[];
      }
       const [questions, setQuestions] = useState<Question[]>([]);
       const [currentQuestionIndex, setCurrentQuestions] = useState<number>(0);
       const [correctAnswers, setCorrectAnswers] = useState<number>(0);
       const [count , setCount] = useState(0);
      
      

const currentQuestion = questions[currentQuestionIndex];



      useEffect( () => {
         if (count) { axios 
            .get<QuizResponse>("https://opentdb.com/api.php?amount=15&type=multiple")
            .then((response) =>{
               setQuestions(response.data.results);
            })
            .catch(
               (err) =>{console.log(err);
               });}
        
          },[count]);

       if(questions.length === 0)
       {
         return<>
       
         <div className='start-button-item'>
         <div className='start-items'>
         <div className='quiz-start-logo'>
              <h1>Quiz Start</h1>
         </div>
         <div>
         <button className='start-button' onClick={() => setCount(count + 1)}>Start</button>
         </div>
         </div>
        </div>
         </> 
      
       }

  

      if( currentQuestionIndex >= questions.length){
        
        return <div>sual bitdi...</div>
       
       }
       
      console.log(currentQuestion);

      function handleAnswer (a : string)
      {
      if(a === currentQuestion.correct_answer){
            console.log('dogru cevab')
      }
      setCurrentQuestions((prev) => prev + 1);
      }

     return (
        <div className="App">
        <header className="App-header">
     
                 <div className='quiz-container'>
                 <h3>Quiz App</h3>
                 <div className='quiz-question-item'>
                  <div className='quiz-text-item' >
                     {currentQuestion.question}
                  </div>
                  </div>
                  <div  className='options-item'>
                  <div className='option-item'>
                  <div >
                  {currentQuestion.incorrect_answers.map((ask) => <button key={ask}
                  onClick={ () => handleAnswer(ask)} >{ask}</button>)} 
                  </div>
                  <div>
                  { <button  onClick={ () => {handleAnswer(currentQuestion.correct_answer)}} >{currentQuestion.correct_answer}</button> }
                  </div>
                  </div>
                  </div>
         </div>
              
        </header>
        </div>
     );
}

export default App;