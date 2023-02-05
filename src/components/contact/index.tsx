import { type FunctionComponent } from "react";

const Contact: FunctionComponent = () => {
  return (
    <div className="px-0 pb-10 md:px-10">
      <p className="mb-5 text-lg md:text-2xl">
        INSPIRANTE TECHNOLOGIES PRIVATE LIMITED
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-md font-bold md:text-lg">Contact Us</p>
        <p className="font-light text-gray-400">
          Last updated on Oct 20th 2022
        </p>
        <p>You may contact us using the information below:</p>
        <p className="text-sm md:text-lg">
          Merchant Legal entity name: INSPIRANTE TECHNOLOGIES PRIVATE LIMITED
          <br />
          Registered Address: 2-1-22, Bombay House, , Kalsanka, Kunjibettu P O
          Udupi KARNATAKA 576102
          <br />
          Operational Address: 2-1-22, Bombay House, , Kalsanka, Kunjibettu P O
          Udupi KARNATAKA 576102
          <br />
          Telephone No: 8197903771
          <br />
          E-Mail ID: inspirantech@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Contact;
