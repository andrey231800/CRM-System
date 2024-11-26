import React from 'react';
import { FilterStatus, TodoInfo } from '../../types/Todo';
import styles from './style.module.scss';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface FilterTabsProps {
    updateTodos: (filter: FilterStatus) => void,
    tabs: TodoInfo,
    filter?: FilterStatus
}

const FilterTabs: React.FC<FilterTabsProps> = ({updateTodos, tabs}) => {

    const items: TabsProps['items'] = [
        {
          key: FilterStatus.All,
          label: <span>Все({tabs.all})</span>,
        },
        {
          key: FilterStatus.InWork,
          label: <span>В работе({tabs.inWork})</span>
        },
        {
          key: FilterStatus.Completed,
          label: <span>Сделано({tabs.completed})</span>,
        },
      ];

    
    const onChange = (activeKey: string) => {

        if (Object.values(FilterStatus).includes(activeKey as FilterStatus)) {
            updateTodos(activeKey as FilterStatus);
        }

        
    }

    return (
        <div className={styles.wrapper}>
            <Tabs items={items} defaultActiveKey='1' onChange={onChange}/>
         </div>
    );
};

export default FilterTabs;