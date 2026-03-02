import { stays } from "./stays.js";

import { cityList, location } from "./main.js";

const staysList = document.querySelector("#staysList");
const staysCount = document.querySelector("#staysCount");
const guestTotal = document.querySelector("#guestTotal");
const adultTotal = document.querySelector("#adultTotal");
const childrenTotal = document.querySelector("#childrenTotal");
const searchList = document.querySelector("#searchList");
const addLocation = document.querySelector("#addLocation");
const addGuests = document.querySelector("#addGuests");
const guestCounters = document.querySelector("#guestCounters");
const titleCity = document.querySelector("#titleCity");
const titleGuests = document.querySelector("#titleGuests");

/******************************************************************************

            LOAD LIST

******************************************************************************/

export function loadList(stays) {
  staysList.innerHTML = ``;
  for (let stay of stays) {
    const newStay = document.createElement("article");
    newStay.classList.add("text-accGray");
    if (stay.superHost) {
      newStay.innerHTML = `
                <img
                  src="${stay.photo}"
                  alt="Picture of Stay"
                   class="w-full h-60 rounded-2xl object-cover  "
                />
                <div class="flex justify-between p-2 text-sm items-center h-12">
                  <p class="border-2 p-1 px-2 rounded-xl text-slate-700">
                    <strong>SUPERHOST</strong>
                  </p>
                  <p class="text-slate-500">${stay.type}${stay.beds ? (stay.beds > 1 ? ` . ${stay.beds} beds` : ` . ${stay.beds} bed`) : ``}</p>
                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                       class="size-5 text-accRed"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="text-base">${stay.rating}</p>
                  </div>
                </div>
                <p class="font-semibold text-lg px-2">
                  ${stay.title}
                </p>
            `;
    } else {
      newStay.innerHTML = `
                <img
                  src="${stay.photo}"
                  alt="Picture of Stay"
                   class="w-full h-60 rounded-2xl object-cover  "
                />
                <div class="flex justify-between p-2 text-sm items-center h-12">
                  <p class="text-slate-500">${stay.type}${stay.beds ? (stay.beds > 1 ? ` . ${stay.beds} beds` : ` . ${stay.beds} bed`) : ``}</p>
                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                       class="size-5 text-accRed"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="text-base">${stay.rating}</p>
                  </div>
                </div>
                <p class="font-semibold text-lg px-2">
                  ${stay.title}
                </p>
            `;
    }
    staysList.appendChild(newStay);
    staysCount.innerHTML = `${staysList.children.length} stays`;
  }
}

/******************************************************************************

            SEARCH MENU

******************************************************************************/

export function openSearchMenu(event) {
  search.classList.remove("hidden");
  if (event.target.closest("#addLocation")) {
    location.focus();
    activateLocation();
  } else if (event.target.closest("#addGuests")) {
    activateGuest();
  }
}

export function closeSearchMenu() {
  search.classList.add("hidden");
}

export function activateGuest() {
  guestBox.classList.add("inset-ring-1", "inset-ring-accRed");
  guestCounters.classList.remove("hidden");
}

export function deactivateGuest() {
  guestBox.classList.remove("inset-ring-1", "inset-ring-accRed");
  guestCounters.classList.add("hidden");
}

export function activateLocation() {
  searchList.classList.remove("hidden");
}

export function deactivateLocation() {
  searchList.classList.add("hidden");
}

export function manageClick(event) {
  const close = event.target.closest("aside");
  if (!close) {
    closeSearchMenu();
  }
  const guest = event.target.closest("#guestSection");
  if (!guest && guestBox.classList.contains("inset-ring-1")) {
    deactivateGuest();
  }
  const city = event.target.closest(".city");
  if (city) {
    autofillCity(city);
  }
  const locate = event.target.closest("#location");
  if (!locate && !searchList.classList.contains("hidden")) {
    deactivateLocation();
  }
}

/******************************************************************************

            GUEST FILTERS

******************************************************************************/

export function countAdults(event) {
  const current = event.target;
  let adults = Number(adultTotal.textContent);
  if (current.dataset.action === "add") {
    adultTotal.textContent = ++adults;
  } else if (current.dataset.action === "subtract" && adults > 0) {
    adultTotal.textContent = --adults;
  }
  let total = adults + Number(childrenTotal.textContent);
  guestTotal.innerHTML = `${total}${total !== 1 ? " guests" : " guest"}`;
  updateGuestNumber(total);
  filterGuests(total);
}

export function countChildren(event) {
  const current = event.target;
  let children = Number(childrenTotal.textContent);
  if (current.dataset.action === "add") {
    childrenTotal.textContent = ++children;
  } else if (current.dataset.action === "subtract" && children > 0) {
    childrenTotal.textContent = --children;
  }
  let total = Number(adultTotal.textContent) + children;
  guestTotal.textContent = `${total}${total !== 1 ? " guests" : " guest"}`;
  updateGuestNumber(total);
  filterGuests(total);
}

export function filterGuests(total) {
  let newStays = stays.filter((stay) => stay.maxGuests >= total);
  if (location.value) {
    newStays = newStays.filter((stay) =>
      stay.city.toLowerCase().includes(location.value.toLowerCase()),
    );
  }
  loadList(newStays);
}

function updateGuestNumber(total) {
  if (total) {
    addGuests.textContent = guestTotal.textContent;
    addGuests.classList.add("text-accGray");
    titleGuests.textContent = ` for ${guestTotal.textContent}`;
  } else {
    addGuests.textContent = "Add Guests";
    addGuests.classList.remove("text-accGray");
    titleGuests.textContent = ``;
  }
}

/******************************************************************************

            LOCATION FILTERS

******************************************************************************/

export function searchLocation() {
  const citySearch = location.value;
  addLocation.textContent = citySearch;
  addLocation.classList.add("text-accGray");
  if (cityList.includes(citySearch)) {
    titleCity.textContent = `${citySearch}, `;
  } else {
    titleCity.textContent = ``;
  }
  if (!citySearch) {
    addLocation.textContent = "Add location";
    addLocation.classList.remove("text-accGray");
  }

  changeSearchList(citySearch);
  filterCity(citySearch);
}

export function filterCity(city) {
  const total = Number(guestTotal.textContent.slice(0, 1));
  let newStays = stays.filter((stay) =>
    stay.city.toLowerCase().includes(city.toLowerCase()),
  );
  if (total) {
    newStays = newStays.filter((stay) => stay.maxGuests >= total);
  }
  loadList(newStays);
}

export function changeSearchList(locate) {
  let cityMatch = cityList.filter((city) =>
    city.toLowerCase().includes(locate.toLowerCase()),
  );
  searchList.innerHTML = ``;
  for (let i = 0; i < 3 && i < cityMatch.length; i++) {
    searchList.innerHTML += `
              <li class="city flex gap-3 p-1 hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-accRed"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span class="text-gray-500 hover:text-accGray">${cityMatch[i]}</span>
              </li>`;
  }
}

export function autofillCity(city) {
  const cityName = city.children[1].textContent;
  location.value = cityName;
  searchLocation();
}
