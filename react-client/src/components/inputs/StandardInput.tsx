import {TextField} from "@mui/material";

/**
 * Properties for the StandardInput component.
 */
interface StandardInputProps {
	/** A label to show upper the input box */
	label: string;
	/** The name of the input */
	name: string;
	/** If this field should be used for password */
	isPassword?: boolean;
	error?: string;
	isRequired?: boolean;
	/** A helper text for the user */
	placeholder?: string;
}

/**
 * A normal common standardized input component for 
 * all the forms on the application.
 */
const StandardInput = ({
	label, name, isPassword=false,
		placeholder, error, isRequired=false
}: StandardInputProps) => {
	return (
		<TextField 
			id={name}
			name={name}
			label={label}
			required={isRequired}
			error={!!error}
			helperText={error}
			placeholder={placeholder}
			type={isPassword ? "password" : "text"}
			variant="standard"
			className="px-2"
		/>
	);
}

export default StandardInput;
