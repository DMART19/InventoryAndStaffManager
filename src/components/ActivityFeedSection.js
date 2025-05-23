import React from 'react';
import DataTable from '../../components/DataTable';

const dummyActivityFeed = [
  { id: 1, activity: 'Assigned new task: Staff Review', date: '2024-02-02', initiatedBy: 'Admin', details: 'Review staff performance for Q1' },
  { id: 2, activity: 'Training Completed: First Aid', date: '2024-01-15', initiatedBy: 'System', details: 'John Doe completed First Aid training' },
];

const ActivityFeedSection = () => {
  return (
    <div className="section">
      <h2>Activity Feed</h2>
      <DataTable
        columns={[
          { Header: 'Activity', accessor: 'activity' },
          { Header: 'Date', accessor: 'date' },
          { Header: 'Initiated By', accessor: 'initiatedBy' },
          { Header: 'Details', accessor: 'details' },
        ]}
        data={dummyActivityFeed}
      />
    </div>
  );
};

export default ActivityFeedSection;