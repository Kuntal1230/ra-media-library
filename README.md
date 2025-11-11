# ra-media-library

A plug-and-play **Media Library for React Admin** — manage image and file uploads easily inside your admin panel with a beautiful Material UI interface and SEO friendly features.

[![npm version](https://img.shields.io/npm/v/ra-media-library.svg?color=blue)](https://www.npmjs.com/package/ra-media-library)
[![npm downloads](https://img.shields.io/npm/dm/ra-media-library.svg)](https://www.npmjs.com/package/ra-media-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🚀 Features

- 📁 Upload images and files directly in React Admin
- 🖼️ Browse existing uploads in a gallery
- ✏️ Rename or delete media items
- 🧩 Integrates seamlessly with your `react-admin` resources

---

## 📦 Installation

```bash
npm install ra-media-library
# or
yarn add ra-media-library
```

## ⚙️ Requirements

```
| Dependency    | Version Range    |
| ------------- | ---------------- |
| react         | >=17.0.0 <20.0.0 |
| react-dom     | >=17.0.0 <20.0.0 |
| react-admin   | >=4.0.0 <6.0.0   |
| @mui/material | >=5.0.0 <8.0.0   |
```

## ⚡ Quick Setup

Here’s how to set up **ra-media-library** in your React Admin project in less than a minute:

### 1️⃣ Import Components

```jsx
import { Admin, Resource } from "react-admin";
import { MediaList, MediaEdit, MediaCreate } from "ra-media-library";
import dataProvider from "./dataProvider";

<Admin dataProvider={dataProvider}>
  {/* 👇 Your normal resources */}
  ....
  {/* 👇 Your media management system */}
  <Resource
    name="media"
    list={MediaList}
    edit={MediaEdit}
    create={MediaCreate}
  />
</Admin>;
```

### 🛠️ Optional Backend Example (Express + Multer)

```js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/media", (req, res) => {
  // Return list of uploaded files
});

app.post("/media", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

app.put("/media/:id", (req, res) => {
  // Rename or update file
});

app.delete("/media/:id", (req, res) => {
  // Delete file
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

### 🪪 License

```
MIT © Kuntal Gupta
```
