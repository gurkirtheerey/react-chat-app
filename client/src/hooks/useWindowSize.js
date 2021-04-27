const useWindowSize = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 600) {
    return true;
  } else {
    return false;
  }
};

export default useWindowSize;
