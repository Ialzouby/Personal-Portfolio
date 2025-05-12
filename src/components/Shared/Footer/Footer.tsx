import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container bg-dark py-4 d-flex justify-content-center align-items-center rounded mt-5">
      <span className="fs-eight fw-medium n5-color">
        Designed by{" "}
        <Link
          href="#"
          className="fs-eight fw-medium n5-color"
        >
          ISSAM
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
