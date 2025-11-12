import React, { useCallback } from "react";
import {
  Create,
  Edit,
  ListBase,
  SimpleForm,
  TextInput,
  useListContext,
  useCreatePath,
} from "react-admin";
import {
  Box,
  Drawer,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { times } from "lodash";

//
// ─── RESPONSIVE GRID COLUMNS ────────────────────────────────────────────────
//
const useColsForWidth = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  if (xl) return 8;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  return 2;
};

//
// ─── LOADING STATE GRID PLACEHOLDER ──────────────────────────────────────────
//
const LoadingGridList = () => {
  const { perPage } = useListContext();
  const cols = useColsForWidth();
  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {times(perPage, (key) => (
        <ImageListItem key={key}>
          <Box sx={{ bgcolor: "grey.300", height: "100%" }} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

//
// ─── LOADED GRID WITH IMAGES ────────────────────────────────────────────────
//
const LoadedGridList = () => {
  const { data, resource } = useListContext();
  const cols = useColsForWidth();
  const createPath = useCreatePath();

  if (!data) return null;

  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {data.map((record) => (
        <ImageListItem
          key={record.id}
          component={Link}
          to={createPath({ resource, id: record.id, type: "edit" })}
        >
          <img src={record.url} alt={record.title || ""} />
          <ImageListItemBar
            title={record.title || "Untitled"}
            subtitle={
              <span>
                {record.mimeType || "Unknown"} • {record.size || ""}
              </span>
            }
            sx={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

//
// ─── CONDITIONAL LOADING/LOADED GRID WRAPPER ────────────────────────────────
//
const GridImageList = () => {
  const { isPending } = useListContext();
  return isPending ? <LoadingGridList /> : <LoadedGridList />;
};

//
// ─── MAIN MEDIA LIST WITH DRAWER ────────────────────────────────────────────
//
export const MediaList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const match = matchPath("/media/:id", location.pathname);

  const handleClose = useCallback(() => {
    navigate("/media");
  }, [navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <ListBase
        perPage={24}
        sx={{
          flexGrow: 1,
          transition: (theme) =>
            theme.transitions.create(["margin"], {
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginRight: match ? "400px" : 0,
        }}
      >
        <GridImageList />
      </ListBase>

      <Drawer
        variant="persistent"
        open={!!match}
        anchor="right"
        onClose={handleClose}
        sx={{ zIndex: 1200, width: 400 }}
      >
        {!!match && <MediaEdit id={match.params.id} onCancel={handleClose} />}
      </Drawer>
    </Box>
  );
};

//
// ─── EDIT FORM ──────────────────────────────────────────────────────────────
//
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

//
// ─── CREATE FORM ───────────────────────────────────────────────────────────
//
export const MediaCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="alt" fullWidth />
      <TextInput source="caption" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  </Create>
);
