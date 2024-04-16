"use client";

import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type Ref = HTMLInputElement;
type ModalTransitionProps = {
  children: React.ReactElement<any, any>;
} & TransitionProps;
type ModalProps = {
  open: boolean;
  closeModal: Function;
  title: string;
  content?: ReactNode;
};

const Transition = React.forwardRef<Ref, ModalTransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function AppModal({
  open,
  closeModal,
  title,
  content,
}: ModalProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => closeModal}
    >
      <DialogTitle>{title}</DialogTitle>
      <hr />
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
