//import styled from "@emotion/styled";
import styled from "styled-components";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  as: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Anchor = styled.a`
  text-decoration: none !important;
`;

const CustomLink = ({
  className,
  href,
  as,
  onClick,
  children,
}: CustomLinkProps) => {
  return (
    <Link href={href} as={as} passHref>
      <Anchor className={className || ""}>{children}</Anchor>
    </Link>
  );
};

export default CustomLink;
