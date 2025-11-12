import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import useMedia from "./useMedia.js";
import UploadArea from "./UploadArea.jsx";

export default function MediaLibraryModal({ open, onClose, onSelect }) {
  const { listMedia, uploadMedia, updateMedia } = useMedia();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    alt: "",
    caption: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    if (!open) return;
    listMedia().then(setItems);
  }, [open]);

  const handleUpload = async (file) => {
    const newItem = await uploadMedia(file);
    setItems((s) => [newItem, ...s]);
  };

  const handleEditSave = async () => {
    const updated = await updateMedia(editing.id, form);
    setItems(items.map((i) => (i.id === updated.id ? updated : i)));
    setEditing(null);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Media Library</DialogTitle>
      <DialogContent>
        <UploadArea onUpload={handleUpload} />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {items.map((it) => (
            <Grid item size={{ xs: 6, sm: 4, md: 3 }} key={it.id}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea onClick={() => onSelect(it)}>
                  <CardMedia
                    component="img"
                    image={it.url}
                    alt={it.name}
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                      borderRadius: "4px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" noWrap>
                      {it.title || it.fileName}
                    </Typography>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing(it);
                        setForm(it);
                      }}
                    >
                      Edit Details
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>

      {/* Metadata Edit Dialog */}
      {editing && (
        <Dialog open onClose={() => setEditing(null)} fullWidth>
          <DialogTitle>Edit Metadata</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            {["title", "alt", "caption", "description"].map((f) => (
              <TextField
                key={f}
                label={f.charAt(0).toUpperCase() + f.slice(1)}
                value={form[f] || ""}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                fullWidth
                multiline={f === "description"}
              />
            ))}
            <TextField label="Public URL" value={form.url} disabled fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
}
