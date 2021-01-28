import * as yup from "yup";

export default yup.object().shape({
  fName: yup.string().required("First name is required").min(3, "First name must be 3 chars long"),
  lName: yup.string().required('Last name is required').min(3, 'Last name must be 3 characters long'),
  email: yup.string().email("Must be a valid email").required("Email is required"),
  password: yup.string().required('Password is required'),
  terms: yup.boolean().oneOf([true], 'You are required to accept the TOS'),
});