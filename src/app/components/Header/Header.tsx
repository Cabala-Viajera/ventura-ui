import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className=" bg-white w-full py-2 px-4  font-bold  border-b-1 border-primary flex justify-between items-center">
      <div className="flex items-center gap-4 text-primary">
        <Image
          src="/assets/logo.png"
          alt="Cábala Viajera logo"
          width={100}
          height={100}
        />
        <h1 className="text-4xl">Cábala Viajera</h1>
      </div>
      <div className="text-bold">
        <nav className="text-3xl">
          <Link href="/" className="mr-4">
            Blog
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
