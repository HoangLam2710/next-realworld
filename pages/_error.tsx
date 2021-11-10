import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import CustomLink from "../components/common/CustomLink";

const ErrorContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin: 3rem auto;
  text-align: center;
`;

const ErrorStatus = styled.h1`
  font-size: 5rem;
  margin: 0;
  font-weight: 500;
  line-height: 1.2;
`;

const ErrorContent = styled.p``;

const ErrorButton = styled.button`
  color: #fff;
  background-color: #5cb85c;
  display: block;
  text-align: center;
  vertical-align: middle;
  margin: 20px auto;
  border: 1px solid #5cb85c;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    background-color: #58c758;
    border-color: #58c758;
    box-shadow: 0 0 0 0.2rem rgb(92 184 92 / 50%);
  }
`;

const statusErrors = [
  {
    code: 404,
    status: "The page you’re trying to access doesn’t seem to exist.",
  },
  {
    code: 401,
    status: "You are not authorized to access this page.",
  },
  {
    code: 403,
    status: "You don’t have permission to view this page.",
  },
  {
    code: 500,
    status: "Our internal server is a little unstable right now.",
  },
  {
    code: 502,
    status: "Seems like there are issues with the network connectivity.",
  },
  {
    code: 503,
    status: "...that means exciting things are on their way!",
  },
  {
    code: 504,
    status: "Sorry! Our server seems to be throwing tantrums at the moment..",
  },
];

const Error = ({ statusCode }: any) => {
  const statusError = statusErrors.filter(
    (statusError) => statusError.code === statusCode
  );

  return (
    <>
      <Head>
        <title>{statusError[0].status} | NEXT REALWORLD</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <ErrorContainer>
        <ErrorStatus>{statusError[0].code}</ErrorStatus>
        <ErrorContent>{statusError[0].status}</ErrorContent>
        <CustomLink href="/" as="/">
          <ErrorButton>Back to home</ErrorButton>
        </CustomLink>
      </ErrorContainer>
    </>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err.statusCode;
  return { statusCode };
};

export default Error;
