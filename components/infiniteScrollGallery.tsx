import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import IPhoto from '@/interfaces/IPhoto';

interface InfiniteScrollGallery {
    query: string
}

const InfiniteScrollGallery: FC<InfiniteScrollGallery> = ({ query }) => {
    const [images, setImages] = useState<IPhoto[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadImages();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const loadImages = async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs`);
        const jsonData = await response.json();
        setImages([...images, ...jsonData.results]);
        setPage(page + 1);
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadImages();
        }
    };

    return (
        <main className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image: IPhoto, key) => (
                <div className="bg-white rounded-lg shadow-md overflow-hidden" key={key}>
                    <img src={image.urls.small} alt={image.alt_description} className="w-full h-48 object-cover"  />
                    <div className="p-4">
                        <p className="text-gray-800 text-lg font-medium">{image.description}</p>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default InfiniteScrollGallery;
