import React from 'react';

function TextareaField(props: any) {
  const { handleChange, label, name, value } = props;

  return (
    <>
      <div>
        <label className="text-sm text-gray-500" htmlFor={name}>
          {label}
        </label>
        <textarea
          onChange={handleChange}
          name={name}
          rows={4}
          className="w-full border-b-2 bg-gray-100 p-2 outline-none"
          value={value}
        ></textarea>
      </div>{' '}
    </>
  );
}

export default TextareaField;
