import { IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useState } from "react"
import styles from "./styles.module.css"

export default function RoundedInput({
    name, 
    label, 
    placeholder, 
    values, 
    handleChange, 
    handleBlur, 
    touched, 
    errors,
    disabled,
    windowWidth
}) {
    const [showPassword, setShowPassword] = useState(false)

    function handleTogglePasswordVisibility(){
        setShowPassword(!showPassword)
    }
    
    return (
        <>
        <Typography sx={{
            fontSize: windowWidth < 768 ? "11px" : "12px", 
            color: "#2D2D2D",
            marginBottom: "4px"
        }}>
            {label}
        </Typography>
        <TextField
            fullWidth
            name={name}
            variant="outlined"
            type={name==="password" && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            slotProps={ name==="password" && {
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                                className={styles.visibilityIcon}
                                size={windowWidth < 768 ? "small" : "medium"}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                fontSize: windowWidth < 768 ? "11px" : "12px",
                color: 'var(--white-500)',
                mb: 1
                },
                '& .MuiOutlinedInput-input::placeholder': {
                color: 'var(--white-500)',
                opacity: 1,
                },
            }}
        />
        </>
    )
}