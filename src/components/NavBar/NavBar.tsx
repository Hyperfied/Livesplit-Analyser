function NavBar() {
  return (
    <div
      onClick={() => window.location.reload()}
      className="flex items-center justify-between w-full z-1000 fixed bg-white px-5 py-5 shadow-lg"
    >
      <div className="cursor-pointer select-none">
        <h1 className="text-4xl font-bold">SplitStats</h1>
      </div>
    </div>
  );
}

export default NavBar;
