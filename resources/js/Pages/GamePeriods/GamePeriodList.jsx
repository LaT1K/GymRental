import React from 'react';
import Card from '@/Components/Card';

const GamePeriodList = ({ gamePeriods }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamePeriods.map(period => (
            <Card key={period.id} title={`Період з ${period.start_date} по ${period.end_date}`}>
                <p>Тривалість: {period.duration_weeks} тижнів</p>
            </Card>
        ))}
    </div>
);

export default GamePeriodList;
