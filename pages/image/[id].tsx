import { useState, FC } from 'react'
import IPhoto from '@/interfaces/IPhoto'
import { useRouter } from 'next/router'
import heartIcon from '../../assets/heart-icon.png'
import Image from 'next/image'


const ImagePage: FC = () => {
  const router = useRouter()
  const photo: IPhoto = JSON.parse(router.query.data as string)

  const date = new Date(photo.created_at);
  const year = date.getUTCFullYear();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className='w-min-content'>
        <Image blurDataURL={photo.urls.thumb} placeholder="blur" src={photo.urls.regular} alt={photo.alt_description} width={600} height={600} className="mx-auto" />
        <div className="p-4 mx-auto">
          <h1 className="text-3xl font-bold">{photo.user.username}, {year}</h1>
          <h3 className="font-bold">❤️{photo.likes}</h3>
          <p className="text-lg text-gray-400">{photo.description}</p>
        </div>
      </div>

    </div>
  )
}

export default ImagePage;
