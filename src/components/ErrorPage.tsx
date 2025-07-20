import { useNavigate } from 'react-router';
interface ErrorPageProps{
  errorMsg: string;
}
export const ErrorPage = ({errorMsg} : ErrorPageProps) => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 3000);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-700 mb-2">
        {errorMsg}
      </p>
      <p className="text-gray-500">
        Redirecting you to the home page...
      </p>
    </div>
  );
}
