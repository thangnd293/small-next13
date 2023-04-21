import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";

interface Props {
    label: string;
    name: string;
    isRequired?: boolean
    type?: string
    placeholder?: string
}
export default function InputField({ label, name, isRequired, ...rest }: Props) {
    const [field, meta] = useField(name);
    const isError = !!(meta.touched && meta.error)

    return <FormControl isInvalid={isError} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Input {...field} {...rest} />
        {isError ? (
            <FormHelperText color='red.500'>{meta.error}</FormHelperText>
        ) : null}
    </FormControl>
}