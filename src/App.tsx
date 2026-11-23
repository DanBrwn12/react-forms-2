import { useState } from 'react';
import './App.css';
import type { Training } from './types/training';
import TrainingForm from './components/TrainingForm';
import TrainingList from './components/TrainingList';

const toSortableDate = (date: string): string => {
  return date.split('.').reverse().join('');
};

function App() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const handleAddTraining = (training: Training): void => {
    setTrainings((prevTrainings) => {
      const existingTraining = prevTrainings.find((item) => item.date === training.date);

      let updatedTrainings: Training[];

      if (existingTraining) {
        updatedTrainings = prevTrainings.map((item) => {
          if (item.date === training.date) {
            return {
              ...item,
              distance: Number((item.distance + training.distance).toFixed(1)),
            };
          }
          return item;
        });
      } else {
        updatedTrainings = [...prevTrainings, training];
      }

      updatedTrainings.sort((a, b) => toSortableDate(b.date).localeCompare(toSortableDate(a.date)));
      return updatedTrainings;
    });
  };

  const handleDeleteTraining = (date: string): void => {
    setTrainings((prevTrainings) => prevTrainings.filter((item) => item.date !== date));
  };

  return (
    <div className="container">
      <TrainingForm onAddTraining={handleAddTraining} />

      <TrainingList trainings={trainings} onDeleteTraining={handleDeleteTraining} />
    </div>
  );
}

export default App;
