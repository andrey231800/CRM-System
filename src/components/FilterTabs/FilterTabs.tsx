import React from 'react';
import { FilterStatus, TodoInfo } from '../../types/Todo';
import styles from './style.module.scss';

interface FilterTabsProps {
    filter: string;
    setFilter: (filter: FilterStatus) => void;
    tabs: TodoInfo
}

const FilterTabs: React.FC<FilterTabsProps> = ({filter, setFilter, tabs}) => {

    return (
        <div className={styles.wrapper}>
                <span
                    className={`${styles.tab} ${filter === 'all' ? styles.tab_active : ''}`}
                    onClick={() => setFilter(FilterStatus.All)}
                >
                    Все({tabs.all})
                </span>
                <span
                    className={`${styles.tab} ${filter === 'inWork' ? styles.tab_active : ''}`}
                    onClick={() => setFilter(FilterStatus.InWork)}
                >
                    В работе({tabs.inWork})
                </span>
                <span
                    className={`${styles.tab} ${filter === 'completed' ? styles.tab_active : ''}`}
                    onClick={() => setFilter(FilterStatus.Completed)}
                >
                    Сделано({tabs.completed})
                </span>
         </div>
    );
};

export default FilterTabs;