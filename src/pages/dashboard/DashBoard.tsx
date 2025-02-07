import { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllFilesOfUser, getAllFoldersOfUser } from "../../api/api";
import FileDisplay from "../../components/file/FileDisplay";

const DashBoard = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [folders, setFolders] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [filteredFilesData, setFilteredFilesData] = useState([]);

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        const response = await getAllFilesOfUser(user.id);
        setFiles(response.data.files);

        // Extract unique dates from files
        const dates = response.data.files.map(
          (file: any) => new Date(file.createdAt.split("T")[0])
        );
        setHighlightedDates(dates);
      } catch (error) {
        console.error(error);
      }
    };

    const getAllFolders = async () => {
      try {
        const response = await getAllFoldersOfUser(user.id);
        setFolders(response.data.folders);
      } catch (error) {
        console.error(error);
      }
    };
    getAllFiles();
    getAllFolders();
  }, [user.id]);

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const dateString = date.toLocaleDateString("en-CA"); // 'en-CA' gives YYYY-MM-DD format
      const filteredFiles = files?.filter((file: any) =>
        file.createdAt.startsWith(dateString)
      );
      setFilteredFilesData(filteredFiles || []);
    } else {
      setFilteredFilesData([]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: "16px" }}>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Active Days
        </Typography>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelection}
          dateFormat="yyyy-MM-dd"
          highlightDates={highlightedDates}
          inline
        />
      </Paper>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Total Folders
            </Typography>
            <Typography variant="h6">{folders.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Total Files
            </Typography>
            <Typography variant="h6">{files.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {filteredFilesData.length > 0 ? (
          filteredFilesData.map((item, index) => (
            <FileDisplay file={item} key={index} />
          ))
        ) : (
          <Typography variant="body1" sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No files available for the selected date.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default DashBoard;
