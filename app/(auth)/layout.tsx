import PinschatterLogo from "@/app/ui/logo/components/PinschatterLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="mx-auto flex w-full max-w-[400px] flex-col space-y-5 p-4">
        <PinschatterLogo />
        {children}
      </div>
    </main>
  );
};