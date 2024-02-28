import { Switch } from "@/components/ui/switch";
import { useDarkMode } from "@/hooks/useDarkMode";

export function ToggleDarkMode() {
  const { handleChangeDarkMode, darkMode } = useDarkMode();

  return (
    <Switch 
      onClick={() => handleChangeDarkMode()}
      checked={darkMode}
    />
  )
}