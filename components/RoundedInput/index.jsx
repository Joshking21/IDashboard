import { TextField, Typography } from "@mui/material"

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
}) {
    
    return (
        <>
        <Typography sx={{fontSize: "12px", color: "#2D2D2D"}}>
            {label}
        </Typography>
        <TextField
            fullWidth
            name={name}
            variant="outlined"
            placeholder={placeholder}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                fontSize: "12px",
                color: 'var(--white-500)',
                mb: 0
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
