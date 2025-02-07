import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import FolderForm from "./FolderForm";
import SearchBar from "./SearchBar";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const AddFoldersAndFiles = ({ parentId }: { parentId: string }) => {
  const [openDialog, setOpenDialog] = useState<"file" | "folder" | null>(null);
  const navigate= useNavigate();
  const params= useParams();

  const handleOpenDialog = (type: "file" | "folder") => {
    setOpenDialog(type);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };



  return (
<Box 
  sx={{
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
    backdropFilter: "blur(10px)", // Adds the frosted glass effect
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Adds subtle shadow
    paddingY: "16px",
  }}
>
  <Container maxWidth="lg">
    <Stack direction="column" gap={2}>
  <SearchBar />
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)" ,
      gap: "16px",
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleOpenDialog("folder")}
    >
      <Add sx={{ display: { xs: "block", sm: "none" }, color: "white" }} />
      <Typography sx={{ display: { xs: "none", sm: "block" } }}>Create a New Folder</Typography>
      <Typography sx={{ display: { xs: "block", sm: "none" } }}>Folder</Typography>
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => navigate(`/folder/${params.id}/file-creation`)}
    >
      <Add sx={{ display: { xs: "block", sm: "none" }, color: "white" }} />
      <Typography sx={{ display: { xs: "none", sm: "block" } }}>Create a New File</Typography>
      <Typography sx={{ display: { xs: "block", sm: "none" } }}>File</Typography>
    </Button>
  </Box>

  {/* Folder Dialog */}
  <Dialog open={openDialog === "folder"} onClose={handleCloseDialog} fullWidth>
    <DialogTitle>Create a New Folder</DialogTitle>
    <DialogContent>
      <FolderForm parentId={parentId} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
    </Stack>
  </Container>
</Box>


  );
};

export default AddFoldersAndFiles;
