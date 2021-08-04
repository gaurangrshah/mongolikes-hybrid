import { forwardRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@use-form/use-form";

export default function BasicForm({
  fields = [],
  initialValues = {},
  onSubmit = (values) => console.log(values),
  btnLabel = "submit",
  ...rest
}) {
  const {
    register,
    resetForm,
    state: { values },
  } = useForm({ initialValues, isControlled: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values); // pass form values back to onSubmit callback
    resetForm();
  };

  return (
    <VStack
      as='form'
      minW='300px'
      p={4}
      boxShadow='md'
      rounded='md'
      alignItems='flex-end'
      onSubmit={handleSubmit}
      {...rest}
    >
      {fields.map((field, i) => {
        const { label, ...restAttrs } = field;
        return (
          <InputGrouped
            key={label}
            id={label}
            label={label}
            {...restAttrs}
            {...register(label)}
          />
        );
      })}
      <Button type='submit' colorScheme='blue'>
        {btnLabel}
      </Button>
    </VStack>
  );
}

export const InputGrouped = forwardRef(
  ({ id, label, helperText, ...rest }, ref) => (
    <>
      <FormControl id={id}>
        <FormLabel fontSize='sm'>
          {label}
          {rest.isRequired ? "*" : ""}
        </FormLabel>
        {rest?.type === "textarea" ? (
          <Textarea {...rest} ref={ref} />
        ) : (
          <Input autoComplete='off' {...rest} ref={ref} />
        )}
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  )
);
