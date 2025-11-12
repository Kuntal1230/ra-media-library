const API_BASE = process.env.REACT_APP_MEDIA_API || '/api/admin/media';

async function list() {
  const r = await fetch(API_BASE);
  if (!r.ok) throw new Error('Failed to fetch media');
  return r.json();
}

async function upload(file) {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch(API_BASE, { method: 'POST', body: fd });
  if (!r.ok) throw new Error('Upload failed');
  return r.json();
}

async function update(id, data) {
  const r = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('Update failed');
  return r.json();
}

async function del(id) {
  const r = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Delete failed');
  return r.json();
}

export default { list, upload, update, delete: del };
