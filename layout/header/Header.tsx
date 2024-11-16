'use client';
import Image from "next/image";
import logo from "../../public/images/gleem-logo-colored.svg";
import Link from "next/link";
import rightArrow from "../../public/images/right-arrow.svg";
import downArrow from "../../public/images/down-arrow.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
const Header = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);

  const handleMouseEnter = (index: number) => {
    setActiveButton(index);
    setIsMouseOverMenu(true); // Menüye girildiğinde açık kalsın
  };

 
  useEffect(() => {
    console.log('activeButton', activeButton);
    console.log('isMouseOverMenu', isMouseOverMenu);
  }, [activeButton, isMouseOverMenu]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const menuItems = [
    { label: "E-ticaret", links: [{ name: "Koltuk Takımları", path: "/koltuk" }, { name: "TV Üniteleri", path: "/tv-uniteleri" }] },
    { label: "Fiyatlar" },
    { label: "Referanslar" },
    { label: "Giriş Yap" },
  ];
  return (
    <header className={`sticky top-0 left-0 right-0 z-40 w-full transition-colors duration-300 bg-black text-white`}>
      <div className="container mx-auto w-full grid grid-cols-12 justify-between items-center px-24 py-4">
        <div className="w-full col-span-3">
          <div onClick={() => router.push('/')} className="cursor-pointer w-32">
            <Image alt="Gleem logo" src={logo} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-16 relative col-span-9">
          {menuItems.map((item, index) => (
            <div
              key={index}

              className="relative group"
            >
              <button onMouseOver={() => handleMouseEnter(index)}
                onMouseLeave={() => {
                  setIsMouseOverMenu(false);
                  setActiveButton(null);
                }}
                onClick={() => { router.push('/products') }}
                className={`relative flex justify-between gap-2 items-center`}>
                {item.label}
                {item.links && (
                  <Image alt="" src={downArrow} className="w-4 h-4"></Image>
                )}
              </button>

              {/* Açılır menü */}
              {activeButton === index && item.links && (
                <div
                  className={`absolute top-full left-0 w-48 bg-black shadow-lg p-3 rounded-lg`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => {
                    setIsMouseOverMenu(false);
                    setActiveButton(null);
                  }}
                >
                  <ul className="flex flex-col gap-2">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.path} className="text-white cursor-pointer">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <Button className="bg-purple-600">
            <span className="">E-Ticaret Siteni Aç</span>
            <Image alt="" src={rightArrow} className="w-4 h-4"></Image>
          </Button>
        </div>

      </div>
    </header>
  )
}
export { Header };
