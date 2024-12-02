'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ApiService from "@/utils/api-service";
import { toast } from "react-toastify";
import searchIcon from "@/public/images/search.svg";
import Image from "next/image";

type ISearchOne = {
    id: string,
    firstName: string,
    lastName: string,
    photoUrl: string,
}

export default function SearchOne() {
    const [searchUsers, setSearchUsers] = useState<ISearchOne[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    async function getSearchUser(text: string = '') {
        try {
            const { data } = await ApiService.query(`/users/search`, {
                text: text || '',
            });
            setSearchUsers(data);
        } catch (e: any) {
            toast(e?.response?.data?.error, { type: 'error' });
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue) {
            getSearchUser(debouncedValue);
        }
    }, [debouncedValue]);

    return (
        <div className="flex-1 block relative w-full z-50">
            <label htmlFor="search-header"
                className="flex items-center gap-3 bg-pinner border border-white text-white rounded-lg h-8 w-full overflow-hidden">
                <span className={`sm:pl-5 pl-2`}>
                    <Image src={searchIcon} alt={'search'} className=" w-5 h-5" />
                </span>
                <input
                    id={'search-header'}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        console.log("Input changed:", e.target.value); // Log ekleyin
                        setInputValue(e.target.value);
                    }}
                    className="outline-0 border-0 bg-transparent flex-1 pr-2 text-xs !text-white lg:text-sm"
                    autoComplete={'off'}
                    placeholder={'Search'}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                />
            </label>
            <div
                className={`absolute w-full mt-2 bg-white top-full rounded-lg right-1/2 translate-x-1/2 transition-all duration-300 ${isActive ? 'translate-y-0' : 'translate-y-4 opacity-0 invisible'}`}>
                <div
                    className={`border border-gray-400 border-opacity-30  p-2 lg:p-4 rounded-lg app-shadow-xs`}>
                    <div className="w-full">
                        {
                            searchUsers?.map((item, index) => (
                                <Link href={'/profile/' + item.id} key={'search_' + index}
                                    className={`w-full flex items-center gap-3 p-2 cursor-pointer hover:bg-dark hover:bg-opacity-10 rounded-lg`}>
                                    <div className="sm:w-10 w-6 aspect-square rounded-lg overflow-hidden">
                                        <img
                                            src={item.photoUrl}
                                            alt={item.photoUrl}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span className="sm:text-sm text-xs font-bold">
                                            {item.firstName + ' ' + item.lastName}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
