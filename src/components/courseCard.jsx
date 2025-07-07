import React from "react";
import { Card, CardContent, Typography, Box, Avatar, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const courseImages = {
    JavaScript: "src/assets/javascript.png",
    Python: "src/assets/python.png",
    "HTML + CSS": "src/assets/html_css.png",
};

export default function CourseCard({
    course,
    onAddClass,
    onSubtractClass,
    onDelete,
}) {
    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: 6,
                "&:hover": { boxShadow: 12 },
            }}
        >
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar
                        src={courseImages[course.name]}
                        alt={course.name}
                        sx={{ width: 100, height: 100, mb: 1 }}
                    />
                    <Typography
                        variant="h5"
                        color="primary"
                        fontWeight="bold"
                        gutterBottom
                    >
                        {course.name}
                    </Typography>
                </Box>

                <Typography color="textSecondary">📅 Días: {course.days}</Typography>
                <Typography color="textSecondary">⏳ Horas: {course.hours}</Typography>

                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                    <IconButton
                        color="success"
                        onClick={() => onAddClass(course.name)}
                        sx={{
                            backgroundColor: "#4caf50",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#43a047" },
                        }}
                    >
                        <Add />
                    </IconButton>
                    <IconButton
                        color="warning"
                        onClick={() => onSubtractClass(course.name)}
                        sx={{
                            backgroundColor: "#ffb300",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#ffa000" },
                        }}
                    >
                        <Remove />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => onDelete(course.name)}
                        sx={{
                            backgroundColor: "#e53935",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#d32f2f" },
                        }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}
