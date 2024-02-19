import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'; // Import styled from styled-components
import Header from './components/HeaderFooter/Header';
import HomePage from './components/HomePage/HomePage';
import GlobalChartsPage from './components/GlobalCharts/GlobalChartsPage';
import ChooseCountryChartsPage from './components/ChooseCountry/ChooseCountryChartsPage';
import GenreChartsPage from './components/ChooseGenre/GenreChartsPage';
import CountryChartPage from './components/ChooseCountry/CountryChartPage'; // Assuming this is the correct component
import ChooseGenreChartsPage from './components/ChooseGenre/ChooseGenreChartsPage';
import Footer from './components/HeaderFooter/Footer';
import MakeAPlaylist from './components/MakePlaylist/MakeAPlaylist';
import MakeAPlaylist2 from './components/MakePlaylist/MakeAPlaylist2';
import MakeAPlaylist3 from './components/MakePlaylist/MakeAPlaylist3';
import MakeAPlaylist4 from './components/MakePlaylist/MakeAPlaylist4';  
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/global-charts" element={<GlobalChartsPage />} />
            <Route path="/country-charts" element={<ChooseCountryChartsPage />} />
            <Route path="/genre-charts" element={<ChooseGenreChartsPage />} />
            <Route path="/country-chart/:countryName/:flag" element={<CountryChartPage />} /> {/* Corrected */}
            <Route path="/genre-chart/:genreName/:color" element={<GenreChartsPage />} />
            <Route path="/make-playlist" element={<MakeAPlaylist />} />
            <Route path="/make-playlist2" element={<MakeAPlaylist2 />} />
            <Route path="/make-playlist3" element={<MakeAPlaylist3 />} />
            <Route path="/make-playlist4" element={<MakeAPlaylist4 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
