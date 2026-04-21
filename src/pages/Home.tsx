import Console from '../components/Console';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-2xl">
        <Console />
      </div>
    </div>
  );
}
