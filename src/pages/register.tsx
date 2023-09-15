import Link from "next/link";

function Register() {
  // Closed
  return (
    <section>
      <div className="mx-auto  max-w-screen-sm  text-center">
        <h1 className="gradient mb-4 text-4xl font-extrabold tracking-tight text-yellow-500 dark:text-yellow-500">
          Oops Registration Closed :(
        </h1>
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          Hey! registration are closed now! You can{" "}
          <Link
            className="cursor-pointer text-yellow-500 "
            href={"/contact-us"}
          >
            contact us
          </Link>{" "}
          for any further clarifications
        </p>
      </div>
    </section>
  );
}

export default Register;