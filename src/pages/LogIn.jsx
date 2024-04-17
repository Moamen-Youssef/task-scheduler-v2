import LoginForm from "../features/authentication/LoginForm"
import Heading from "../ui/Heading";

function LogIn() {
    return (
      <div className="flex flex-col gap-2 mt-12">
        <Heading as='h2'>Login to your account</Heading>
        <LoginForm />
      </div>
    );
}

export default LogIn;