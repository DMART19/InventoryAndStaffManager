import React, { useState } from 'react';

const PopupForm = ({ isVisible, onClose, onSubmit, formFields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  if (!isVisible) return null;

  return (
    <div className="popup-form-overlay">
      <div className="popup-form">
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
          <div className="form-buttons">
            <button type="submit" className="add-button">
              Add
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;