import React from 'react';
import useTasks from '../hooks/useTodos';

const FilterTabs: React.FC = () => {

    const {filter, setFilter, tabs} = useTasks();

    return (
        <div className="filter-tabs">
                <span
                    className={`filter-tabs__tab ${filter === 'all' ? 'filter-tabs__tab_active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Все({tabs.all})
                </span>
                <span
                    className={`filter-tabs__tab ${filter === 'inWork' ? 'filter-tabs__tab_active' : ''}`}
                    onClick={() => setFilter('inWork')}
                >
                    В работе({tabs.inWork})
                </span>
                <span
                    className={`filter-tabs__tab ${filter === 'completed' ? 'filter-tabs__tab_active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Сделано({tabs.completed})
                </span>
         </div>
    );
};

export default FilterTabs;