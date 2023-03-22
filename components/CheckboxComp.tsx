import React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxComp(props: any) {
  const { updateTagsFilters, tag } = props;
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: 'white',
              '&.Mui-checked': {
                color: pink[600],
              },
            }}
          />
        }
        label={tag}
        onChange={(event) => {
          const { target } = event;
          updateTagsFilters((target as HTMLInputElement).value, tag);
        }}
        className="text-white"
      />
    </>
  );
}
