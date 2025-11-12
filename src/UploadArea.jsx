import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";

export default function UploadArea({ onUpload }) {
  const inputRef = useRef(null);

  function handleFiles(files) {
    const file = files[0];
    if (!file) return;
    onUpload(file);
  }

  return (
    <Box sx={{ border: "1px dashed", p: 2, borderRadius: 1 }}>
      <Typography variant="body2">Drag & drop an image here or</Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button onClick={() => inputRef.current.click()} sx={{ mt: 1 }}>
        Choose File
      </Button>
    </Box>
  );
}
