import React from 'react';
import { FilterStatus, TodoInfo } from '../../types/Todo';
import styles from './style.module.scss';

interface FilterTabsProps {
    updateTodos: (filter: FilterStatus) => void,
    tabs: TodoInfo,
    filter: FilterStatus
}

const FilterTabs: React.FC<FilterTabsProps> = ({updateTodos, tabs, filter}) => {

    return (
        <div className={styles.wrapper}>
                <span
                    className={`${styles.tab} ${filter === 'all' ? styles.tab_active : ''}`}
                    onClick={() => updateTodos(FilterStatus.All)}
                >
                    Все({tabs.all})
                </span>
                <span
                    className={`${styles.tab} ${filter === 'inWork' ? styles.tab_active : ''}`}
                    onClick={() => updateTodos(FilterStatus.InWork)}
                >
                    В работе({tabs.inWork})
                </span>
                <span
                    className={`${styles.tab} ${filter === 'completed' ? styles.tab_active : ''}`}
                    onClick={() => updateTodos(FilterStatus.Completed)}
                >
                    Сделано({tabs.completed})
                </span>
         </div>
    );
};

export default FilterTabs;