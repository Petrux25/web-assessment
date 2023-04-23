import SearchBar from '@/components/searchBar'
import { useState } from 'react'
import InfiniteScroll from '@/components/infiniteScrollGallery'
import InfiniteScrollGallerySWR from '@/components/infiniteScrollGallerySWR'
import StickyTop from '@/components/sticky'
import Dropdown, { DropdownOption } from '@/components/dropdown'
import { colorOptions, orientationOptions } from '@/constants/dropdownOptions'

export default function Home() {
  const [search, setSearch] = useState("Pokemon");
  const [color, setColor] = useState("");
  const [orientation, setOrientation] = useState("");

  const handleColorSelect = (option: DropdownOption) => {
    setColor(option.value);
  };

  const handleOrientationSelect = (option: DropdownOption) => {
    setOrientation(option.value);
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <StickyTop>
      <SearchBar onChange={setSearch} value={search} />
        <div className="grid grid-cols-2">
          <Dropdown options={orientationOptions} onSelect={handleOrientationSelect} />
          <Dropdown options={colorOptions} onSelect={handleColorSelect} />
        </div>
      </StickyTop>
        
      {/* <InfiniteScroll query={search}/> */}
      <InfiniteScrollGallerySWR query={search} color={color} orientation={orientation} />
    </main>
  )
}
