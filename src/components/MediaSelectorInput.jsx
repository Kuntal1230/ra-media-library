import { Avatar, Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useInput } from 'react-admin';
import MediaLibraryModal from './MediaLibraryModal';
import React from 'react';
export default function MediaSelectorInput(props) {
  const { source, label } = props;
  const { field } = useInput(props);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar alt="preview" src={field.value || ''} variant="rounded" sx={{ width: 96, height: 96 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField label={label || source} value={field.value || ''} onChange={(e) => field.onChange(e.target.value)} size="small" />
        <Box>
          <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
            Select Image
          </Button>
          <Button variant="text" size="small" onClick={() => field.onChange('')} sx={{ ml: 1 }}>
            Remove
          </Button>
        </Box>
      </Box>

      <MediaLibraryModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(media) => {
          field.onChange(media.url);
          setOpen(false);
        }}
      />
    </Box>
  );
}
