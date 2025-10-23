export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4 font-montserrat text-center">
        404 - Page Not Found
      </h1>
      <p className="mb-8 font-montserrat text-center">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="text-primary underline font-montserrat text-center"
      >
        Go back to the homepage
      </a>
    </div>
  );
}
