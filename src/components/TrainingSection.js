import React from 'react';
import DataTable from '../../components/DataTable';

const dummyTrainingData = [
  { staffId: 1, staff: 'John Doe', training: 'First Aid', status: 'Completed', date: '2024-01-15', instructor: 'Dr. Smith', location: 'Online' },
  { staffId: 2, staff: 'Jane Smith', training: 'OSHA Certification', status: 'Pending', date: '2024-05-30', instructor: 'Dr. Brown', location: 'On-site' },
];

const TrainingSection = () => {
  return (
    <div className="section">
      <h2>Training & Certification</h2>
      <DataTable
        columns={[
          { Header: 'Staff Name', accessor: 'staff' },
          { Header: 'Training', accessor: 'training' },
          { Header: 'Status', accessor: 'status' },
          { Header: 'Date', accessor: 'date' },
          { Header: 'Instructor', accessor: 'instructor' },
          { Header: 'Location', accessor: 'location' },
        ]}
        data={dummyTrainingData}
      />
    </div>
  );
};

export default TrainingSection;