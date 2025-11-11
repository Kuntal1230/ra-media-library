# ra-media-library

A plug-and-play **Media Library for React Admin** — manage image and file uploads easily inside your admin panel with a beautiful Material UI interface.

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
