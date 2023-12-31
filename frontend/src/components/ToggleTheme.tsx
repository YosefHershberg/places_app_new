import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Button
      onClick={() => toggleColorMode()}
    >
      {colorMode === "dark" ? (
        <SunIcon />
      ) : (
        <MoonIcon  />
      )}
    </Button>
  );
}

export default ToggleTheme
