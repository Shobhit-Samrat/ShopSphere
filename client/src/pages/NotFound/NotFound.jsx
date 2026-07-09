import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">

            <h1 className="text-6xl font-bold">
                404
            </h1>

            <p className="text-gray-600 mt-3">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Go Home
            </Link>

        </div>
    );
};

export default NotFound;