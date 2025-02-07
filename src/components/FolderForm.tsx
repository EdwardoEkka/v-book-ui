import React, { useState } from "react";
import { createFolder } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";

const FolderForm = ({ parentId }: { parentId: string }) => {
  const [name, setName] = useState<string>("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });
  const user = useSelector((state: RootState) => state.user.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFolder({
        name,
        parentFolderId: parentId || null,
        userId: user.id,
      });
      setName("");
      setSnackbar({ open: true, message: "Folder created successfully!", severity: "success" });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error creating folder",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
        <TextField
          label="Enter folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Create Folder
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FolderForm;
