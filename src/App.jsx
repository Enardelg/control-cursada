import React, { useState } from "react";
import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import CourseSelector from "./components/CourseSelector";
import CourseCard from "./components/CourseCard";
import { getCourses, saveCourses, resetCourses } from "./utils/storage";

export default function App() {
  const [courses, setCourses] = useState(getCourses());
  const [activeCourses, setActiveCourses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#d81b60",
      },
      background: {
        default: darkMode ? "#1a0033" : "#f5f5f5",
        paper: darkMode ? "#1E1E2F" : "#ffffff",
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleAddCourse = (courseName) => {
    if (!activeCourses.includes(courseName)) {
      setActiveCourses([...activeCourses, courseName]);
    }
  };

  const handleAddClass = (courseName) => {
    const updated = { ...courses };
    updated[courseName].days += 1;
    updated[courseName].hours += 3;
    setCourses(updated);
    saveCourses(updated);
  };

  const handleSubtractClass = (courseName) => {
    const updated = { ...courses };
    if (updated[courseName].days > 0) {
      updated[courseName].days -= 1;
      updated[courseName].hours -= 3;
    }
    setCourses(updated);
    saveCourses(updated);
  };

  const handleDeleteCourse = (courseName) => {
    setActiveCourses(activeCourses.filter((name) => name !== courseName));
    const updated = { ...courses };
    updated[courseName].days = 0;
    updated[courseName].hours = 0;
    setCourses(updated);
    saveCourses(updated);
  };

  const handleReset = () => {
    setCourses(resetCourses());
    setActiveCourses([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #2c003e, #0b002c)" // Modo oscuro
            : "linear-gradient(135deg, #e0f7fa, #b2ebf2, #80deea)", // Modo claro
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            maxWidth: 1100,
            width: "100%",
            boxShadow: darkMode
              ? "0 8px 30px rgba(0,0,0,0.8)"
              : "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              📚 Gestión de Clases
            </Typography>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          <Box mt={2}>
            <CourseSelector onAddCourse={handleAddCourse} />
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={3}
            mt={4}
          >
            {activeCourses.map((name) => (
              <CourseCard
                key={name}
                course={courses[name]}
                onAddClass={handleAddClass}
                onSubtractClass={handleSubtractClass}
                onDelete={handleDeleteCourse}
              />
            ))}
          </Box>

          {activeCourses.length > 0 && (
            <Box textAlign="center" mt={5}>
              <Button
                onClick={handleReset}
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg,rgb(2, 17, 61),rgb(52, 106, 176))" // Modo oscuro: Violeta degradado
                    : "radial-gradient(circle, #4fc3f7, #0288d1)", // Modo claro: Azul glossy
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  px: 5,
                  py: 2,
                  borderRadius: "50px",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: darkMode
                      ? "linear-gradient(135deg,rgb(105, 10, 6),rgb(238, 69, 69))" // Hover violeta
                      : "radial-gradient(circle,rgb(228, 20, 20),rgb(239, 115, 115))", // Hover azul brillante
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                🔄 Reiniciar Cursos
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
