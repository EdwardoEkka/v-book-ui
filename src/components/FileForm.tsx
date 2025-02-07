import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's Snow theme
import { createFile } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FileForm = ({ parentId }: { parentId: string }) => {
  const [fileName, setFileName] = useState<string>("");
  const [content, setContent] = useState<string>(""); // For rich text
  const user = useSelector((state: RootState) => state.user.user);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      await createFile({
        fileName,
        content,
        parentFolderId: parentId,
        userId: user.id,
      });
      setFileName("");
      setContent("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error creating file");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleSubmitDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Box>
        {/* ReactQuill for Content */}
        <Box sx={{ mb: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <IconButton aria-label="go back">
              <ArrowBackIcon />
            </IconButton>
            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsDialogOpen(true)}
              sx={{ width: "fit-content" }}
            >
              Done
            </Button>
          </Stack>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent} // Quill passes the content as an argument
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
              "image",
            ]}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          />
        </Box>
        <Dialog open={isDialogOpen} onClose={handleSubmitDialog}>
          <DialogTitle>File Name</DialogTitle>
          <DialogContent>
            <TextField
              label="File Name"
              variant="outlined"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleSubmit()}
              sx={{ position: "sticky", bottom: 0, width: "fit-content" }}
            >
              Add File
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default FileForm;
