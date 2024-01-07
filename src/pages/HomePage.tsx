import React from 'react';
import { useNavigate } from 'react-router-dom';
import pageUrl from '../const/pages';

function HomePage() {
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate(pageUrl.examplePage);
  };

  return (
    <div className="app">
      <h1>Home Page</h1>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={navigateToPage}>Go to example page</button>
    </div>
  );
}

export default HomePage;
