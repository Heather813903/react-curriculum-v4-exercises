import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  // HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options);
  const { state, dispatch } = useContext(SurveyContext);
  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
    } else {
      setWorkingText(question.question);
      setWorkingOptions(question.options);
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  const handleSave = () => {
    if (workingText.trim()) {
      dispatch({
        type: 'UPDATE_QUESTION_TEXT',
        payload: {
          id: question.id,
          newText: workingText.trim(),
        },
      });

      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...workingOptions];
    updatedOptions[index] = value;
    setWorkingOptions(updatedOptions);
  };

  const handleOptionSave = (index) => {
    if (workingOptions[index].trim()) {
      dispatch({
        type: 'UPDATE_OPTION_TEXT',
        payload: {
          questionId: question.id,
          optionIndex: index,
          newText: workingOptions[index].trim(),
        },
      });
    }
  };

  const handleOptionDelete = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });

    setWorkingOptions((options) => options.filter((_, i) => i !== index));
  };

  const handleAddOption = () => {
    const optionText = window.prompt('Enter new option:');

    if (optionText?.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: {
          questionId: question.id,
          optionText: optionText.trim(),
        },
      });

      setWorkingOptions((options) => [...options, optionText.trim()]);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (confirmed) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { id: question.id },
      });
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>

        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />

            <button onClick={handleSave} disabled={!workingText.trim()}>
              Save
            </button>

            <button onClick={handleEdit}>Cancel</button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          {isEditing ? (
            <>
              <ul>
                {workingOptions.map((option, index) => (
                  <li key={index} className={styles['option-item']}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleOptionSave(index)}
                      disabled={!option.trim()}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleOptionDelete(index)}
                      disabled={workingOptions.length <= 2}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              <button onClick={handleAddOption}>+ Add Option</button>
            </>
          ) : (
            <ul>
              {question.options.map((option, index) => (
                <li key={index} className={styles['option-item']}>
                  <span className={styles['option-text']}>{option}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
