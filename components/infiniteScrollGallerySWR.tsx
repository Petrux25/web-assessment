import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import useSWRInfinite from "swr/infinite"
import IPhoto from '@/interfaces/IPhoto';
import Link from 'next/link'


interface InfiniteScrollGallery {
    query: string;
    color: string;
    orientation: string;
}

const InfiniteScrollGallerySWR: FC<InfiniteScrollGallery> = ({ query, color, orientation }) => {
    
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.results) return null
        return `https://api.unsplash.com/search/photos?page=${pageIndex + 1}&query=${query}${color ? `&color=${color}`: ""}${orientation ? `&orientation=${orientation}`: ""}&per_page=18&client_id=bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs`
    }

    
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= documentHeight - 10) {
            setSize(size + 1);
        }
    };

    return (
        <main className="grid sm:grid-cols-2 md:grid-cols-6 gap-4 mt-5">
            {data?.map((images, key ) => {
                return images.results.map((image: IPhoto) => (
                    <Link 
                        href={{
                            pathname: "/image/[id]",
                            query: {
                                data: JSON.stringify(image)
                            },
                            
                        }}
                        as={`/image/${image.id}`}
                    >
                        <div className="bg-[#1f2937] rounded-lg shadow-md overflow-hidden h-full" key={image.id}>
                            <Image src={image.urls.thumb} alt={image.alt_description} className="w-full h-48 object-cover" width={600} height={600} />
                            <div className="p-4">
                                <p>{ image.description ? image.description?.substring(0, 22) + "..." : "" }</p>
                            </div>
                        </div>
                    </Link>
                ))
            })}
        </main>
    );
};

export default InfiniteScrollGallerySWR;
