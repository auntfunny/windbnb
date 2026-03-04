import { stays } from "./stays.js";

import {
  loadList,
  openSearchMenu,
  closeSearchMenu,
  activateGuest,
  manageClick,
  activateLocation,
  countAdults,
  countChildren,
  searchLocation,
} from "./functions.js";

const searchButtonMed = document.querySelector("#searchButtonMed");
const searchButtonMob = document.querySelector("#searchButtonMob");
const adultCount = document.querySelector("#adultCount");
const childrenCount = document.querySelector("#childrenCount");
const searchOpen = document.querySelector("#searchOpen");
const closeMenu = document.querySelector("#closeMenu");
const search = document.querySelector("#search");
const guestBox = document.querySelector("#guestBox");
export const location = document.querySelector("#location");


search.addEventListener("click", manageClick);
searchOpen.addEventListener("click", openSearchMenu);
searchButtonMed.addEventListener("click", closeSearchMenu);
searchButtonMob.addEventListener("click", closeSearchMenu);
closeMenu.addEventListener("click", closeSearchMenu);
guestBox.addEventListener("click", activateGuest);
location.addEventListener("click", activateLocation);
adultCount.addEventListener("click", countAdults);
childrenCount.addEventListener("click", countChildren);
location.addEventListener("input", searchLocation);
location.addEventListener('focus', e => e.target.select());
location.addEventListener('mouseup', e => e.preventDefault());


loadList(stays);
