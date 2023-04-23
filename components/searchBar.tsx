import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import searchBarIcon from '../assets/search-icon.png'
import useDebounce from '@/hooks/useDebounce';

interface SearchBarProps {
    onChange: Dispatch<SetStateAction<string>>;
    value: string
}


const SearchBar: FC<SearchBarProps> = ({ onChange, value }) => {

    const [internalValue, setInternalValue] = useState(value)
    const debouncedSearchTerm: string = useDebounce<string>(internalValue, 1000);


    useEffect(
      () => {
        if (debouncedSearchTerm) {
          onChange(debouncedSearchTerm)
        }
      },
      [debouncedSearchTerm]
    );


    return (

            <input
                className=" bg-[#1f2937] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                type="search"
                name="search"
                placeholder="Search"
                onChange={(e) => setInternalValue(e.target.value)}
                value={internalValue}
            />
    );
};

export default SearchBar;
