export const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>
        <a
          href="/tasks"
          className="mt-6 inline-block rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};
