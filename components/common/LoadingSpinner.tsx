import styled from "styled-components";
//import styled from "@emotion/styled";

const Spinner = styled.div`
  .loading-spinner {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 90px auto;
    border-radius: 50%;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-left-color: #818a91;
    transform: translateZ(0);
    animation: spin 0.5s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
