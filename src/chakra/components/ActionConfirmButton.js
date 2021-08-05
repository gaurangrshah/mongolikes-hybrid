import { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";

export function ActionConfirmButton({ action, icon, btnLabel }) {
  console.log("🚀 | file: ActionConfirmButton.js | line 5 | action", action);
  const [clicked, setClicked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setClicked(false);
    setConfirmed(false);
    setLoading(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setClicked(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setConfirmed(true);
    setLoading(true);
  };

  useEffect(() => {
    if (!confirmed) return;
    console.log("action confirmed");
    action();
    resetState();
  }, [confirmed]);

  return (
    <ButtonGroup
      size='sm'
      isAttached
      variant='outline'
      onClick={!clicked ? handleClick : handleConfirm}
    >
      <Button
        mr='-px'
        colorScheme={!clicked ? "gray" : "yellow"}
        isLoading={loading}
      >
        {!clicked ? btnLabel : "Confirm"}
      </Button>
      <IconButton aria-label='Delete' icon={icon} />
    </ButtonGroup>
  );
}
