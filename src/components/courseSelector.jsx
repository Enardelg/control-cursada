import React from "react";
import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Avatar,
    Button,
} from "@mui/material";

const courses = [
    {
        name: "JavaScript",
        image: "/javascript.png", // Coloca aquí la ruta de la imagen
    },
    {
        name: "Python",
        image: "/python.png",
    },
    {
        name: "HTML + CSS",
        image: "/html_css.png",
    },
];

export default function CourseSelector({ onAddCourse }) {
    const [selected, setSelected] = React.useState("");

    const handleSelect = (event) => setSelected(event.target.value);

    const handleAdd = () => {
        if (selected) {
            onAddCourse(selected);
            setSelected("");
        }
    };

    return (
        <Box display="flex" gap={2} alignItems="center">
            <FormControl fullWidth>
                <InputLabel>Selecciona un curso</InputLabel>
                <Select
                    value={selected}
                    onChange={handleSelect}
                    variant="outlined"
                    renderValue={(value) => {
                        const course = courses.find((c) => c.name === value);
                        return (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                    src={course?.image}
                                    alt={course?.name}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <span>{course?.name}</span>
                            </Box>
                        );
                    }}
                >
                    {courses.map((course) => (
                        <MenuItem key={course.name} value={course.name}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                    src={course.image}
                                    alt={course.name}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <span>{course.name}</span>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#1565c0",
                    },
                }}
            >
                ➕ Agregar
            </Button>
        </Box>
    );
}
