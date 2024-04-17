import SignUpForm from "../features/authentication/SignUpForm";
import Heading from "../ui/Heading"
function SignUp() {
    return (
      <div className='mt-12'>
        <Heading as='h2'>Create your account</Heading>
        <SignUpForm />
      </div>
    );
}

export default SignUp
