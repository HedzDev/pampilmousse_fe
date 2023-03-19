import React from 'react';

function InputField(props: any) {
  const { handleChange, label, name, type, value } = props;
  return (
    <>
      <div className="mb-5">
        <label className="text-sm text-gray-500" htmlFor={name}>
          {label}
        </label>
        <input
          className="h-10 w-full border-b-2 bg-gray-100 px-2 text-gray-700 outline-none"
          type={type}
          onChange={handleChange}
          value={value}
          name={name}
          required
        />
      </div>
    </>
  );
}

export default InputField;
