import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="glass rounded-glass shadow-neon-blue px-8 py-14 flex flex-col items-center max-w-lg w-full">
        <h1 className="text-[7rem] leading-none font-headline font-black text-blue drop-shadow mb-2 select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-blue mb-3 font-headline text-center">
          Page Not Found
        </h2>
        <p className="text-section text-base md:text-lg mb-10 text-center font-body">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-blue text-white font-bold px-8 py-3 rounded-glass shadow-neon-blue hover:bg-cyan transition text-base font-body"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
