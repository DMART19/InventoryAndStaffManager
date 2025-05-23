import React from 'react';
import DataTable from '../../components/DataTable';

const dummyNotifications = [
  { id: 1, message: 'Certification expired for John Doe', type: 'Warning', date: '2024-02-01', actionRequired: true, details: 'CPR Certification expired on 2024-01-31' },
  { id: 2, message: 'Upcoming review for Jane Doe', type: 'Reminder', date: '2024-02-05', actionRequired: false, details: 'Annual performance review scheduled for 2024-02-05' },
];

const NotificationsSection = () => {
  return (
    <div className="section">
      <h2>Notifications & Alerts</h2>
      <DataTable
        columns={[
          { Header: 'Message', accessor: 'message' },
          { Header: 'Type', accessor: 'type' },
          { Header: 'Date', accessor: 'date' },
          { Header: 'Action Required', accessor: 'actionRequired', Cell: ({ value }) => (value ? 'Yes' : 'No') },
          { Header: 'Details', accessor: 'details' },
        ]}
        data={dummyNotifications}
      />
    </div>
  );
};

export default NotificationsSection;