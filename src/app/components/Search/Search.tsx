import React from 'react'


interface ISearch {
  setInputLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<ISearch> = ({setInputLocation}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const onSearchingWeather = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputLocation(searchValue);
  };

  return (
    <form onSubmit={onSubmitSearch} className='flex justify-center items-center'>
      <input type='text' onChange={onSearchingWeather} placeholder='Search...' className='p-4 rounded-full w-96 text-black outline-none'/>
      <button type="submit" className="p-4 ml-3 border text-white rounded-full">
        Search
      </button>
    </form>
  )
}

export default Search
