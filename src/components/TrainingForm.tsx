import { useState, type SubmitEvent } from 'react';
import type { Training } from '../types/training';

interface TrainingProps {
  onAddTraining: (training: Training) => void;
}

function TrainingForm({ onAddTraining }: TrainingProps) {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');

  const validDate = (value: string): boolean => {
    const patternDate = /^\d{2}\.\d{2}\.\d{4}$/;

    if (!patternDate.test(value)) {
      return false;
    }

    const [day, month, year] = value.split('.').map(Number);

    const newDate = new Date(0);
    newDate.setFullYear(year, month - 1, day);

    return (
      newDate.getDate() === day &&
      newDate.getMonth() === month - 1 &&
      newDate.getFullYear() === year
    );
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!validDate(date)) {
      setError('Введите корректную дату в формате ДД.ММ.ГГГГ');
      return;
    }

    const training: Training = {
      date,
      distance: Number(distance),
    };

    onAddTraining(training);

    setDate('');
    setDistance('');
    setError('');
  };

  return (
    <div className="form-container">
      <form id="trainingForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
            <input
              type="text"
              id="date"
              name="date"
              placeholder="20.07.2019"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="5.7"
              step={0.1}
              min={0}
              required
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            OK
          </button>
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default TrainingForm;
