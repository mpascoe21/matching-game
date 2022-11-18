import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Loading from "./components/Loading";
import Header from "./components/Header";
import styles from './App.module.scss';

const Intro = lazy(() => import('././components/Intro'));
const CardList = lazy(() => import('././components/CardList'));
// const GameLevels = lazy(() => import('./components/GameLevels'));
const LevelResults = lazy(() => import('./components/LevelResults'));
const LevelError = lazy(() => import('./components/LevelError'));


const staffImages = [
  {'src': '/images/car.png', 'name': 'Car'},
  {'src': '/images/dog.png', 'name': 'Dog'},
  {'src': '/images/flowers.png', 'name': 'Flowers'},
  {'src': '/images/house.png', 'name': 'House'},
  {'src': '/images/sun.png', 'name': 'Sun'},
  {'src': '/images/tree.png', 'name': 'Tree'}
]
console.log(staffImages);


const App = () => {

  // const hasLoaded = useRef(false);

  // const getStaffData = () => {
  //   fetch(`https://twom061-003.s3.amazonaws.com/s2d-prod/api/team.json`)
  //     .then((response) => response.json())
  //     .then((jsonResponse) => setAllStaff(jsonResponse));
  //   // console.log(allStaff)
  // };
  // getStaffData();


  // useEffect(() => {
  //   if (hasLoaded.current) return;
  //   hasLoaded.current = true;
  //   getStaffData();
  // }, []);
  // console.log(allStaff);
  //
  // const digitalTeam = allStaff.filter(staffMember => staffMember.department[0] === 'digital');
  // console.log(digitalTeam);
  //
  // digitalTeam.sort(() => Math.random() - 0.5);
  // console.log(digitalTeam);
  // // console.log(digitalTeam[1].position); // not working
  //
  // let gameArr = digitalTeam.slice(0, 6);
  // console.log(gameArr);
  //
  // let staffImgArr = gameArr.map(staff => staff.image.mobile)
  // console.log(staffImgArr);
  // // console.log(gameArr.title); //not working


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route path='/' element={<Intro staffImages={staffImages} />}/>
          <Route path='/card-list' element={<CardList staffImages={staffImages} />}/>
          <Route path='/level-error' element={<LevelError />}/>
          <Route path='/level-results' element={<LevelResults />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
