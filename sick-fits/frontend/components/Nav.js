import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";

const Nav = () => (
  <NavStyles>
    <User />
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>sell</a>
    </Link>
    <Link href="/signup">
      <a>signup</a>
    </Link>
    <Link href="/order">
      <a>orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
  </NavStyles>
);

export default Nav;
