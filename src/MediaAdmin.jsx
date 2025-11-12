import {
  Create,
  Datagrid,
  Edit,
  ImageField,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import React from "react";
export const MediaList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="url" label="Preview" sx={{ width: 80 }} />
      <TextField source="title" />
      <TextField source="alt" />
      <TextField source="caption" />
      <TextField source="description" />
    </Datagrid>
  </List>
);

export const MediaEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="alt" fullWidth />
      <TextInput source="caption" fullWidth />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="url" fullWidth disabled />
    </SimpleForm>
  </Edit>
);

export const MediaCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="alt" />
      <TextInput source="caption" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
