import AppRoutes from "./routes";
import ErrorBoundary from "./components/common/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen flex flex-col bg-navy">
        <main className="flex-grow flex flex-col">
          <AppRoutes />
        </main>
      </div>
    </ErrorBoundary>
  );
}
