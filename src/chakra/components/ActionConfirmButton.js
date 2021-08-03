import { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";

export function ActionConfirmButton({ action, cb, icon, btnLabel }) {
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

  async function handleAction() {
    const response = await action();
    cb(response);
  }

  useEffect(() => {
    if (!confirmed) return;
    handleAction();
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
