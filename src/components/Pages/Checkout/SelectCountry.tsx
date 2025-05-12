"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { PiCaretDown } from "react-icons/pi";

const Countries = [
  { id: 1, name: "Bangladesh" },
  { id: 2, name: "Austrila" },
  { id: 3, name: "India" },
  { id: 4, name: "USA" },
  { id: 5, name: "Canada" },
];
const SelectCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState(Countries[0]);
  return (
    <div className="position-relative">
      <Listbox value={selectedCountry} onChange={setSelectedCountry}>
        <ListboxButton className="d-flex justify-content-between align-items-center w-100 n5-color  brn4 rounded-2 p-3">
          {selectedCountry.name}
          <span>
            <PiCaretDown />
          </span>
        </ListboxButton>
        <ListboxOptions className="bgn1-color p-3 brn4 w-100 position-absolute rounded-2 fs-eight">
          {Countries.map((Country) => (
            <ListboxOption key={Country.id} value={Country} as={Fragment}>
              {({ selected }) => (
                <div
                  className={clsx(
                    "cursor-pointer py-1 fs-eight",
                    selected ? "p1-color" : "n5-color"
                  )}
                >
                  {Country.name}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default SelectCountry;
