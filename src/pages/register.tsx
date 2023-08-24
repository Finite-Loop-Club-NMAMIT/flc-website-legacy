import { Branch } from "@prisma/client";
import Button from "../components/button";

function Register() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-10 py-4">
      <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Be a part of <br />
        <span className="text-yellow-600 dark:text-yellow-500">
          NMAMIT&apos;s
        </span>{" "}
        Coding Club!
      </h1>
      <p className="text-center text-sm font-normal text-gray-500 dark:text-gray-400 lg:text-lg">
        Finite Loop is a Coding Club, which aims to give a good perspective of
        development, and encourages students to realize their ideas. We
        encourage students to participate in competitive programming and thus,
        inspire the next.
      </p>

      <form className="flex flex-col space-y-8">
        <div className="relative z-0">
          <input
            type="text"
            name="name"
            id="name"
            className="form-input peer"
            placeholder=" "
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>

        <div className="relative z-0">
          <input
            placeholder=" "
            type="usn"
            className="form-input peer"
            name="usn"
            id="usn"
          />
          <label htmlFor="usn" className="form-label">
            USN
          </label>
        </div>

        <div className="relative z-0">
          <input
            placeholder=" "
            type="phone"
            name="phone"
            id="phone"
            className="form-input peer"
          />
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
        </div>

        <div className="relative z-0">
          <input
            placeholder=" "
            type="email"
            name="email"
            id="email"
            className="form-input peer"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>

        <label htmlFor="yearOfStudy" className="block text-sm text-gray-400">
          Year of Study
        </label>
        <select
          className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
          name="yearOfStudy"
          id="yearOfStudy"
        >
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <label htmlFor="branch" className="block text-sm text-gray-400">
          Branch
        </label>
        <select
          className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
          name="branch"
          id="branch"
        >
          {Object.keys(Branch).map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <div className="relative z-0">
          <input
            placeholder=" "
            name="github"
            id="github"
            className="form-input peer"
          />
          <label htmlFor="github" className="form-label">
            Github
          </label>
        </div>

        <div className="relative z-0">
          <input
            placeholder=" "
            name="linkedin"
            id="linkedin"
            className="form-input peer"
          />
          <label htmlFor="linkedin" className="form-label">
            Linkedin
          </label>
        </div>

        <div className="relative z-0">
          <input
            placeholder=" "
            className="form-input peer"
            name="languages"
            id="languages"
          />
          <label htmlFor="languages" className="form-label">
            Programming Languages Known (seperated by commas)
          </label>
        </div>

        <div className="relative z-0">
          <input
            placeholder=" "
            name="skills"
            className="form-input peer"
            id="skills"
          />
          <label htmlFor="skills" className="form-label">
            Skills (seperated by commas)
          </label>
        </div>

        <div className="relative z-0">
          <textarea
            placeholder=" "
            name="why"
            id="why"
            className="form-input peer"
          />
          <label htmlFor="why" className="form-label">
            Why do you want to join FLC?
          </label>
        </div>

        <div className="relative z-0">
          <textarea
            placeholder=" "
            name="expectations"
            id="expectations"
            className="form-input peer"
          />
          <label htmlFor="expectations" className="form-label">
            What are your expectations from FLC?
          </label>
        </div>

        <Button className="mt-5 w-fit" type="submit">
          Register
        </Button>
      </form>
    </section>
  );
}

export default Register;
