import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFile } from "../../api/api";
import { Box, Container } from "@mui/material";

const ViewFile = () => {
    const params = useParams();
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const getFileData = async () => {
            try {
                const response = await getFile(params["file-id"]); // Use bracket notation
                setContent(response.data.file.content)
            } catch (error) {
                console.error(error); // Log the error for debugging
            }
        };
        getFileData();
    }, [params]);

    return (
        <Container maxWidth="lg" sx={{py:"16px"}}>
            <Box
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{
                    padding: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    wordWrap: "break-word",
                }}
            />
        </Container>
    );
};

export default ViewFile;
