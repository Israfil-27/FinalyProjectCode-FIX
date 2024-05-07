import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './scss.scss';

const Search = () => {
  const navigate = useNavigate(); 
  const { keyword: urlKeyword } = useParams<{ keyword: string }>(); 
  const [keyword, setKeyword] = useState<string>(urlKeyword || '');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form className="search-form" onSubmit={submitHandler}>
      <input
        type="text"
        value={keyword} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} 
        placeholder="Məhsulları Axtar"
      />
      <button type="submit">Axtar</button>
    </form>
  );
};

export default Search;
