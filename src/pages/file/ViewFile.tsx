import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFile } from "../../api/api";
import { Box, Container, Typography } from "@mui/material";

const ViewFile = () => {
  const { fileId } = useParams();
  const [content, setContent] = useState<string>("");
  const [fileType, setFileType] = useState<"html" | "pdf" | "image" | "unknown">("unknown");

  useEffect(() => {
    const getFileData = async () => {
      try {
        const response = await getFile(fileId);
        const fileContent = response.data.file.content;

        setContent(fileContent);

        // Determine type
        if (fileContent.startsWith("<")) {
          setFileType("html");
        } else if (/\.(pdf)$/i.test(fileContent)) {
          setFileType("pdf");
        } else if (/\.(jpg|jpeg|png)$/i.test(fileContent)) {
          setFileType("image");
        } else {
          setFileType("unknown");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFileData();
  }, [fileId]);

  return (
    <Container maxWidth="md" sx={{ py: 4, display: "flex", justifyContent: "center" }}>
      {fileType === "html" && (
        <Box
          dangerouslySetInnerHTML={{ __html: content }}
          sx={{
            width: "100%",
            wordWrap: "break-word",
          }}
        />
      )}

      {fileType === "pdf" && (
        <Box
          sx={{
            width: "100%",
            minHeight: { xs: "400px", md: "600px" },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 2,
          }}
        >
          <iframe
            src={content}
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </Box>
      )}

      {fileType === "image" && (
        <Box
          component="img"
          src={content}
          alt="Uploaded file"
          sx={{
            width: "100%",
            maxHeight: { xs: "300px", md: "600px" },
            objectFit: "contain",
            borderRadius: 2,
            boxShadow: 2,
          }}
        />
      )}

      {fileType === "unknown" && (
        <Typography color="error">Unsupported file type</Typography>
      )}
    </Container>
  );
};

export default ViewFile;
