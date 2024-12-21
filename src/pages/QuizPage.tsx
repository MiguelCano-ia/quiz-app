import { useEffect, useState } from 'react';
import { getCountries } from '../helpers/getCountries';
import { Countries } from '../interfaces';

import './quizPage.css';

interface QuestionAnswer {
  question: string,
  correctAnswer: string,
  finalOptions: string[],
}

export const QuizPage = () => {

  const [ countries, setCountries ] = useState<Countries[]>([]);
  const [ questions, setQuestions ] = useState<string[]>([]);
  const [ currenteIndex, setCurrenteIndex ] = useState(0);
  const [ options, setOptions ] = useState<string[][]>([]);
  const [ correctAnswers, setCorrectAnswers ] = useState<string[]>([]);

  const getTenCountries = async () => {
    const tenCountries = await getCountries();
    setCountries( tenCountries );
    getQuestionsAndAnswer();
  }

  const getQuestionsAndAnswer = () => {
    const generatedQuestionsAndAnswer = countries.map(( country ) => {
      const random = Math.floor(Math.random() * 3) + 1; 
      switch ( random ) {
        case 1:
          { 
            const question = `Which country is ${ country.capital } the capital?`;
            const correctAnswer = country.name.common;
            const options = countries.map( country => country.name.common ).sort( () => Math.random() - 0.5).slice(0, 3);
            const finalOptions = [...options, correctAnswer].sort( () => Math.random() - 0.5 )
            return { question, correctAnswer, finalOptions } 
          }
        case 2:
          {
            const question = `Which capital is ${ country.name.common } the country?`;
            const correctAnswer = country.capital;
            const options = countries.map( country => country.capital ).sort( () => Math.random() - 0.5).slice(0, 3);
            const finalOptions = [...options, correctAnswer].sort( () => Math.random() - 0.5 ).flat();
            return { question, correctAnswer, finalOptions } 
          }
        case 3:
          {
            const question = `Which country does this flag ${ country.flag } belong to?`;
            const correctAnswer = country.name.common;
            const options = countries.map( country => country.name.common ).sort( () => Math.random() - 0.5).slice(0, 3);
            const finalOptions = [...options, correctAnswer].sort( () => Math.random() - 0.5 )
            return { question, correctAnswer, finalOptions } 
          }
      }
    }) as QuestionAnswer[];
    
    const questions = generatedQuestionsAndAnswer.map( question => question.question );
    const correctAnswers = generatedQuestionsAndAnswer.map( answer => answer.correctAnswer );
    const finalOptions = generatedQuestionsAndAnswer.map( option => option.finalOptions );

    setQuestions( questions );
    setCorrectAnswers( correctAnswers );
    setOptions( finalOptions );
  }

  const showQuestion = ( idx: number ) => {
    setCurrenteIndex( idx );
  }

  useEffect( () => {
    getTenCountries();
  }, []);

  return (
    <main>
      <h1>Country Quiz</h1>
      <div className='quiz-questions'>
        {
          questions.map( (_, index) => (
            <button key={ index }
              className='questions-button'
              onClick={ () => showQuestion( index )}
            >
              { index + 1 }
            </button>
          ))
        }
      </div>
      <h2>{ questions[currenteIndex] }</h2>
      <div className='options-container'>
        {
          options[currenteIndex]?.map( ( option, idx ) => (
            <button key={ idx }
              className='options-button'
            >
              { option }
            </button>
          ))
        }
      </div>
    </main>
  )
}
