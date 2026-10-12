import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Slider, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Prop = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCounterOffer: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  counterOffer: number;
  handleCounterOffer: () => void;
};
export default function CounterOfferModal({
  open,
  setOpen,
  setCounterOffer,
  counterOffer,
  min,
  handleCounterOffer
}: Prop) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: Event, newValue: number) => {
    setCounterOffer(newValue);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Entre Your Counter Offer
          </Typography>
          <Stack>
            <Typography variant="h2">{counterOffer}</Typography>
            <Slider
              color="secondary"
              value={counterOffer}
              min={min}
              max={min * 2}
              step={1}
              onChange={handleChange}
            />
          </Stack>
          <Button onClick={handleCounterOffer} variant="outlined" sx={{ mt: 2 }}>
            Set Counter Offer
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
