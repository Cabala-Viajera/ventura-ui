import { Card, Hero } from "@components";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="py-10 px-5">
        <Card />
      </div>
    </>
  );
}
