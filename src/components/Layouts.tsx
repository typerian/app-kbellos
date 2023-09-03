import NavBar from "./NavBar";

const Layout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="scrollbar-hide snap-y overflow-y-scroll p-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
