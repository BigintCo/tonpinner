'use client';

import Image from "next/image";
import qr from "../../public/images/qr-code.png";
import facebook from "../../public/images/facebook-purple.svg";
import instagram from "../../public/images/instagram-purple.svg";
import twitter from "../../public/images/x-purple.svg";
import linkedin from "../../public/images/linkedin-purple.svg";
import google from "../../public/images/google-purple.svg";
import Link from "next/link";

const Footer = () => {
  const footerContent = [
    {
      'title': 'Kategoriler',
      'contents': [
        'Oturma Grubu',
        'Dekorasyon',
        'Ev',
        'Markalar',
        'İndirim'
      ]
    },
    {
      'title': 'Hakkımızda',
      'contents': [
        'Biz Kimiz?',
        'İletişim',
        'SSS',
        'Satış Sözleşmesi',
        'Blog'
      ]
    },
    {
      'title': 'İş Ortakları',
      'contents': [
        'Mypayz Ödeme Kuruluşu A.Ş.',
      ]
    }
  ]
  const socialMedia = [
    {
      'icon': facebook,
      'link': 'https://www.facebook.com',
    },
    {
      'icon': instagram,
      'link': 'https://www.instagram.com',
    },
    {
      'icon': twitter,
      'link': 'https://www.twitter.com',
    },
    {
      'icon': linkedin,
      'link': 'https://www.linkedin.com',
    },
    {
      'icon': google,
      'link': 'https://www.google.com',
    }
  ]
  return (
    <footer className="footer">
      <div className="w-full bg-black text-white">
        <div className="container mx-auto px-24 py-12 flex flex-col justify-center items-center gap-12">
          <div className="w-full flex justify-start items-center text-3xl">gleem</div>
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-start items-start gap-12 text-sm">
              {
                footerContent.map((item, index) => (
                  <div key={item.title + '_' + index} className=" flex flex-col justify-start items-start gap-4">
                    <div className="font-semibold">{item.title}</div>
                    {
                      item.contents && item.contents.length > 0 &&
                      item.contents.map((content, contentIndex) => (
                        <div key={content + '_' + contentIndex} className="w-full flex flex-col justify-start items-start gap-2">{content}</div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
            <div className="flex flex-col justify-start items-end gap-12">
              <div className="rounded-xl bg-white flex justify-center items-center p-2 w-28 aspect-square">
                <Image alt="qr_kod" src={qr} className="object-cover"></Image>
              </div>
              <div className="flex justify-end items-center gap-4">
                {
                  socialMedia.map((item, index) => (
                    <a key={item.link + '_' + index + '_social media'} href={item.link} target="_blank" rel="noreferrer">
                      <Image alt="" src={item.icon} className="w-6 h-6 text-orange-600"></Image>
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start items-center text-gray-600">
            ©2024 GLEEM Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
