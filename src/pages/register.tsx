import Button from "../components/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Error from "../components/error";
import { extractStudentDetailsFromEmail } from "../utils/details";
import Link from "next/link";
import { makePayment } from "../utils/razorpay";
import Loader from "../components/loader";

function Register() {
  const [inputValues, setInputValues] = useState<{
    name: string;
    phone: string;
    github: string;
    linkedin: string;
    expectations: string;
    why: string;
    skills: string[];
    languages: string[];
  }>({
    name: "",
    phone: "",
    github: "",
    linkedin: "",
    languages: [],
    skills: [],
    why: "",
    expectations: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { client } = api.useContext();

  const registerMut = api.userRouter.registrationForm.useMutation({
    onSuccess: async () => {
      setLoading(true);
      const data = await client.userRouter.createPaymentOrder.mutate();
      await makePayment(
        user.data?.email as string,
        user.data?.name as string,
        user.data?.username as string,
        data,
        setLoading,
      );
      setLoading(false);
    },
  });

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === "skills" || name === "languages") {
      const valuesArray = value.split(",").map((item) => item.trim());
      setInputValues((prevValues) => ({ ...prevValues, [name]: valuesArray }));
    } else {
      setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const { data: session, status } = useSession();
  const user = api.userRouter.getUserByEmail.useQuery(
    {
      email: session?.user?.email as string,
    },
    {
      enabled: status === "authenticated",
    },
  );

  const [validations, setValidations] = useState({
    phone: true,
    github: true,
    linkedin: true,
    expectations: true,
    why: true,
    skills: true,
    languages: true,
  });

  const registerFunction = () => {
    const phoneRegex = /^\d{10}$/;
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/.+/;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+/;

    const isCommaSeparatedArray = (input: string[]): boolean => {
      return input.every((value) => value.trim() !== "");
    };

    const phoneValid = phoneRegex.test(inputValues.phone);
    const githubValid = githubRegex.test(inputValues.github);
    const linkedinValid = linkedinRegex.test(inputValues.linkedin);
    const languagesValid = isCommaSeparatedArray(inputValues.languages);
    const skillsValid = isCommaSeparatedArray(inputValues.skills);
    const expectationsValid = inputValues.expectations.trim() !== "";
    const whyValid = inputValues.why.trim() !== "";

    setValidations({
      ...validations,
      phone: phoneValid,
      github: githubValid,
      linkedin: linkedinValid,
      languages: languagesValid,
      skills: skillsValid,
      expectations: expectationsValid,
      why: whyValid,
    });

    if (
      phoneValid &&
      githubValid &&
      linkedinValid &&
      languagesValid &&
      skillsValid &&
      expectationsValid &&
      whyValid
    ) {
      if (user.data) {
        registerMut.mutate({
          name: user.data.name!,
          expectations: inputValues.expectations,
          languages: inputValues.languages,
          phone: inputValues.phone,
          skills: inputValues.skills,
          why: inputValues.why,
          github: inputValues.github,
          linkedin: inputValues.linkedin,
        });
      }
    }
  };

  if (status === "loading")
    return (
      <div className="relative z-10 m-24 flex flex-col items-center justify-center gap-6 text-center lg:m-56">
        <button
          disabled
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-500"
        >
          <svg
            className="mr-3 inline h-4 w-4 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );

  if (!user.data) return <Error />;

  if (user.data.isMember)
    return (
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="gradient mb-4 text-7xl font-extrabold tracking-tight text-yellow-500 dark:text-yellow-500 lg:text-9xl">
              You have completed your registration!
            </h1>
            <Link href="/">
              <Button>Back to Homepage</Button>
            </Link>
          </div>
        </div>
      </section>
    );

  const { year, branch, usn } = extractStudentDetailsFromEmail(
    user.data.email as string,
  );

  return (
    <>
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
              value={user.data.name || inputValues.name}
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
              value={usn}
              readOnly
            />
            <label htmlFor="usn" className="form-label">
              USN
            </label>
          </div>

          <div className="relative z-0">
            <input
              placeholder=" "
              type="email"
              name="email"
              id="email"
              className="form-input peer"
              value={user.data.email || ""}
              readOnly
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>

          <div className="relative z-0">
            <input
              placeholder=" "
              type="phone"
              name="phone"
              id="phone"
              className="form-input peer"
              value={inputValues.phone}
              onChange={handleInputChange}
            />
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
          </div>

          <div>
            <label
              htmlFor="yearOfStudy"
              className="mb-2 block text-sm text-gray-400"
            >
              Year of Study
            </label>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
              name="yearOfStudy"
              id="yearOfStudy"
              value={year === 24 ? "4" : year === 23 ? "3" : "2"}
              disabled
            >
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="branch"
              className="mb-2 block text-sm text-gray-400"
            >
              Branch
            </label>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
              name="branch"
              id="branch"
              value={branch}
              disabled
            >
              <option key={branch} value={branch}>
                {branch.toUpperCase()}
              </option>
            </select>
          </div>

          <div className="relative z-0">
            <input
              placeholder=" "
              name="github"
              id="github"
              className="form-input peer"
              value={inputValues.github}
              onChange={handleInputChange}
            />
            <label htmlFor="github" className="form-label">
              Github Link
            </label>
          </div>

          <div className="relative z-0">
            <input
              placeholder=" "
              name="linkedin"
              id="linkedin"
              className="form-input peer"
              value={inputValues.linkedin}
              onChange={handleInputChange}
            />
            <label htmlFor="linkedin" className="form-label">
              Linkedin Link
            </label>
          </div>

          <div className="relative z-0">
            <input
              placeholder=" "
              name="languages"
              id="languages"
              className="form-input peer"
              value={inputValues.languages.join(", ")}
              onChange={handleInputChange}
            />
            <label htmlFor="languages" className="form-label">
              Programming Languages Known (separated by commas)
            </label>
          </div>

          <div className="relative z-0">
            <input
              placeholder=" "
              name="skills"
              className="form-input peer"
              id="skills"
              value={inputValues.skills.join(", ")}
              onChange={handleInputChange}
            />
            <label htmlFor="skills" className="form-label">
              Skills (separated by commas)
            </label>
          </div>

          <div className="relative z-0">
            <textarea
              placeholder=" "
              name="why"
              id="why"
              className="form-input peer"
              value={inputValues.why}
              onChange={handleInputChange}
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
              value={inputValues.expectations}
              onChange={handleInputChange}
            />
            <label htmlFor="expectations" className="form-label">
              What are your expectations from FLC?
            </label>
          </div>
          {validations.phone === false && (
            <p className="text-red-500">
              Please enter a valid 10-digit phone number.
            </p>
          )}
          {validations.github === false && (
            <p className="text-red-500">
              Please enter a valid GitHub profile URL.
            </p>
          )}
          {validations.linkedin === false && (
            <p className="text-red-500">
              Please enter a valid LinkedIn profile URL.
            </p>
          )}
          {validations.languages === false && (
            <p className="text-red-500">
              Please enter comma separated list of programming languages.
            </p>
          )}
          {validations.skills === false && (
            <p className="text-red-500">
              Please enter comma separated list of skills.
            </p>
          )}
          {validations.why === false && (
            <p className="text-red-500">You cannot leave this field blank.</p>
          )}
          {validations.expectations === false && (
            <p className="text-red-500">You cannot leave this field blank.</p>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              registerFunction();
            }}
            className="mt-5 w-fit"
            type="submit"
          >
            Register
          </Button>
        </form>
      </section>

      {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-50 ">
          <Loader />
        </div>
      )}
    </>
  );
}

export default Register;
