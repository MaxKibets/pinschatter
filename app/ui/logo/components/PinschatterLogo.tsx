import Paw from "@/public/Paw";

export default function PinschatterLogo() {
  return (
    <div className="m-auto relative">
      <Paw className="w-24 h-auto" />
      <div className="text-2xl absolute" style={{ top: "65.5%", left: "-36%" }}>
        pins
        <span className="text-stone-900 px-1.5 font-black">CHAT</span>
        ter
      </div>
    </div>
  );
}
