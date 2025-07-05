import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-navy">
      <main className="flex-grow flex flex-col">
        <AppRoutes />
      </main>
    </div>
  );
}
