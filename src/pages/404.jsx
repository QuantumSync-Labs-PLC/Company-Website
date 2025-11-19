import { Link } from "react-router-dom";
import PageMeta from "../components/common/PageMeta";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-qs-bg px-4">
      <PageMeta
        title="404 - Page Not Found"
        description="The page you are looking for could not be found on QuantumSync Labs."
        url="/404"
      />
      <main className="glass rounded-glass shadow-neon px-8 py-14 flex flex-col items-center max-w-lg w-full" role="main">
        <h1 className="text-[7rem] leading-none font-headline font-black text-qs-primary drop-shadow mb-2 select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-qs-primary mb-3 font-headline text-center">
          Page Not Found
        </h2>
        <p className="text-section text-base md:text-lg mb-10 text-center font-body">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-qs-primary text-qs-text font-bold px-8 py-3 rounded-glass shadow-neon hover:bg-qs-accent transition text-base font-body"
        >
          Go Home
        </Link>
      </main>
    </div>
  );
}
