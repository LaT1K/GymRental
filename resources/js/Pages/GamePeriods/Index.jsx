import React, { useState } from 'react';
import GamePeriodList from '../../Pages/GamePeriods/GamePeriodList';
import GamePeriodForm from '../../Pages/GamePeriods/GamePeriodForm';
import { Link } from '@inertiajs/react';

const Index = ({ gamePeriods }) => {
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateNew = () => {
        setIsCreating(true);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Період гри</h1>
            
            {isCreating ? (
                <GamePeriodForm onClose={() => setIsCreating(false)} />
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleCreateNew}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Створити новий період
                        </button>
                    </div>
                    <GamePeriodList gamePeriods={gamePeriods} />
                </>
            )}
        </div>
    );
};

export default Index;