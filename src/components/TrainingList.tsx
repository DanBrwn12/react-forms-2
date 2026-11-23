import type { Training } from '../types/training';

interface TrainingListProps {
  trainings: Training[];
  onDeleteTraining: (date: string) => void;
}

function TrainingList({ trainings, onDeleteTraining }: TrainingListProps) {
  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>

      <div className="table-body" id="tableBody">
        {trainings.length === 0 ? (
          <div className="empty-state">Нет данных о тренировках</div>
        ) : (
          trainings.map((training) => (
            <div className="table-row" key={training.date}>
              <div className="col-date">{training.date}</div>

              <div className="col-distance">{training.distance.toFixed(1)}</div>

              <div className="col-actions">
                <button
                  type="button"
                  className="action-btn delete-btn"
                  title="Удалить"
                  aria-label={`Удалить тренировку за ${training.date}`}
                  onClick={() => onDeleteTraining(training.date)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TrainingList;
